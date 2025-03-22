from rest_framework import viewsets,status
from rest_framework.response import Response

from mon_asso_app.models.Reunion import Reunion
from mon_asso_app.serializers.ReunionSerializer import ReunionSerializer

class ReunionViewSet(viewsets.ModelViewSet):
    queryset = Reunion.objects.all()
    serializer_class = ReunionSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)