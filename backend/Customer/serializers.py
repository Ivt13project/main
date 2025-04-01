from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'customer_surname', 'customer_name', 'customer_patronymic', 'customer_phone_number', 'customer_email','customer_city')
        extra_kwargs = {
            'password': {'write_only': True},
            'customer_phone_number': {'read_only': True},
        }

    def create(self, validated_data):
        customer = Customer.objects.create(
            customer_surname=validated_data.get('customer_surname', ''),
            customer_name=validated_data.get('customer_name', ''),
            customer_patronymic=validated_data.get('customer_patronymic', ''),
            customer_phone_number=validated_data['customer_phone_number']
        )
        customer.set_password(validated_data['password'])
        customer.save()
        return customer

class CustomerRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'customer_surname', 'customer_name', 'customer_patronymic', 'customer_phone_number', 'customer_email','customer_city','password')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        customer = Customer.objects.create(
            customer_surname=validated_data.get('customer_surname', ''),
            customer_name=validated_data.get('customer_name', ''),
            customer_patronymic=validated_data.get('customer_patronymic', ''),
            customer_phone_number=validated_data['customer_phone_number']
        )
        customer.set_password(validated_data['password'])
        customer.save()
        return customer
