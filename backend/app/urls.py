from django.urls import path
from . import views
urlpatterns=[
  path('register/',views.RegisterView.as_view(),name = "register"),
  path('products/',views.GetProducts, name="products"),
  path('products/category/<slug:val>',views.GetProductsByCategory, name="products-category"),
  path('products/search/<slug:val>',views.GetProductsBySearch, name="products-search"),
  path('login/',views.login_view, name ="login"),
  path('logout/',views.session_logout, name ="logout"),
  path('get-csrf-token/',views.get_csrf_token, name ="get-csrf-token"),
  path('add-to-cart/',views.AddToCart, name = "add-to-cart"),
  path('show-cart/',views.ShowCart, name = "show-cart"),
  path('plus-cart/',views.PlusCart, name = "plus-cart"),
  path('minus-cart/',views.MinusCart, name = "minus-cart"),
  path('remove-cart/',views.RemoveCart, name = "remove-cart"),
  path('checkout/',views.checkout,name="checkout"),
  # path('esewa/success',views.esewa_success, name="esewa_success"),
  # path('esewa/failure',views.esewa_failure, name="esewa_failure"),
  

]