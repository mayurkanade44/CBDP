from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, APIView
from.models import Services,MSDS,TC, SOP
from .serializers import ServiceSerializer, MSDSSerializer, TCSerializer, SOPSerializer
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.core.mail import EmailMessage
import requests

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['name'] = self.user.first_name
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class ServiceList(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        services = Services.objects.all()
        serializers = ServiceSerializer(services, many=True)
        return Response(serializers.data)

class ServiceDetail(APIView):

    def get(self, request, pk):
        try:
            blog = Services.objects.get(pk=pk)
            serializer = ServiceSerializer(blog)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

class MSDSList(APIView):

    def get(self, request):
        msds = MSDS.objects.all()
        serializers = MSDSSerializer(msds, many=True)
        return Response(serializers.data)

# class TCList(APIView):

#     def get(self, request):
#         tc = TC.objects.all()
#         serializers = TCSerializer(tc, many=True)
#         return Response(serializers.data)

# class SOPList(APIView):

#     def get(self, request):
#         sop = SOP.objects.all()
#         serializers = SOPSerializer(sop, many=True)
#         return Response(serializers.data)


class MailSend(APIView):
    def post(self, request):
        data = request.data
        files = dict(zip(data['names'], data['files'] ))
        filname = '\n'.join(data['names'])    
        # to = (data['files'])
        # response = requests.get("https://res.cloudinary.com/epcorn/raw/upload/v1/media/CoffeeMachineProgramRequirements_2_znt43e.pdf")
        try:
        
        
            email = EmailMessage(
                'Mail From Cloud Based Documentation Portal-EPCORN',
                "Greetings of the hour,\n\nYou have received an email with attachments pertaining to MSDS, Technical Sheets & SOP, based on the choice made by the sender, this is an automated email and in case you are not the intended or concerned recipient of the attachments/email, do write back to us for us to verify.\n\nCloud Based Document Portal (www.cbdp.herokuapp.com) is an online portal developed by EPCORN, for ease of collating & sharing relevant documents pertaining to pests and its treatments and available data from different research and publications.\nYou can share your additions and point out errors or corrections if any on epcorn@yahoo.in\n\nThanking You,\n[EPCORN]",
                'EPCORN <epcorn@yahoo.in>',
                [data['email']]
                )
            for key, value in files.items():
                response = requests.get(value)
                email.attach(key, response.content, mimetype="application/pdf")
            email.send()
            msg = {'msg': 'Email Has Been Sent'}
            return Response(msg, status=status.HTTP_201_CREATED)

        except:
            msg = {'msg': 'Server Error'}
            return Response(msg, status=status.HTTP_400_BAD_REQUEST)
