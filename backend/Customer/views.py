from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Customer
from .serializers import CustomerSerializer, CustomerRegisterSerializer
from .jwt_auth import CustomerRefreshToken


class CustomerDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    
    def get(self, request, *args, **kwargs):
        customer = self.get_object()
        serializer = self.get_serializer(customer)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        customer = self.get_object()
        serializer = self.get_serializer(customer, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerRegisterView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerRegisterSerializer

class CustomerLoginView(generics.GenericAPIView):
    serializer_class = CustomerRegisterSerializer
    def post(self, request):
        phone_number = request.data.get('customer_phone_number')
        password = request.data.get('password')
        
        try:
            customer = Customer.objects.get(customer_phone_number=phone_number)
        except Customer.DoesNotExist:
            return Response({'error': 'Пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)
        
        if customer.check_password(password):
            return Response({'id': customer.id}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Неверный пароль'}, status=status.HTTP_401_UNAUTHORIZED)