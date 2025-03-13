from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Customer
from .serializers import CustomerSerializer
from .jwt_auth import CustomerRefreshToken


class CustomerRegisterView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerLoginView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get('customer_phone_number')
        password = request.data.get('password')

        if not phone_number or not password:
            return Response({'error': 'Отсутствуют обязательные поля'}, status=status.HTTP_400_BAD_REQUEST)

        customer = Customer.objects.filter(customer_phone_number=phone_number).first()

        if customer is None:
            return Response({'error': 'Пользователь с таким номером телефона не найден'}, status=status.HTTP_400_BAD_REQUEST)

        if not customer.check_password(password):
            return Response({'error': 'Неверный пароль'}, status=status.HTTP_400_BAD_REQUEST)

        refresh = CustomerRefreshToken.for_user(customer)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })