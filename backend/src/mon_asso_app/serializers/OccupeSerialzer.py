from rest_framework import serializers

from mon_asso_app.models.Occupe import Occupe

class OccupeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupe
        fields = '__all__'