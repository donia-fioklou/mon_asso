from rest_framework import viewsets,status
from rest_framework.response import Response

from mon_asso_app.models.TypeReunion import TypeReunion
from mon_asso_app.serializers.TypeReunionSerializer import TypeReunionSerializer

class TypeReunionViewSet(viewsets.ModelViewSet):
    queryset = TypeReunion.objects.all()
    serializer_class = TypeReunionSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)