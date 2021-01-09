from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Todo(models.Model):
    content = models.CharField(max_length=70)
    completed = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.content

    class Meta:
        ordering = ['-date']

