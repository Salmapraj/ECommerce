from django.urls import path
from . import views
urlpatterns=[
  path('register/',views.RegisterView.as_view(),name = "register"),
  path('products/',views.GetProducts, name="products"),
  path('products/category/<slug:val>',views.GetProductsByCategory, name="products-category"),
  path('products/search/<slug:val>',views.GetProductsBySearch, name="products-search"),
  path('login/',views.login, name ="login"),
  path('logout/',views.LogoutView, name ="logout"),
  path('add-to-cart/',views.AddToCart, name = "add-to-cart"),
  path('show-cart/',views.ShowCart, name = "show-cart"),
  path('plus-cart/',views.PlusCart, name = "plus-cart"),
  path('minus-cart/',views.MinusCart, name = "minus-cart"),


]