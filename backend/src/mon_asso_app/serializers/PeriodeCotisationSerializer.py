from rest_framework import serializers

from mon_asso_app.models.PeriodeCotisation import PeriodeCotisation

class PeriodeCotisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodeCotisation
        fields = '__all__'
