from rest_framework import viewsets,status
from rest_framework.response import Response

from mon_asso_app.models.Occupe import Occupe
from mon_asso_app.serializers.OccupeSerialzer import OccupeSerializer

class OccupeViewSet(viewsets.ModelViewSet):
    queryset = Occupe.objects.all()
    serializer_class = OccupeSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)