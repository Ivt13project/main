from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Customer
from .serializers import CustomerSerializer

class CustomerRegisterView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerLoginView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get('customer_phone_number')
        password = request.data.get('password')
        customer = Customer.objects.filter(customer_phone_number=phone_number).first()
        if customer and customer.check_password(password):
            refresh = RefreshToken.for_user(customer)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Неверные учетные данные'}, status=400)
