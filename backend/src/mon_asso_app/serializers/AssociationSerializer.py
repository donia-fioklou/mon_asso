from rest_framework import serializers

from mon_asso_app.models.Association import Association

class AssociationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Association
        fields = '__all__'

class AssociationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Association
        fields = ['id', 'nom', 'sigle','date_creation','description']