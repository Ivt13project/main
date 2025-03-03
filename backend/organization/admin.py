from django.contrib import admin
from .models import Organization, Address, AddressType

admin.site.register(Organization)
admin.site.register(Address)
admin.site.register(AddressType)