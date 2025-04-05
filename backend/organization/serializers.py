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
            'organiztion_short_name',
            'inn', 
            'kpp', 
            'ogrn', 
            'responsible_person_email', 
            'responsible_person_phone_number',
            'responsible_person_surname',
            'responsible_person_name',
            'responsible_person_patronymic',
            #'addresses'
        ]        

class CitySerializer(serializers.Serializer):
    city_id = serializers.IntegerField(source='id')
    city_name = serializers.CharField(max_length=50)

class OrganizationRegisterSerializer(serializers.ModelSerializer):
    addresses = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Address.objects.all(),
        write_only=True  # Добавляем, если не нужно возвращать адреса в ответе
    )

    class Meta:
        model = Organization
        fields = (
            'id',
            'responsible_person_surname',
            'responsible_person_name',
            'responsible_person_patronymic',
            'responsible_person_phone_number',
            'responsible_person_email',
            'password',
            'inn',
            'kpp',
            'ogrn',
            'organization_full_name',
            'organization_short_name',
            'addresses'
        )
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        # Получаем список ID адресов
        addresses_ids = [address.id for address in validated_data.pop('addresses')]
        
        # Создаем организацию
        organization = Organization.objects.create(
            responsible_person_surname=validated_data.get('responsible_person_surname', ''),
            responsible_person_name=validated_data.get('responsible_person_name', ''),
            responsible_person_patronymic=validated_data.get('responsible_person_patronymic', ''),
            responsible_person_phone_number=validated_data['responsible_person_phone_number'],
            responsible_person_email=validated_data['responsible_person_email'],
            inn=validated_data['inn'],
            kpp=validated_data['kpp'],
            ogrn=validated_data['ogrn'],
            organization_full_name=validated_data['organization_full_name'],
            organization_short_name=validated_data['organization_short_name'],
        )
        organization.set_password(validated_data['password'])
        organization.save()

        # Привязываем адреса к организации
        Address.objects.filter(id__in=addresses_ids).update(organization=organization)
        
        return organization