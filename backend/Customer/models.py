from django.db import models
from django.contrib.auth.hashers import make_password, check_password
class Customer(models.Model):
    customer_surname = models.CharField(max_length=50, null=True, blank=True)
    customer_name = models.CharField(max_length=50, null=True, blank=True)
    customer_patronymic = models.CharField(max_length=50, null=True, blank=True)
    customer_phone_number = models.CharField(max_length=20)
    password = models.CharField(max_length=128)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def cheak_password(self, password):
        return check_password(password, self.password)
    
    def __str__(self):
        return f"{self.customer_surname} {self.customer_name}"