# views.py
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product
from .serializers import ProductSerializer

import logging

logger = logging.getLogger(__name__)
from .serializers import UserSerializer, TokenSerializer

class SignupView(APIView):
    print("lklklkl")
    def post(self, request):
        print("Request Received")
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            user_data = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
         
            return Response({
                'message': 'User created successfully',
                'user': user_data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.contrib.auth.models import User
from django.contrib.auth import login
from .serializers import LoginSerializer

class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data  # The user instance is returned if credentials are valid
        login(request, user)
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
            },
           
        }, status=status.HTTP_200_OK)



# List all products
class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Retrieve a specific product by ID
class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

# Create a new product
class ProductCreateAPIView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Update an existing product by ID
class ProductUpdateAPIView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

# Delete a product by ID
class ProductDeleteAPIView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'


from django.contrib.auth import authenticate, login
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import AdminLogSerializer

class AdminLoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = AdminLogSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Authenticate the user
        user = authenticate(
            username=serializer.validated_data['username'], 
            password=serializer.validated_data['password']
        )
        
        if user is not None and user.is_superuser:  # Check if the user is an admin
            login(request, user)  # Log the user in
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh),
                },
                "message": "Admin login successful"
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "error": "Invalid credentials or user is not an admin"
            }, status=status.HTTP_401_UNAUTHORIZED)


class ProductListByCategoryAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category = self.kwargs['category']  # Get the category from the URL
        return Product.objects.filter(category__iexact=category) 
    

# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import CartItem
from .serializers import CartItemSerializer

class CartItemListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated] 
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
     

    def get_queryset(self):
        # Only return cart items of the current authenticated user
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the authenticated user to the cart item
        serializer.save(user=self.request.user)

class CartItemRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)
