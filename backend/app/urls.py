from django.urls import path
from . import views
urlpatterns=[
  path('register/',views.RegisterView.as_view(),name = "register"),
  path('products/',views.GetProducts, name="products"),
  path('login/',views.login, name ="login")
]