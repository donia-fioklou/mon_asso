from rest_framework import serializers

from mon_asso_app.models.Reunion import Reunion

class ReunionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reunion
        fields = '__all__'