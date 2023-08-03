import datetime
import pytz
from typing import Any
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as logout_view
from django.http import JsonResponse
from django.db.models import Q
from .models import *

ERRORS = {
    1001: 'WrongPassword',
    1002: 'WrongMethod',
    1003: 'AuthFail',
}


def make_success(api_id, result: Any = 'Success'):
    response = {
        'jsonrpc': '2.0',
        'id': api_id,
        'result': result,
    }
    return JsonResponse(response)


def make_error(api_id, error_code):
    response = {
        'jsonrpc': '2.0',
        'id': api_id,
        'error': {'code': error_code, 'message': ERRORS[error_code]},
    }
    return JsonResponse(response)


def auth(request, request_data):
    user = authenticate(
        request,
        username=request_data['params']['login'],
        password=request_data['params']['password']
    )
    if user is None:
        return make_error(request_data['id'], 1001)
    else:
        login(request, user)
        return make_success(request_data['id'])


def auth_check(request, request_data):
    return make_success(request_data['id'])


def logout(request, request_data):
    logout_view(request)
    return make_success(request_data['id'])


def machine_create(request, request_data):
    machine = Machine(
        name=request_data['params']['name'],)
    machine.save()
    return make_success(request_data['id'])


def machine_list(request, request_data):
    machines = Machine.objects.all()
    response = []
    for m in machines:
        resp_t = {
            'id': m.pk,
            'name': m.name,
            'date': m.date,
        }
        response.append(resp_t)
    return make_success(request_data['id'], response)


def machine_detail(request, request_data):
    machine = Machine.objects.get(id=request_data['params']['id'])
    response = {
        'id': machine.pk,
        'name': machine.name,
        'date': machine.date,
    }
    return make_success(request_data['id'], response)


def machine_update(request, request_data):
    machine = Machine.objects.get(id=request_data['params']['id'])
    machine.name = request_data['params']['name']
    machine.save()
    return make_success(request_data['id'])


def machine_delete(request, request_data):
    machine = Machine.objects.get(id=request_data['params']['id'])
    machine.delete()
    return make_success(request_data['id'])


def speed_create(request, request_data):
    machine = Machine.objects.get(id=request_data['params']['machine'])
    speed = Speed(
        speed=request_data['params']['speed'],
        machine=machine,
    )
    speed.save()
    return make_success(request_data['id'])


def speed_list(request, request_data):
    if 'params' in request_data.keys():
        speeds = []
        speed = Speed.objects.all().filter(machine__id=request_data['params']['machine'])
        speed = speed.order_by('-pk').first()
        speeds.append(speed)
    else:
        speeds = Speed.objects.all().order_by('-pk')
    response = []
    if speeds != [None]:
        for s in speeds:
            resp_t = {
                'id': s.pk,
                'speed': s.speed,
                'machine': {
                    'id': s.machine.pk,
                    'name': s.machine.name,
                    'date': s.machine.date,
                },
                'date': s.date,
            }
            response.append(resp_t)
    else:
        response = []
    return make_success(request_data['id'], response)


def speed_detail(request, request_data):
    speed = Speed.objects.get(id=request_data['params']['id'])
    response = {
        'id': speed.pk,
        'speed': speed.speed,
        'machine': {
            'id': speed.machine.pk,
            'name': speed.machine.name,
            'date': speed.machine.date,
        },
        'date': speed.date,
    }
    return make_success(request_data['id'], response)


def speed_update(request, request_data):
    speed = Speed.objects.get(id=request_data['params']['id'])
    speed.speed = request_data['params']['speed']
    speed.save()
    return make_success(request_data['id'])


def speed_delete(request, request_data):
    speed = Speed.objects.get(id=request_data['params']['id'])
    speed.delete()
    return make_success(request_data['id'])


def data_create(request, request_data):
    machine = Machine.objects.get(id=request_data['params']['machine'])
    data = Data(
        pixels=request_data['params']['pixels'],
        machine=machine,
    )
    data.save()
    return make_success(request_data['id'])


