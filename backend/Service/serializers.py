from rest_framework import serializers
from .models import ServiceDetail, TypeOfService, ServiceRequest, ServiceRequestDetail
from Customer.models import Customer
from organization.models import Organization, Address, AddressType

class ServiceRequestSerializer(serializers.ModelSerializer):
    service_detail_name = serializers.SerializerMethodField()
    organization_short_name = serializers.CharField(source='organization.organization_short_name', read_only=True)
    city_name = serializers.CharField(source='organization.addresses.first.city_name', read_only=True)
    street_name = serializers.CharField(source='organization.addresses.first.street_name', read_only=True)
    house_number = serializers.CharField(source='organization.addresses.first.house_number', read_only=True)
    service_cost = serializers.SerializerMethodField()

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

    def get_service_detail_name(self, obj):
        service_request_detail = obj.servicerequestdetail_set.first()
        if service_request_detail:
            return service_request_detail.service_detail.service_detail_name
        return None

    def get_service_cost(self, obj):
        service_request_detail = obj.servicerequestdetail_set.first()
        if service_request_detail:
            return service_request_detail.service_detail.service_detail_cost
        return None
    
class ServiceRequestDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequestDetail
        fields = ['id', 'service_request', 'service_detail']
    


class ServiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceDetail
        fields = [
            'id', 
            'type_of_service',
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


class ServiceRequestCreateSerializer(serializers.ModelSerializer):
    service_detail_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = ServiceRequest
        fields = [
            'customer', 
            'organization', 
            'date_service', 
            'add_info', 
            'service_detail_id'
        ]
        extra_kwargs = {
            'customer': {'required': True},
            'organization': {'required': True},
            'date_service': {'required': True},
            'service_detail_id': {'required': True}
        }