from django.db import models

class AddressType(models.Model):
    address_type_name = models.CharField(max_length=30)
    add_info = models.CharField(max_length=250, null=True, blank=True)

    def __str__(self):
        return self.address_type_name

class Organization(models.Model):
    organization_full_name = models.CharField(max_length=150)
    organization_short_name = models.CharField(max_length=50)
    inn = models.CharField(max_length=10)
    kpp = models.CharField(max_length=9)
    ogrn = models.CharField(max_length=13)
    responsible_person_surname = models.CharField(max_length=50)
    responsible_person_name = models.CharField(max_length=50)
    responsible_person_patronymic = models.CharField(max_length=50, null=True, blank=True)
    responsible_person_email = models.CharField(max_length=50)
    responsible_person_phone_number = models.CharField(max_length=20)

    def __str__(self):
        return self.organization_short_name

class Address(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    address_type = models.ForeignKey(AddressType, on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=50)
    city_name = models.CharField(max_length=50)
    street_name = models.CharField(max_length=50)
    house_number = models.CharField(max_length=10)
    add_info = models.CharField(max_length=250, null=True, blank=True)

    def __str__(self):
        return f"{self.city_name}, {self.street_name}, {self.house_number}"
