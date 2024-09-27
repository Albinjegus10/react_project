from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal 
class Product(models.Model):
    TAG_CHOICES = [
        ('hero-product', 'Hero Product'),
        ('featured-product', 'Featured Product'),
    ]
    
    tag = models.CharField(max_length=50, choices=TAG_CHOICES,blank=True, null=True)
    tagline = models.CharField(max_length=255, blank=True, null=True)
    hero_image = models.ImageField(upload_to='products/hero_images/', blank=True, null=True)
    image1 = models.ImageField(upload_to='products/images/', blank=True, null=True)
    image2 = models.ImageField(upload_to='products/images/', blank=True, null=True)
    image3 = models.ImageField(upload_to='products/images/', blank=True, null=True)
    image4 = models.ImageField(upload_to='products/images/', blank=True, null=True)
    # Add more image fields as needed
    brand = models.CharField(max_length=100,blank=True, null=True)
    title = models.CharField(max_length=255,blank=True, null=True)
    info = models.CharField(max_length=255,blank=True, null=True)
    category = models.CharField(max_length=100,blank=True, null=True)
    type = models.CharField(max_length=100,blank=True, null=True)
    connectivity = models.CharField(max_length=100,blank=True, null=True)
    final_price = models.DecimalField(max_digits=10, decimal_places=2,validators=[MinValueValidator(Decimal('0.00'))])
    original_price = models.DecimalField(max_digits=10, decimal_places=2,validators=[MinValueValidator(Decimal('0.00'))])
    quantity = models.PositiveIntegerField(blank=True, null=True)
    ratings = models.PositiveIntegerField(blank=True, null=True)
    rate_count = models.PositiveIntegerField(blank=True, null=True)
    path = models.CharField(max_length=255,blank=True, null=True)
    overview_title = models.CharField(max_length=255, blank=True, null=True)
    overview_description = models.TextField(blank=True, null=True)
    feature1 = models.CharField(max_length=255, blank=True, null=True)
    feature2 = models.CharField(max_length=255, blank=True, null=True)
    feature3 = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True,blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True,blank=True, null=True)

    def __str__(self):
        return self.title
    
    def is_in_stock(self):
        return self.quantity > 0
    



from django.contrib.auth.models import User
from .models import Product  # Import your Product model

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # Use ForeignKey to Product
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f"CartItem(user={self.user.username}, product={self.product.name}, quantity={self.quantity})"
    

# models.py
from django.db import models

class Order(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    product =models.ForeignKey('Product',on_delete=models.CASCADE,blank=True, null=True)
    
    ordered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.item_name

class Wishlist(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    item_name = models.CharField(max_length=255)

    def __str__(self):
        return self.item_name

class GiftCard(models.Model):
    code = models.CharField(max_length=50)
    value = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.code

class SavedCard(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    card_number = models.CharField(max_length=16)
    expiration_date = models.DateField()
    cardholder_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.cardholder_name} - {self.card_number}"

class SavedAddress(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True) 
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15,blank=True)

    def __str__(self):
        return self.address_line1
