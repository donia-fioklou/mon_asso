from django.contrib import admin

from mon_asso_app.models.Poste import Poste
from mon_asso_app.models.Reunion import Reunion
from mon_asso_app.models.TypeReunion import TypeReunion
from mon_asso_app.models.PeriodeCotisation import PeriodeCotisation
from mon_asso_app.models.Occupe import Occupe
from mon_asso_app.models.Association import Association
from mon_asso_app.models.CompteRendu import CompteRendu
from mon_asso_app.models.Membre import Membre

# Register your models here.

admin.site.register(Association)
admin.site.register(CompteRendu)
admin.site.register(Membre)
admin.site.register(Occupe)
admin.site.register(PeriodeCotisation)
admin.site.register(Poste)
admin.site.register(Reunion)
admin.site.register(TypeReunion)
