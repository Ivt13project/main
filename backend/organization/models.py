from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class AddressType(models.Model):
    address_type_name = models.CharField(max_length=30)
    add_info = models.CharField(max_length=250, null=True, blank=True)

    def __str__(self):
        return self.address_type_name

class Organization(models.Model):
    organization_full_name = models.CharField(max_length=150, blank=True, null=True)
    organization_short_name = models.CharField(max_length=50, blank=True, null=True)
    inn = models.CharField(max_length=10)
    kpp = models.CharField(max_length=9)
    ogrn = models.CharField(max_length=13)
    responsible_person_surname = models.CharField(max_length=50, blank=True, null=True)
    responsible_person_name = models.CharField(max_length=50, blank=True, null=True)
    responsible_person_patronymic = models.CharField(max_length=50, null=True, blank=True)
    responsible_person_email = models.CharField(max_length=50, blank=True, null=True)
    responsible_person_phone_number = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=128)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, password):
        return check_password(password, self.password)
    
    def __str__(self):
        return f"Organization {self.id}"

class Address(models.Model):
    organization = models.ForeignKey(Organization, related_name='addresses', on_delete=models.CASCADE)
    address_type = models.ForeignKey(AddressType, related_name='addresses', on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=50)
    city_name = models.CharField(max_length=50)
    street_name = models.CharField(max_length=50)
    house_number = models.CharField(max_length=10)
    add_info = models.CharField(max_length=250, null=True, blank=True)

    def __str__(self):
        return f"{self.city_name}, {self.street_name}, {self.house_number}"
