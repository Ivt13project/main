from django.db import models

class Customer(models.Model):
    customer_surname = models.CharField(max_length=50)
    customer_name = models.CharField(max_length=50)
    customer_patronymic = models.CharField(max_length=50, null=True, blank=True)
    customer_phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.customer_surname} {self.customer_name}"