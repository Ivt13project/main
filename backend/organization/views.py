from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AddressType, Organization, Address
from .serializers import AddressTypeSerializer, OrganizationSerializer, AddressSerializer, OrganizationSerializerPost, OrganizationDetailSerializer

class AddressTypeListCreateView(APIView):
    def get(self, request):
        address_types = AddressType.objects.all()
        serializer = AddressTypeSerializer(address_types, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AddressTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrganizationListCreateView(APIView):

    def get(self, request):
        organizations = Organization.objects.all()  
        serializer = OrganizationSerializer(organizations, many=True)  
        return Response(serializer.data)  
    
    def post(self, request):
        serializer = OrganizationSerializerPost(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddressListCreateView(APIView):
    def get(self, request):
        addresses = Address.objects.all()
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class OrganizationDetailView(APIView):
    def get(self, request, pk):
        try:
            organization = Organization.objects.get(pk=pk)  
        except Organization.DoesNotExist:
            return Response({"detail": "Organization not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrganizationDetailSerializer(organization)  
        return Response(serializer.data)  
