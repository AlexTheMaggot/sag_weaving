# Generated by Django 4.0.4 on 2023-05-10 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='machine',
            name='date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='machine',
            name='name',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
