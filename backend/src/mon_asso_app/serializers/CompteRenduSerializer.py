from rest_framework import serializers

from mon_asso_app.models.CompteRendu import CompteRendu

class CompteRenduSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompteRendu
        fields = '__all__'