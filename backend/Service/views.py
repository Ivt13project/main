from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Customer.models import Customer
from organization.models import Organization
from .models import ServiceDetail, TypeOfService, ServiceRequest, ServiceRequestDetail
from .serializers import ServiceRequestSerializer, ServiceDetailSerializer, TypeOfServiceSerializer, ServiceRequestCreateSerializer, GServiceRequestSerializer




class ServiceRequestCreateView(APIView):
    

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
    



class ServiceRequestCreateView(APIView):
    """
    Создание новой заявки на услугу
    Пример тела запроса:
    {
        "customer": 1,
        "organization": 1,
        "date_service": "2023-12-31T12:00:00",
        "add_info": "Дополнительная информация",
        "service_detail_id": 1
    }
    """
    def post(self, request, *args, **kwargs):
        serializer = ServiceRequestCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Проверяем существование связанных объектов
            customer = get_object_or_404(Customer, id=request.data['customer'])
            organization = get_object_or_404(Organization, id=request.data['organization'])
            service_detail = get_object_or_404(ServiceDetail, id=request.data['service_detail_id'])

            # Создаем заявку
            service_request = ServiceRequest.objects.create(
                customer=customer,
                organization=organization,
                date_service=request.data['date_service'],
                add_info=request.data.get('add_info', ''),
                status='PENDING'
            )

            # Создаем детали заявки
            ServiceRequestDetail.objects.create(
                service_request=service_request,
                service_detail=service_detail
            )

            # Возвращаем созданную заявку
            response_data = {
                'id': service_request.id,
                'customer': service_request.customer.id,
                'organization': service_request.organization.id,
                'date_service': service_request.date_service,
                'add_info': service_request.add_info,
                'status': service_request.status,
                'service_detail': {
                    'id': service_detail.id,
                    'name': service_detail.service_detail_name,
                    'cost': service_detail.service_detail_cost
                },
                'message': 'Заявка успешно создана'
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )