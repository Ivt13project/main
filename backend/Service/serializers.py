from rest_framework import serializers
from .models import ServiceDetail, TypeOfService, ServiceRequest, ServiceRequestDetail
from Customer.models import Customer
from organization.models import Organization

class ServiceRequestSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    organization = serializers.PrimaryKeyRelatedField(queryset=Organization.objects.all())
    service_details = serializers.SerializerMethodField()

    class Meta:
        model = ServiceRequest
        fields = [
            'customer',
            'organization',
            'service_details',
            'date_service',
            'add_info'
        ]
    print(service_details)

    def get_service_details(self, obj):
        details = ServiceRequestDetail.objects.filter(service_request=obj)
        return [detail.service_detail_id for detail in details]

    def create(self, validated_data):
        service_details = validated_data.pop('service_details')
        service_request = ServiceRequest.objects.create(**validated_data)

        for service_detail_id in service_details:
            ServiceRequestDetail.objects.create(
                service_request=service_request,
                service_detail_id=service_detail_id
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




class ServiceRequestListSerializer(serializers.ModelSerializer):
    service_request_id = serializers.IntegerField(source='id')
    service_detail_name = serializers.CharField(source='service_request_detail.service_detail.service_detail_name')
    organization_short_name = serializers.CharField(source='organization.name')  
    city_name = serializers.CharField(source='organization.city.name')  
    street_name = serializers.CharField(source='organization.street.name')  
    house_number = serializers.CharField(source='organization.house_number')  
    service_cost = serializers.IntegerField(source='service_request_detail.service_detail.service_detail_cost')
    time_service = serializers.CharField(source='date_service.strftime("%H:%M")')  

    class Meta:
        model = ServiceRequest
        fields = [
            'service_request_id',
            'service_detail_name',
            'organization_short_name',
            'city_name',
            'street_name',
            'house_number',
            'date_service',
            'time_service',
            'service_cost',
            'status'
        ]

    def get_service_detail_name(self, obj):
        """
        Этот метод возвращает имена всех услуг, связанных с заявкой через ServiceRequestDetail.
        """
        # Получаем все связанные детали услуги для данной заявки
        service_details = obj.servicerequestdetail_set.all()
        detail_names = [detail.service_detail.service_detail_name for detail in service_details]
        return detail_names
       
    def to_representation(self, instance):
        """
        Этот метод позволяет нам обработать связанные объекты,
        такие как service_request_detail, если их несколько.
        """
        # Здесь предполагаем, что у ServiceRequest может быть несколько ServiceRequestDetail
        # и что нам нужно вернуть все связанные детали.
        data = super().to_representation(instance)

        # Если у ServiceRequest несколько ServiceRequestDetail,
        # мы собираем все связанные service_detail_name.
        service_details = []
        for detail in instance.servicerequestdetail_set.all():
            service_details.append(detail.service_detail.service_detail_name)

        data['service_detail_name'] = service_details
        return data