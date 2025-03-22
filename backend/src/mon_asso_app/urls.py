from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views.AssociationViews import AssociationViewSet
from .views.CompteRenduViews import CompteRenduViewSet
from .views.MembreViews import MembreViewSet
from .views.OccupeViews import OccupeViewSet
from .views.PeriodeCotisationViews import PeriodeCotisationViewSet
from .views.PosteViews import PosteViewSet
from .views.ReunionViews import ReunionViewSet
from .views.TypeReunionViews import TypeReunionViewSet


router = DefaultRouter()
router.register('associations', AssociationViewSet)
router.register('compte_rendus', CompteRenduViewSet)
router.register('membres', MembreViewSet)
router.register('occupe', OccupeViewSet)
router.register('periode_cotisations', PeriodeCotisationViewSet)
router.register('postes', PosteViewSet)
router.register('reunions', ReunionViewSet)
router.register('type_reunions', TypeReunionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
