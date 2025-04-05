from django.urls import path
from .views import ServiceRequestCreateView, ServiceDetailListView, TypeOfServiceListView, CancelServiceRequestView, UpdateServiceRequestStatusView, ServiceRequestIDView, ServiceRequestCreateView
urlpatterns = [
    path('requests', ServiceRequestCreateView.as_view(), name='Service-Request'),
    path('requests/<int:id>/', ServiceRequestIDView.as_view(), name='Service-Request-ID'),
    path('requests/<int:id>/cancel', CancelServiceRequestView.as_view(), name='Сancel_request'),
    path('requests/<int:id>/status', UpdateServiceRequestStatusView.as_view(), name='Update_status_request'),
    path('details', ServiceDetailListView.as_view(), name='Service-Details-list'),
    path('types', TypeOfServiceListView.as_view(), name='Service-Types-list'),
    path('create', ServiceRequestCreateView.as_view(), name='Service-Create'),
]

