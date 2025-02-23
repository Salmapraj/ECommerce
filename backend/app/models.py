from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
CATEGORY=(
    ('serum','serum' ),
    ('toner','toner' ),
    ('exfoliator','exfoliator' ),
    ('moisturizer','moisturizer' ),
    ('cleanser','cleanser' ),
    ('serum','serum' ),
    ('eye cream','eye cream'),
    ('lip care','lip care'),
    ('face mask','face mask'),
)

class Product(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=150)
  category = models.CharField(max_length=11,choices=CATEGORY)
  price = models.IntegerField()
  description = models.TextField()
  brand = models.CharField()
  ingredients = models.TextField()
  img = models.ImageField(upload_to='images')


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
