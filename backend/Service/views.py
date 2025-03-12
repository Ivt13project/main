from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ServiceDetail, TypeOfService, ServiceRequest, ServiceRequestDetail
from .serializers import ServiceRequestSerializer, ServiceDetailSerializer, TypeOfServiceSerializer


class ServiceRequestCreateView(APIView):
    def post(self, request):
        # Передаем данные из запроса в сериализатор
        serializer = ServiceRequestSerializer(data=request.data)
        
        # Проверяем, что данные валидны
        if serializer.is_valid():
            # Создаем объект и сохраняем его
            serializer.save()
            return Response({
                'message': 'Запрос на услугу успешно создан!',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        
        # Если данные невалидны, возвращаем ошибку
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