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

class AggregatorSpecialist(models.Model):
    aggregator_specialist_surname = models.CharField(max_length=50)
    aggregator_specialist_name = models.CharField(max_length=50)
    aggregator_specialist_patronymic = models.CharField(max_length=50, null=True, blank=True)
    aggregator_specialists_department = models.CharField(max_length=30)
    aggregator_specialists_position = models.CharField(max_length=20)
    aggregator_specialists_phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.aggregator_specialist_surname} {self.aggregator_specialist_name}"

class ConnectionRequest(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    reg_number = models.CharField(max_length=20)
    date_begin = models.DateField()
    date_end = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20)
    add_info = models.CharField(max_length=250, null=True, blank=True)

    def __str__(self):
        return self.reg_number

class AggregatorSpecialistConnectorRequest(models.Model):
    aggregator_specialist = models.ForeignKey(AggregatorSpecialist, on_delete=models.CASCADE)
    connection_request = models.ForeignKey(ConnectionRequest, on_delete=models.CASCADE)

class Customer(models.Model):
    customer_surname = models.CharField(max_length=50)
    customer_name = models.CharField(max_length=50)
    customer_patronymic = models.CharField(max_length=50, null=True, blank=True)
    customer_phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.customer_surname} {self.customer_name}"

class TypeOfService(models.Model):
    type_code = models.CharField(max_length=2)
    type_name = models.CharField(max_length=30)

    def __str__(self):
        return self.type_name

class ServiceDetail(models.Model):
    type_of_service = models.ForeignKey(TypeOfService, on_delete=models.CASCADE)
    service_detail_code = models.CharField(max_length=3)
    service_detail_name = models.CharField(max_length=50)
    service_detail_cost = models.IntegerField()
    service_detail_duration = models.IntegerField()

    def __str__(self):
        return self.service_detail_name

class ServiceRequest(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    date_service = models.DateTimeField()
    add_info = models.CharField(max_length=250, null=True, blank=True)

    def __str__(self):
        return f"Service Request {self.id}"

class ServiceRequestDetail(models.Model):
    service_request = models.ForeignKey(ServiceRequest, on_delete=models.CASCADE)
    service_detail = models.ForeignKey(ServiceDetail, on_delete=models.CASCADE)

