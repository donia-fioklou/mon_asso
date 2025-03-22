from rest_framework import viewsets,status
from rest_framework.response import Response

from mon_asso_app.models.Poste import Poste
from mon_asso_app.serializers.PosteSerializer import PosteSerializer

class PosteViewSet(viewsets.ModelViewSet):
    queryset = Poste.objects.all()
    serializer_class = PosteSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)