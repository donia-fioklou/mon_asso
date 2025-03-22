from rest_framework import viewsets,status
from rest_framework.response import Response

from mon_asso_app.models.Membre import Membre
from mon_asso_app.serializers.MembreSerializer import MembreSerializer

class MembreViewSet(viewsets.ModelViewSet):
    queryset = Membre.objects.all()
    serializer_class = MembreSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    