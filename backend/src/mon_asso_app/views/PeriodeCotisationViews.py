from rest_framework import viewsets,status
from rest_framework.response import Response

from mon_asso_app.models.PeriodeCotisation import PeriodeCotisation
from mon_asso_app.serializers.PeriodeCotisationSerializer import PeriodeCotisationSerializer

class PeriodeCotisationViewSet(viewsets.ModelViewSet):
    queryset = PeriodeCotisation.objects.all()
    serializer_class = PeriodeCotisationSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)