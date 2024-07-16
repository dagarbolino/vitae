from django import forms

from .models import Curriculum, Hobby


class CurriculumForm(forms.ModelForm):
  class Meta:
    model = Curriculum
    fields = '__all__'
    



class HobbyForm(forms.ModelForm):
  class Meta:
    model = Hobby
    fields = '__all__'