from rest_framework import serializers
from .models import ServiceDetail, TypeOfService, ServiceRequest, ServiceRequestDetail
from Customer.models import Customer
from organization.models import Organization, Address, AddressType

class ServiceRequestSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
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

=======
    class Meta:
        model = ServiceRequest
        fields = ['id', 'customer', 'organization', 'date_service', 'add_info', 'status']

class ServiceRequestDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequestDetail
        fields = ['id', 'service_request', 'service_detail']
>>>>>>> e648ede6112044509d03f3599f8fa1579e3c64de
    


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




class GServiceRequestSerializer(serializers.ModelSerializer):
    service_detail_name = serializers.CharField(source='servicedetail.service_detail_name', read_only=True)
    organization_short_name = serializers.CharField(source='organization.organization_short_name', read_only=True)
    city_name = serializers.CharField(source='organization.addresses.first.city_name', read_only=True)
    street_name = serializers.CharField(source='organization.addresses.first.street_name', read_only=True)
    house_number = serializers.CharField(source='organization.addresses.first.house_number', read_only=True)
    service_cost = serializers.CharField(source='servicedetail.service_detail_cost', read_only=True)

    class Meta:
        model = ServiceRequest
        fields = [
            'id',
            'service_detail_name',
            'organization_short_name',
            'city_name',
            'street_name',
            'house_number',
            'date_service',
            'service_cost',
            'status'
        ]