from django.db import models

from mon_asso_app.models.Association import Association
from mon_asso_app.models.Membre import Membre
from mon_asso_app.models.Poste import Poste

class Occupe(models.Model):
    membre = models.ForeignKey(Membre, on_delete=models.CASCADE)
    poste = models.ForeignKey(Poste, on_delete=models.CASCADE)
    association = models.ForeignKey(Association, on_delete=models.CASCADE)
    is_deleted = models.BooleanField(default=False)
    