def data_list(request, request_data):
    data = Data.objects.all().order_by('-pk')
    response = []
    for d in data:
        resp_t = {
            'id': d.pk,
            'pixels': d.pixels,
            'datetime': d.datetime,
            'machine': {
                'id': d.machine.pk,
                'name': d.machine.name,
                'date': d.machine.date,
            },
        }
        response.append(resp_t)
    return make_success(request_data['id'], response)


def data_detail(request, request_data):
    data = Data.objects.get(id=request_data['params']['id'])
    response = {
        'id': data.pk,
        'pixels': data.pixels,
        'datetime': data.datetime,
        'machine': {
            'id': data.machine.pk,
            'name': data.machine.name,
            'date': data.machine.date,
        },
    }
    return make_success(request_data['id'], response)


def data_update(request, request_data):
    data = Data.objects.get(id=request_data['params']['id'])
    data.pixels = request_data['params']['pixels']
    data.save()
    return make_success(request_data['id'])


def data_delete(request, request_data):
    data = Data.objects.get(id=request_data['params']['id'])
    data.delete()
    return make_success(request_data['id'])


def dashboard_get(request, request_data):
    def percent_calc(machine=None, speed=None, pix_obj=None, start_shift=None):
        if pix_obj is not None:
            pix_h = pix_obj.date_time.hour
            shift_h = start_shift.hour
            if pix_h - shift_h < 0:
                cur_m = ((24 - shift_h + pix_h) * 60) + pix_obj.date_time.minute
            else:
                cur_m = ((pix_h - shift_h) * 60) + pix_obj.date_time.minute
            if cur_m > 480:
                cur_m = 480
            exp_p = (pix_obj.pixels * 480) / cur_m
            plan_p = speed * 480
            percent = (exp_p * 100) / plan_p
            result = {
                'machine': {
                    'id': machine.pk,
                    'name': machine.name,
                },
                'percent': percent,
            }
        else:
            result = {
                'machine': {
                    'id': machine.pk,
                    'name': machine.name,
                },
                'percent': 0,
            }
        return result
    tz = pytz.timezone('Asia/Samarkand')
    response = {
        'shift_1': [],
        'shift_2': [],
        'shift_3': [],
    }
    machines = Machine.objects.all()
    now = datetime.datetime.now()
    start_date = now - datetime.timedelta(days=1)
    end_date = now + datetime.timedelta(days=1)
    pix = Data.objects.all().filter(date_time__range=[start_date.date(), end_date.date()]).order_by('-pk')
    first_shift = pix.filter(date_time__time__range=(datetime.time(3, 16), datetime.time(11, 15, 59)))
    second_shift = pix.filter(date_time__time__range=(datetime.time(11, 16), datetime.time(19, 15, 59)))
    third_shift = pix.filter(
        Q(date_time__time__range=(datetime.time(19, 16), datetime.time(23, 59, 59))) |
        Q(date_time__time__range=(datetime.time(0), datetime.time(3, 15, 59)))
    )
    for m in machines:
        m_speed = Speed.objects.all().filter(machine_id=m.pk).order_by('-pk').first()
        if m_speed is None:
            response['shift_1'].append(percent_calc(machine=m))
            response['shift_2'].append(percent_calc(machine=m))
            response['shift_3'].append(percent_calc(machine=m))
        else:
            current_pixels_1 = first_shift.filter(machine_id=m.pk).order_by('-pk').first()
            current_pixels_2 = second_shift.filter(machine_id=m.pk).order_by('-pk').first()
            current_pixels_3 = third_shift.filter(machine_id=m.pk).order_by('-pk').first()
            response['shift_1'].append(percent_calc(
                m,
                m_speed.speed,
                current_pixels_1,
                datetime.time(3))
            )
            response['shift_2'].append(percent_calc(
                m,
                m_speed.speed,
                current_pixels_2,
                datetime.time(11))
            )
            response['shift_3'].append(percent_calc(
                m,
                m_speed.speed,
                current_pixels_3,
                datetime.time(19))
            )

    return make_success(request_data['id'], response)
