from django.contrib import admin
from .models import AddressType, Organization, Address, AggregatorSpecialist, ConnectionRequest, AggregatorSpecialistConnectorRequest, Customer, TypeOfService, ServiceDetail, ServiceRequest, ServiceRequestDetail

admin.site.register(AddressType)
admin.site.register(Organization)
admin.site.register(Address)
admin.site.register(AggregatorSpecialist)
admin.site.register(ConnectionRequest)
admin.site.register(AggregatorSpecialistConnectorRequest)
admin.site.register(Customer)
admin.site.register(TypeOfService)
admin.site.register(ServiceDetail)
admin.site.register(ServiceRequest)
admin.site.register(ServiceRequestDetail)
