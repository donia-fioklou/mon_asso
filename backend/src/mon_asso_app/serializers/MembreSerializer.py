from rest_framework import serializers

from mon_asso_app.models.Membre import Membre

class MembreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membre
        fields = '__all__'