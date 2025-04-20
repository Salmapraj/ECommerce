import hashlib
import uuid
from django.conf import settings

def generate_esewa_payment_data(amount, order_id, service_charge = 0):
  data = {
    'amount' : amount,
    'product_delivery_charge': 0,
    'product_service_charge': service_charge,
    'tax_amount': 0,
    'total_amount': float(amount) + float(service_charge),
    'transaction_uuid': order_id,
    'product_code': settings.ESEWA_MERCHANT_ID,
    'success_url': settings.ESEWA_SUCCESS_URL,
    'failure_url': settings.ESEWA_FAILURE_URL,
    
  }
  return data

def verify_esewa_payment(pid, refId,amount):
  import requests
  data = {
    'amount': amount,
    'transaction_id': pid, 
    'product_code': settings.ESEWA_MERCHANT_ID

  }
  response = requests.post(settings.ESEWA_VERIFY_URL, data = data)
  if response.status_code == 200:
    res_data = response.json()
    return res_data.get('status') == "COMPLETE"
  return False