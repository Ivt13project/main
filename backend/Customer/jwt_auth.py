from rest_framework_simplejwt.tokens import RefreshToken
from .models import Customer

class CustomerRefreshToken(RefreshToken):
    @classmethod
    def for_user(cls, customer):
        token = super().for_user(customer)
        token['customer_id'] = customer.id
        return token