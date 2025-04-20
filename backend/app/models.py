from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
CATEGORY=(
    ('serum','Serum' ),
    ('toner','Toner' ),
    ('exfoliator','Exfoliator' ),
    ('moisturizer','Moisturizer' ),
    ('cleanser','Cleanser' ),
    ('eye cream','Eye Cream'),
    ('lip care','Lip Care'),
    ('face mask','Face Mask'),
    ('spf','SPF'),
)

class Product(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=150)
  category = models.CharField(max_length=11,choices=CATEGORY)
  price = models.IntegerField()
  description = models.TextField()
  brand = models.CharField()
  ingredients = models.TextField()
  img = models.ImageField(upload_to='images/')


class User(AbstractUser):
  id = models.AutoField(primary_key = True)
  username = models.CharField(max_length=30, unique = True)
  first_name = models.CharField(max_length= 30)
  last_name = models.CharField(max_length=30)
  address = models.CharField(max_length=50)
  email = models.EmailField(unique = True)
  phone = models.BigIntegerField(unique = True)

  REQUIRED_FIELDS =['first_name','last_name','email','phone','address']
  def __str__(self):
    return self.username
  
class Cart(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  product = models.ForeignKey(Product, on_delete = models.CASCADE)
  quantity = models.PositiveIntegerField(default = 1)

class Order(models.Model):
  PAYMENT_CHOICES = [
    ('COD', 'Cash on Delivery'),
    ('ESEWA', 'eSewa'),
    ('FONEPAY','Fonepay'),
  ]
  user = models.ForeignKey(User, on_delete= models.CASCADE)
  order_id = models.CharField(max_length = 100, unique = True)
  amount = models.DecimalField(max_digits = 10, decimal_places = 2)
  location = models.TextField()
  payment_method = models.CharField(max_length=10, choices = PAYMENT_CHOICES)
  payment_status = models.CharField(max_length= 20,default ='PENDING')
  transaction_id = models.CharField(max_length = 100, blank = True, null = True)
  created_at = models.DateTimeField(auto_now_add =True)

  def __str__(self):
    return f"Order {self.order_id} - {self.user.username}"