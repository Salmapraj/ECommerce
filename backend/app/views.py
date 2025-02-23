from django.shortcuts import render
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
  serializer_class = RegisterSerializer

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
  serializer_class = ProductSerializer(product, many = True)
  return Response(serializer_class.data)

