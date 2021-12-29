from rest_framework import serializers
from .models import Services,MSDS,TC


class MSDSSerializer(serializers.ModelSerializer):
    class Meta:
        model = MSDS
        fields = '__all__'

class TCSerializer(serializers.ModelSerializer):
    class Meta:
        model = TC
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    msds = MSDSSerializer(many=True, read_only=True)
    tc = TCSerializer(many=True, read_only=True)
    class Meta:
        model = Services
        fields = '__all__'