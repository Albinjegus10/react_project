from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import SignupView,ProductListAPIView,ProductDetailAPIView,ProductCreateAPIView,ProductUpdateAPIView,ProductDeleteAPIView,LoginView
from app.views import AdminLoginView
from .views import ProductListByCategoryAPIView
from .views import CartItemListCreateView, CartItemRetrieveUpdateDestroyView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('products/', ProductListAPIView.as_view(), name='product-list'),
    path('products/<int:id>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('products/create/', ProductCreateAPIView.as_view(), name='product-create'),
    path('products/<int:id>/update/', ProductUpdateAPIView.as_view(), name='product-update'),
    path('products/<int:id>/delete/', ProductDeleteAPIView.as_view(), name='product-delete'),
    path('adminlogin/', AdminLoginView.as_view(), name='adminlogin'),
    path('products/category/<str:category>/', ProductListByCategoryAPIView.as_view(), name='product-list-by-category'),
    path('cart-items/', CartItemListCreateView.as_view(), name='cart-item-list-create'),
    path('cart-items/<int:pk>/', CartItemRetrieveUpdateDestroyView.as_view(), name='cart-item-retrieve-update-destroy'),
]

