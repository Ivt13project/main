from django.urls import path
from .views import AddressTypeListCreateView, OrganizationListCreateView, AddressListCreateView, OrganizationDetailView

urlpatterns = [
    path('address-types/', AddressTypeListCreateView.as_view(), name='address-type-list-create'),
    path('', OrganizationListCreateView.as_view(), name='organization-list-create'),
    path('addresses/', AddressListCreateView.as_view(), name='address-list-create'),
    path('<int:pk>/', OrganizationDetailView.as_view(), name='organization-detail'),
]
