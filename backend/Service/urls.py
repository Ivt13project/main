from django.urls import path
from .views import ServiceRequestCreateView, ServiceDetailListView, TypeOfServiceListView, CancelServiceRequestView, UpdateServiceRequestStatusView, ServiceRequestIDView
urlpatterns = [
<<<<<<< HEAD
    path('requests/', ServiceRequestCreateView.as_view(), name='Service-Request-create'),
    path('details/', ServiceDetailListView.as_view(), name='Service-Details-list'),
    path('types/', TypeOfServiceListView.as_view(), name='Service-Types-list'),
=======
    path('requests', ServiceRequestCreateView.as_view(), name='Service-Request'),
    path('requests/<int:id>/', ServiceRequestIDView.as_view(), name='Service-Request-ID'),
    path('requests/<int:id>/cancel', CancelServiceRequestView.as_view(), name='Сancel_request'),
    path('requests/<int:id>/status', UpdateServiceRequestStatusView.as_view(), name='Update_status_request'),
    path('details', ServiceDetailListView.as_view(), name='Service-Details-list'),
    path('types', TypeOfServiceListView.as_view(), name='Service-Types-list'),
>>>>>>> e648ede6112044509d03f3599f8fa1579e3c64de
]
