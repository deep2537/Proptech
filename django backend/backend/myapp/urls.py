# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('data/',views.get_data, name='get_data'),
    path('predict/', views.predict_text, name='predict_text'),
    path('graph1/',views.serve_data, name='servebar_data'),
    path('graph2/',views.serve_data, name='servepie_data'),
    path('find_substations/',views.find_substations,name='substations_data')
]