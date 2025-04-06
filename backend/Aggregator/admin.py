from django.contrib import admin
from .models import AggregatorSpecialist, ConnectionRequest, AggregatorSpecialistConnectorRequest

admin.site.register(AggregatorSpecialist)
admin.site.register(ConnectionRequest)
admin.site.register(AggregatorSpecialistConnectorRequest)