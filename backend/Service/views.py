from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Customer.models import Customer
from organization.models import Organization
from .models import ServiceDetail, TypeOfService, ServiceRequest, ServiceRequestDetail
from .serializers import ServiceRequestSerializer, ServiceDetailSerializer, TypeOfServiceSerializer, ServiceRequestDetailSerializer, GServiceRequestSerializer




class ServiceRequestCreateView(APIView):
    def post(self, request, *args, **kwargs):
        customer_id = request.data.get('customer_id')
        organization_id = request.data.get('organization_id')
        service_detail_id = request.data.get('service_detail_id')
        date_service = request.data.get('date_service')

      
        try:
            customer = Customer.objects.get(id=customer_id)
            organization = Organization.objects.get(id=organization_id)
            service_detail = ServiceDetail.objects.get(id=service_detail_id)
        except (Customer.DoesNotExist, Organization.DoesNotExist, ServiceDetail.DoesNotExist):
            return Response({'error': 'Invalid customer_id, organization_id, or service_detail_id'}, status=status.HTTP_400_BAD_REQUEST)

       
        service_request_data = {
            'customer': customer.id,
            'organization': organization.id,
            'date_service': date_service,
            'status': 'PENDING'
        }
        service_request_serializer = ServiceRequestSerializer(data=service_request_data)
        if service_request_serializer.is_valid():
            service_request = service_request_serializer.save()
        else:
            return Response(service_request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

       
        service_request_detail_data = {
            'service_request': service_request.id,
            'service_detail': service_detail.id
        }
        service_request_detail_serializer = ServiceRequestDetailSerializer(data=service_request_detail_data)
        if service_request_detail_serializer.is_valid():
            service_request_detail_serializer.save()
        else:
            service_request.delete()  
            return Response(service_request_detail_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'service_request': service_request_serializer.data,
            'service_request_detail': service_request_detail_serializer.data
        }, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        customer_id = request.query_params.get('customer_id')
        status_filter = request.query_params.get('status')

        service_requests = ServiceRequest.objects.all()

        if customer_id:
            service_requests = service_requests.filter(customer_id=customer_id)

        if status_filter:
            service_requests = service_requests.filter(status=status_filter)

       
        serializer = GServiceRequestSerializer(service_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ServiceRequestIDView(APIView):
    def get(self, request, id):
        try:
            service_request = ServiceRequest.objects.get(id=id)
        except ServiceRequest.DoesNotExist:
            return Response({"status": "error", "message": "Заявка не найдена."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ServiceRequestSerializer(service_request)
        return Response(serializer.data, status=status.HTTP_200_OK)



class ServiceDetailListView(APIView):
    def get(self, request): 
        service_details = ServiceDetail.objects.all()
        serializer = ServiceDetailSerializer(service_details, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class TypeOfServiceListView(APIView):
    def get(self, request):
        service_types = TypeOfService.objects.all()
        serializer = TypeOfServiceSerializer(service_types, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    



class CancelServiceRequestView(APIView):
    def post(self, request, id):
        try:
            service_request = ServiceRequest.objects.get(id=id)
        except ServiceRequest.DoesNotExist:
            return Response({"status": "error", "message": "Заявка не найдена."}, status=status.HTTP_404_NOT_FOUND)

        if service_request.status == 'COMPLETED':
            return Response({"status": "error", "message": "Заявка уже была выполнена."}, status=status.HTTP_400_BAD_REQUEST)

        if service_request.status == 'CANCELLED':
            return Response({"status": "error", "message": "Заявка уже была отменена."}, status=status.HTTP_400_BAD_REQUEST)

        service_request.status = 'CANCELLED'
        service_request.save()

        return Response({"status": "success", "message": "Заявка успешно отменена."}, status=status.HTTP_200_OK)





class UpdateServiceRequestStatusView(APIView):
    def patch(self, request, id):
        try:
            service_request = ServiceRequest.objects.get(id=id)
        except ServiceRequest.DoesNotExist:
            return Response({"status": "error", "message": "Заявка не найдена."}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get('status')
        if not new_status or new_status not in dict(ServiceRequest.STATUS_CHOICES):
            return Response({"status": "error", "message": "Некорректный статус."}, status=status.HTTP_400_BAD_REQUEST)

        if service_request.status == new_status:
            return Response({"status": "error", "message": "Новый статус совпадает с текущим статусом."}, status=status.HTTP_400_BAD_REQUEST)

        service_request.status = new_status
        service_request.save()

        return Response({"status": "success", "message": "Статус заявки успешно обновлен."}, status=status.HTTP_200_OK)