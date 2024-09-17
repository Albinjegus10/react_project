# serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

"""base64"""
import base64
import imghdr
from rest_framework import serializers
from django.core.files.base import ContentFile


class Base64ImageField(serializers.ImageField):
    ALLOWED_TYPES = ['jpg', 'jpeg', 'webp']

    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            format, imgstr = data.split(';base64,')
            ext = format.split('/')[-1]

            if ext not in self.ALLOWED_TYPES:
                raise serializers.ValidationError(
                    f"Unsupported image format. Allowed formats are: {', '.join(self.ALLOWED_TYPES)}")

            decoded_file = base64.b64decode(imgstr)
            file_type = imghdr.what(None, h=decoded_file)

            if file_type not in self.ALLOWED_TYPES:
                raise serializers.ValidationError(
                    f"Invalid image content. Allowed formats are: {', '.join(self.ALLOWED_TYPES)}")

            data = ContentFile(decoded_file, name=f'temp.{ext}')

        return super().to_internal_value(data)

    def to_representation(self, value):
        if not value:
            return None
        try:
            with value.open("rb") as img:
                return f"data:image/{value.name.split('.')[-1]};base64,{base64.b64encode(img.read()).decode()}"
        except Exception as e:
            return str(e)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        try:
            # Retrieve the user by email
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("A user with this email was not found.")

        # Check if the password is correct
        if user.check_password(password):
            if not user.is_active:
                raise serializers.ValidationError("This account is inactive.")
            return user
        else:
            raise serializers.ValidationError("Invalid credentials.")



class TokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField()


from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'



# serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User

class AdminLogSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if not user:
                raise serializers.ValidationError("Invalid credentials")

            if not user.is_superuser:
                raise serializers.ValidationError("User is not an admin")

        else:
            raise serializers.ValidationError("Must include 'username' and 'password'")

        return data


from rest_framework import serializers
from .models import CartItem

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'user', 'product', 'quantity', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']