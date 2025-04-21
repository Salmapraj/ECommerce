from django.shortcuts import render
from django.db.models import Q
from .models import *
from .serializer import *
from rest_framework import generics, status
from rest_framework.decorators import permission_classes, api_view
from rest_framework import permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authtoken.models import Token
from .esewa_utils import *
from django.contrib.auth import login as django_login,logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
import uuid

# Create your views here.
class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  permission_classes = [AllowAny]
  serializer_class = RegisterSerializer

  def perform_create(self, serializer):
    user = serializer.save()




@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):  # renamed to avoid conflict with login
    serializer = LoginSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        user = serializer.validated_data['user']
        django_login(request, user)  # use _request to get the original Django request object
        return Response({
                "message": "Login successful",
                "user": {
                    "username": user.username,
                    "voted": user.phone
                }
        })
      
    return Response(serializer.errors, status=400) 

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ShowCart(request):
  user = request.user
  items = Cart.objects.filter(user = user)
  amount = 0
  for item in items:
    price = item.quantity*item.product.price
    amount += price
  serializer = CartSerializer(items, many = True)
  return Response({
    "cart_items": serializer.data,
    "total_amount": amount
  })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def session_logout(request):
    logout(request)
    return Response({"message": "Logout successful"})

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"message": "CSRF cookie set"})




@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def PlusCart(request):
  user = request.user
  product_id = request.data.get('product_id')
  product = Product.objects.get(id = product_id)
  cart_item = Cart.objects.get(Q(user = user)& Q(product = product))
  cart_item.quantity += 1
  cart_item.save()
  items = Cart.objects.filter(user = user)
  net_amount = 0
  for item in items:
    amount = item.product.price * item.quantity
    net_amount += amount
  serializer = CartSerializer(items, many = True)
  return Response({
    "cart_items": serializer.data,
    "total_amount": net_amount
  })



@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def MinusCart(request):
  user = request.user
  product_id = request.data.get('product_id')
  product = Product.objects.get(id = product_id)
  cart_item = Cart.objects.get(Q(user = user)& Q(product = product))
  cart_item.quantity -= 1
  cart_item.save()
  items = Cart.objects.filter(user = user)
  net_amount = 0
  for item in items:
    amount = item.product.price * item.quantity
    net_amount += amount
  serializer = CartSerializer(items, many = True)
  return Response({
    "cart_items": serializer.data,
    "total_amount": net_amount
  })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def RemoveCart(request):
  user = request.user;
  product_id = request.data.get("product_id")
  product = Product.objects.get(id = product_id)
  item = Cart.objects.get(Q(user = user) & Q(product = product))
  item.delete()
  items = Cart.objects.filter(user = user)
  serializer = CartSerializer(items, many = True)
  net_amount = 0
  for item in items:
    amount = item.product.price * item.quantity
    net_amount += amount
  return Response({
    "cart_items": serializer.data,
    "total_amount": net_amount
  })

  
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
  user = request.user;
  location = request.data.get("location")
  payment_method = request.data.get("payment_method")

  cart_items = Cart.objects.filter(user = user)
  if not cart_items.exists():
    return Response({'error': 'Cart is empty'}, status = status.HTTP_400_BAD_REQUEST)
  total_amount = sum(item.product.price * item.quantity for item in cart_items)

  order_id = f"ORD - {uuid.uuid4().hex[:8]}"

  order = Order.objects.create(
    user = user,
    order_id = order_id,
    amount = total_amount,
    location = location,
    payment_method = payment_method,
    payment_status = 'PENDING'
  )

  if payment_method == "COD":
    order.payment_status = 'ACCEPTED'
    order.save()
    cart_items.delete()

    return Response({
      'status': 'success',
      'message': 'Order placed successfully. Payment will be collected on delivery',
      'order_id': order_id
    })
  elif payment_method == "ESEWA":
    payment_data = generate_esewa_payment_data(amount = total_amount, order_id=order_id)
    return Response({'payment_gateway':'esewa',
      'payment_url': settings.ESEWA_API_URL,
      'payment_data': payment_data,
      'method': 'POST'})
  else:
    return Response(
            {'error': 'Invalid payment method'},
            status=status.HTTP_400_BAD_REQUEST
        )


def esewa_success(request):
  ref_id = request.GET.get('refId')
  order_id = request.GET.get('oid')
  return Response({
    "value": "Success"
  })

def failure(request):
  return Response({
    "value": "Failure"
  })


def esewa_test_view(request):
    return render(request, 'app/esewa/test.html')
