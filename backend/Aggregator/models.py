from django.db import models
from organization.models import Organization

class AggregatorSpecialist(models.Model):
    aggregator_specialist_surname = models.CharField(max_length=50, verbose_name="Фамилия")
    aggregator_specialist_name = models.CharField(max_length=50, verbose_name="Имя")
    aggregator_specialist_patronymic = models.CharField(max_length=50, null=True, blank=True, verbose_name="Отчество")
    aggregator_specialists_department = models.CharField(max_length=30, verbose_name="Отдел")
    aggregator_specialists_position = models.CharField(max_length=20, verbose_name="Должность")
    aggregator_specialists_phone_number = models.CharField(max_length=20, verbose_name="Телефон")

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