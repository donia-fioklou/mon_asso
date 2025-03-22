from django.db import models

from mon_asso_app.models.TypeReunion import TypeReunion

class Reunion(models.Model):
    nom = models.CharField(max_length=100)
    lieu = models.CharField(max_length=200)
    description = models.TextField()
    # type_reunion = models.ForeignKey(TypeReunion, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.nom