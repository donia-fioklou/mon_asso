from rest_framework import viewsets,status
from rest_framework.response import Response
from mon_asso_app.models.CompteRendu import CompteRendu
from mon_asso_app.serializers.CompteRenduSerializer import CompteRenduSerializer

class CompteRenduViewSet(viewsets.ModelViewSet):
    queryset = CompteRendu.objects.all()
    serializer_class = CompteRenduSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)