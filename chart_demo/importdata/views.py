from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Patent,PatentAuthor, InterPatentCode
# Create your views here.

def index(request):

    patents = Patent.objects.all()
    for patent in patents:
        print(patent.pa.all())

    return HttpResponse('OK')

def get_pa_competence(request):

    panames = []
    choices = []
    i = 1
    while True:
        inx = 'pa%d' % i
        tmp = request.GET.get(inx, -1)
        if tmp == -1:
            break
        panames.append(tmp)
        i += 1

    if i == 1:
        panames = ['谷歌公司']
        results = PatentAuthor.objects.values('name').all()
        for item in results:
            choices.append(item['name'])


    name_labels = []
    attr_labels = [{'name':'专利申请数', 'max': 40},
                   {'name': '专利被引证数', 'max': 20},
                   {'name': '专利分类数量', 'max': 15},
                   {'name': '专利有权数量', 'max': 10}]
    data = []

    for paname in panames:
        pa = PatentAuthor.objects.filter(name=paname)
        if pa:
            pa = pa.first()
            patents = pa.patent_set.all()

            pat_num = len(patents)
            quoted = 0
            has_right = 0
            ipcs = []
            for patent in patents:
                quoted += patent.cdn.count()
                if patent.ls == u'有权':
                    has_right += 1
                ipc = patent.ipc.values('firstcode').all()
                for item in ipc:
                    ipcs.append(item['firstcode'])
            ipcs_num = len(set(ipcs))
            attr_data = [pat_num, quoted, ipcs_num, has_right]

        else:
            attr_data = []
        data.append({'name': paname, 'value': attr_data})
        name_labels.append(paname)

    if i == 1:
        return JsonResponse(data={'code': 1,
                              'data':{'chartData':
                                          {'nameLabels': name_labels, 'indicator': attr_labels, 'series': data},
                                  'choices':choices}})


    return JsonResponse(data={'code': 1,
                              'data':{'chartData':
                                          {'nameLabels': name_labels, 'indicator': attr_labels, 'series': data}}})

def get_ipc_type(request):

    data = []
    first = {}
    second = {}
    third = {}

    ipcs = InterPatentCode.objects.all()
    for ipc in ipcs:
        h1 = ipc.firstcode[0]
        h2 = ipc.firstcode[:3]
        h3 = ipc.firstcode[:4]
        patnum = ipc.patent_set.count()
        fir = first.get(h1, 0) + patnum
        sec = second.get(h2, 0) + patnum
        thi = third.get(h3, 0) + patnum

        first[h1] = fir
        second[h2] = sec
        third[h3] = thi

    for item in first.items():
        children = []

        for item2 in second.items():
            if item2[0][0] != item[0]:
                continue
            descendants = []

            for item3 in third.items():
                if item3[0][:3] != item2[0]:
                    continue

                grand_des = []
                for item4 in ipcs:
                    if item3[0] != item4.firstcode[:4]:
                        continue

                    grand_des.append({'value': item4.patent_set.count(), 'name': item4.code})

                descendants.append({'value': item3[1], 'name': item3[0], 'children': grand_des})

            children.append({'value': item2[1], 'name': item2[0],'children': descendants})
        data.append({'value': item[1], 'name': item[0],'children': children})
    return JsonResponse(data={'code':1, 'data': {'chartData':data}})
