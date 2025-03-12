from rest_framework import serializers
from .models import ServiceDetail, TypeOfService, ServiceRequest, ServiceRequestDetail
from Customer.models import Customer
from organization.models import Organization

class ServiceRequestSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    organization = serializers.PrimaryKeyRelatedField(queryset=Organization.objects.all())
    service_details = serializers.PrimaryKeyRelatedField(queryset=ServiceDetail.objects.all(), many=True)  # Для нескольких деталей

    class Meta:
        model = ServiceRequest
        fields = [
            'customer', 
            'organization', 
            'service_details',  # Список ID деталей услуги
            'date_service',
            'add_info'
        ]

    def create(self, validated_data):
        # Извлекаем customer, organization и дату услуги
        customer = validated_data.pop('customer')
        organization = validated_data.pop('organization')
        date_service = validated_data.pop('date_service')
        add_info = validated_data.get('add_info', None)
        
        # Создаем объект ServiceRequest
        service_request = ServiceRequest.objects.create(
            customer=customer,
            organization=organization,
            date_service=date_service,
            add_info=add_info
        )

        # Извлекаем список service_details из запроса
        service_details = validated_data.pop('service_details')

        # Создаем соответствующие записи в ServiceRequestDetail
        for service_detail in service_details:
            ServiceRequestDetail.objects.create(
                service_request=service_request,
                service_detail=service_detail
            )

        return service_request
    


class ServiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceDetail
        fields = [
            'id', 
            'service_detail_name', 
            'service_detail_cost', 
            'service_detail_duration'
        ]


class TypeOfServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfService
        fields = [
            'id', 
            'type_name'
        ]