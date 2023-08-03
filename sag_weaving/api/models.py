from django.db import models


class Machine(models.Model):
    name = models.CharField(max_length=200, null=True)
    date = models.DateField(auto_now_add=True, null=True)


class Speed(models.Model):
    speed = models.IntegerField(null=True)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, null=True)
    date = models.DateField(auto_now_add=True, null=True)


class Data(models.Model):
    pixels = models.IntegerField(null=True)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, null=True)
    date_time = models.DateTimeField(auto_now_add=True, null=True)
