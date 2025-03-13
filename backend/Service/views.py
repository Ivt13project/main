from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ServiceDetail, TypeOfService, ServiceRequest, ServiceRequestDetail
from .serializers import ServiceRequestSerializer, ServiceDetailSerializer, TypeOfServiceSerializer


class ServiceRequestCreateView(APIView):

    def get(self, request):
        
        customer_id = request.query_params.get('customer_id')
        status_filter = request.query_params.get('status')

        service_requests = ServiceRequest.objects.filter(customer_id=customer_id)

        if status_filter:
            service_requests = service_requests.filter(status=status_filter)

        serializer = ServiceRequestListSerializer(service_requests, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)





    def post(self, request):
       
        serializer = ServiceRequestSerializer(data=request.data)
            
        if serializer.is_valid():
           
            serializer.save()
            return Response({
                'message': 'Запрос на услугу успешно создан!',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'message': 'Ошибка при создании запроса!',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    




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
    


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ServiceRequest
from .serializers import ServiceRequestListSerializer
from django.db.models import Q


class ServiceRequestListView(APIView):
    def get(self, request):
       
        customer_id = request.query_params.get('customer_id')
        status_filter = request.query_params.get('status')
       
        service_requests = ServiceRequest.objects.filter(customer_id=customer_id)
      
        if status_filter:
            service_requests = service_requests.filter(status=status_filter)
    
        serializer = ServiceRequestListSerializer(service_requests, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)