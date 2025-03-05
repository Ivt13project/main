from rest_framework import serializers
from .models import AddressType, Organization, Address

class AddressTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressType
        fields = ['address_type_name', 'add_info']

class OrganizationSerializer(serializers.ModelSerializer):
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

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'organization',
            'address_type',
            'subject_name',
            'city_name',
            'street_name',
            'house_number',
            'add_info'
        ]
