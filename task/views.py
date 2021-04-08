from django.shortcuts import render, redirect
from django.views.generic import View
from django.http import JsonResponse
from django.forms.models import model_to_dict
from .models import Task
from .forms import TaskForm


class TaskList(View):
    def get(self, request):
        form = TaskForm()
        task_obj = Task.objects.all()
        return render(request, 'task/index.html', {'form': form, 'obj': task_obj})

    def post(self, request):
        form = TaskForm(request.POST)
        if form.is_valid():
            new_task = form.save()

            return JsonResponse({'task': model_to_dict(new_task)}, status=200)
        else:
            return redirect('task_list')
