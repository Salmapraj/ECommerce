from .models import *
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken,TokenError

class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only = True, required = True, validators = [validate_password])
  password2 = serializers.CharField(write_only = True, required = True)
  class Meta:
    model = User
    fields = ['username', 'first_name','last_name','email','address','phone','password','password2']
  
  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError({
        "password": "Password fields don't match"
      })
    if len(str(attrs['phone']))!= 10:
      raise serializers.ValidationError({
        "phone": "Phone number should be 10 digits."
      })
    return attrs
  
  def create(self, validated_data):
    user = User.objects.create_user(
      username = validated_data['username'],
      first_name = validated_data['first_name'],
      last_name = validated_data['last_name'],
      email = validated_data['email'],
      phone = validated_data['phone'],
      address = validated_data['address']
    )
    user.set_password(validated_data['password'])
    user.save()
    return user
  
class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = '__all__'
  
  def __str__(self):
      return self.name
    
class MyTokenPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)
    token['username'] = user.username
    token['phone']= user.phone
    return token
  
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField(required = True)
  password = serializers.CharField(required = True)

  def validate(self, data):
    username = data.get('username')
    password = data.get('password')

    user = authenticate(username = username, password = password)
    if user is None: 
      raise serializers.ValidationError("Invalid username or password")
    data['user'] = user
    return data

class CartSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cart
    fields = '__all__'
    read_only_fields = ['user']


