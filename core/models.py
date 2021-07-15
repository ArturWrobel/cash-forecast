from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_member = models.BooleanField(default=False)
    on_free_trial = models.BooleanField(default=True)


class File(models.Model):
    file = models.FileField()

    def __str__(self):
        return self.file.name
