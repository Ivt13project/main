from django.db import models
from Customer.models import Customer
from organization.models import Organization

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
    status = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return f"Service Request {self.id}"

class ServiceRequestDetail(models.Model):
    service_request = models.ForeignKey(ServiceRequest, on_delete=models.CASCADE)
    service_detail = models.ForeignKey(ServiceDetail, on_delete=models.CASCADE)

