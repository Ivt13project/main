from rest_framework import serializers
from .models import AddressType, Organization, Address

class AddressTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressType
        fields = ['address_type_name', 'add_info']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        address_type = AddressTypeSerializer()  
        organization = serializers.PrimaryKeyRelatedField(queryset=Organization.objects.all())  
        model = Address
        fields = [
            'city_name',
            'street_name',
            'house_number'
        ]


class OrganizationSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    class Meta:
        model = Organization
        fields = [       
            'id',
            'organization_short_name',                       
            'addresses'
        ]



class OrganizationSerializerPost(serializers.ModelSerializer):

    class Meta:
        model = Organization
        fields = [
             'organization_full_name',
             'organization_short_name',
             'inn',
             'kpp',
             'ogrn',
             'responsible_person_surname',
             'responsible_person_name',
             'responsible_person_patronymic',
             'responsible_person_email',
             'responsible_person_phone_number'
         ]



class OrganizationDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = [
            'organization_full_name', 
            'inn', 
            'kpp', 
            'ogrn', 
            'responsible_person_email', 
            'responsible_person_phone_number'
        ]        

class CitySerializer(serializers.Serializer):
    city_id = serializers.IntegerField(source='id')
    city_name = serializers.CharField(max_length=50)