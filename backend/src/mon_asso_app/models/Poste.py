from django.db import models

class Poste(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField()
    etat = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.nom