from rest_framework import serializers

from mon_asso_app.models.TypeReunion import TypeReunion

class TypeReunionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeReunion
        fields = '__all__'