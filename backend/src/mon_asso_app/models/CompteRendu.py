from django.db import models

from mon_asso_app.models.Reunion import Reunion

class CompteRendu(models.Model):
    titre = models.CharField(max_length=200)
    description = models.TextField()
    reunion = models.ForeignKey(Reunion, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
