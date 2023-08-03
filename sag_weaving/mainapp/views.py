from django.shortcuts import render, get_object_or_404
from api.models import *


def index(request):
    template = 'mainapp/index.html'
    return render(request, template)


def get_machine_id(request, machine_id):
    machine = get_object_or_404(Machine, id=machine_id)
    template = 'mainapp/index.html'
    return render(request, template)
