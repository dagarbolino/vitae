from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import (Curriculum, Experience, Formation, Hobby, Info, Language,
                    Skill)
from .serializer import (CurriculumCretateSerializer, CurriculumSerializer,
                        ExperienceSerializer, FormationSerializer,
                        HobbySerializer, InfoSerializer, LanguageSerializer,
                        SkillSerializer)

# -------------------------------------------------------------------------



@login_required
def curriculum(request, id):
    # Récupère l'instance de l'utilisateur connecté
    user = request.user
    # Filtre les curriculums appartenant à l'utilisateur connecté
    curriculum = get_object_or_404(Curriculum, id=id)
    return render(request, 'curriculum.html', {'curriculum': curriculum})


class CurriculumViewSet(ModelViewSet):
    serializer_class = CurriculumSerializer


    def get_queryset(self):
        return Curriculum.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = CurriculumSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class CurriculumCreateViewSet(ModelViewSet):
    serializer_class = CurriculumCretateSerializer

    def get_queryset(self):
        return Curriculum.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = CurriculumCretateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class InfoViewset(ModelViewSet):
    serializer_class = InfoSerializer

    def get_queryset(self):
        return Info.objects.all()


class HobbyViewSet(ModelViewSet):
    queryset = Hobby.objects.all()
    serializer_class = HobbySerializer

    def get_queryset(self):
        return Hobby.objects.all()


class SkillViewset(ModelViewSet):
    serializer_class = SkillSerializer

    def get_queryset(self):
        return Skill.objects.all()


class LanguageViewset(ModelViewSet):
    serializer_class = LanguageSerializer

    def get_queryset(self):
        return Language.objects.all()


class FormationViewset(ModelViewSet):
    serializer_class = FormationSerializer

    def get_queryset(self):
        return Formation.objects.all()


class ExperienceViewset(ModelViewSet):
    serializer_class = ExperienceSerializer

    def get_queryset(self):
        return Experience.objects.all()


# -----------------------------------------------------------
