from django.urls import path
from .views import ServiceRequestCreateView, ServiceDetailListView, TypeOfServiceListView

urlpatterns = [
    path('requests/', ServiceRequestCreateView.as_view(), name='Service-Request-create'),
    path('details/', ServiceDetailListView.as_view(), name='Service-Details-list'),
    path('types/', TypeOfServiceListView.as_view(), name='Service-Types-list'),
]
