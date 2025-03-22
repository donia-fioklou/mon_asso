from rest_framework import serializers

from mon_asso_app.models.Poste import Poste

class PosteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poste
        fields = '__all__'