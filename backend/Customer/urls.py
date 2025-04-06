from django.urls import path
from .views import CustomerRegisterView, CustomerLoginView, CustomerDetailAPIView

urlpatterns = [
    path('register/', CustomerRegisterView.as_view(), name='customer-register'),
    path('login/', CustomerLoginView.as_view(), name='customer-login'),
    path('<int:pk>/', CustomerDetailAPIView.as_view(), name='customer-detail'),
]
