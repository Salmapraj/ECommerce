from django.urls import path
from . import views
urlpatterns=[
  path('register/',views.RegisterView.as_view(),name = "register"),
  path('products/',views.GetProducts, name="products"),
  path('products/category/<slug:val>',views.GetProductsByCategory, name="products-category"),
  path('products/brand/<slug:val>',views.GetProductsByBrand, name="products-brand"),
  path('login/',views.login, name ="login")
]