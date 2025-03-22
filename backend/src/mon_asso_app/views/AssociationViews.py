from rest_framework import viewsets,status
from rest_framework.response import Response
from mon_asso_app.models.Association import Association
from mon_asso_app.serializers.AssociationSerializer import AssociationListSerializer, AssociationSerializer

class AssociationViewSet(viewsets.ModelViewSet):
    queryset = Association.objects.all()
    serializer_class = AssociationSerializer

    def get_serializer_class(self):
        if self.action == 'list' :
            return AssociationListSerializer
        if self.action == 'retrieve' :
            return AssociationSerializer
        return super().get_serializer_class()
    
    def get_queryset(self):
        return Association.objects.filter(is_deleted=False)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)