import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseForbidden
from .api_methods import *


methods = {
    'AuthCheck': auth_check,
    'Logout': logout,
    'DashboardGet': dashboard_get,
    'MachineCreate': machine_create,
    'MachineGetList': machine_list,
    'MachineGetDetail': machine_detail,
    'MachineUpdate': machine_update,
    'MachineDelete': machine_delete,
    'SpeedCreate': speed_create,
    'SpeedGetList': speed_list,
    'SpeedGetDetail': speed_detail,
    'SpeedUpdate': speed_update,
    'SpeedDelete': speed_delete,
    'DataCreate': data_create,
    'DataGetList': data_list,
    'DataGetDetail': data_detail,
    'DataUpdate': data_update,
    'DataDelete': data_delete,
}


@csrf_exempt
def index(request):
    if request.method == 'POST':
        request_data = json.loads(request.body)
        method = request_data['method']
        if method == 'Auth':
            return auth(request, request_data)
        else:
            if request.user.is_authenticated:
                if method in methods.keys():
                    run = methods[request_data['method']]
                    return run(request, request_data)
                else:
                    return make_error(request_data['id'], 1002)
            else:
                return make_error(request_data['id'], 1003)
    else:
        return HttpResponseForbidden()