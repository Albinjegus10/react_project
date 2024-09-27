from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import SignupView,ProductListAPIView,ProductDetailAPIView,ProductCreateAPIView,ProductUpdateAPIView,ProductDeleteAPIView,LoginView
from app.views import AdminLoginView
from .views import ProductListByCategoryAPIView
from .views import CartItemListCreateView, CartItemRetrieveUpdateDestroyView,CartItemList
from .views import (
    GiftCardListCreateView,
    GiftCardRetrieveUpdateDestroyView,
    OrderListCreateView,
    OrderRetrieveUpdateDestroyView,
    SavedAddressListCreateView,
    SavedAddressRetrieveUpdateDestroyView,
    SavedCardListCreateView,
    SavedCardRetrieveUpdateDestroyView,
    WishlistListCreateView,
    WishlistRetrieveUpdateDestroyView,
)
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
    path('cart/', CartItemListCreateView.as_view(), name='cart-item-list-create'),
    path('cart-items/', CartItemListCreateView.as_view(), name='cart-item-list-create'),
    path('cart-items/<int:pk>/', CartItemRetrieveUpdateDestroyView.as_view(), name='cart-item-retrieve-update-destroy'),
    path('cart-items-u/<int:user_id>/', CartItemList.as_view(), name='cart-item-list'),

    path('gift-cards/', GiftCardListCreateView.as_view(), name='gift-cards'),
    path('gift-cards/<int:pk>/', GiftCardRetrieveUpdateDestroyView.as_view(), name='gift-card-detail'),
    path('orders/', OrderListCreateView.as_view(), name='orders'),
    path('orders/<int:pk>/', OrderRetrieveUpdateDestroyView.as_view(), name='order-detail'),
    path('saved-addresses/', SavedAddressListCreateView.as_view(), name='saved-addresses'),
    path('saved-addresses/<int:pk>/', SavedAddressRetrieveUpdateDestroyView.as_view(), name='saved-address-detail'),
    path('saved-cards/', SavedCardListCreateView.as_view(), name='saved-cards'),
    path('saved-cards/<int:pk>/', SavedCardRetrieveUpdateDestroyView.as_view(), name='saved-card-detail'),
    path('wishlist/', WishlistListCreateView.as_view(), name='wishlist'),
    path('wishlist/<int:pk>/', WishlistRetrieveUpdateDestroyView.as_view(), name='wishlist-detail'),
    
]
                                                                                                                                                                                                                        