from django.contrib import admin
from .models import TypeOfService, ServiceDetail, ServiceRequest, ServiceRequestDetail

admin.site.register(TypeOfService)
admin.site.register(ServiceDetail)
admin.site.register(ServiceRequest)
admin.site.register(ServiceRequestDetail)