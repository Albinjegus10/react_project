from django.db import models
from django.core.validators import MinValueValidator
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
    final_price = models.DecimalField(max_digits=10, decimal_places=2,validators=[MinValueValidator(0)])
    original_price = models.DecimalField(max_digits=10, decimal_places=2,validators=[MinValueValidator(0)])
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