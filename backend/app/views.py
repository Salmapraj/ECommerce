from django.shortcuts import render
from django.db.models import Q
from .models import *
from .serializer import *
from rest_framework import generics, status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  permission_classes = [AllowAny]
  serializer = RegisterSerializer

  def perform_create(self, serializer):
    user = serializer.save()

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
  serializer = LoginSerializer(data = request.data)
  if serializer.is_valid():
    user = serializer.validated_data['user']
    refresh = RefreshToken.for_user(user)
    access_token = refresh.access_token
    access_token['username'] = user.username
    access_token['phone']  = user.phone
    return Response({
      'refresh' : str(refresh),
      'access': str(access_token),
      'user': {
        'username': user.username,
        'phone': user.phone
      }
    }, status = status.HTTP_200_OK)
  else:
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
def GetProducts(request):
  product = Product.objects.all()
  serializer = ProductSerializer(product, many = True)
  return Response(serializer.data)


@api_view(['GET'])
def GetProductsByCategory(request , val):
  products = Product.objects.filter(category__iexact = val)
  serializer = ProductSerializer(products, many = True)
  return Response(serializer.data)

@api_view(['GET'])
def GetProductsBySearch(request, val):
  products = Product.objects.filter(
    Q(name__icontains = val)|
    Q(brand__icontains = val)|
    Q(category__icontains = val)
  )
  serializer = ProductSerializer(products, many = True)
  return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddToCart(request):
  user = request.user
  product_id = request.data.get('product_id')
  quantity = request.data.get('quantity')

  try:
    product = Product.objects.get(id = product_id)
  except Product.DoesNotExist:
    return Response({'error': 'Product Not Found'}, status = status.HTTP_400_BAD_REQUEST)
  
  cart_item, created = Cart.objects.get_or_create(user = user, product = product, quantity = quantity)

  if not created: 
    cart_item.quantity += 1

  cart_item.save()
  serializer = CartSerializer(cart_item)
  return Response(serializer.data, status = status.HTTP_201_CREATED)

  

