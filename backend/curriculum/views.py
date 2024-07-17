from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import authentication, generics, mixins, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Curriculum, Experience, Formation, Hobby, Info, Language, Skill
from .serializer import CurriculumSerializer, ExperienceSerializer, FormationSerializer, HobbySerializer, InfoSerializer, LanguageSerializer, SkillSerializer
from rest_framework import viewsets



class DetailCurriculumView(generics.RetrieveAPIView):
    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer


class ListCreateCurriculumView(generics.ListCreateAPIView):

    serializer_class = CurriculumSerializer

    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):

        title = serializer.validated_data.get('title')
        lastname = serializer.validated_data.get('lastname')
        firstname = serializer.validated_data.get('firstname') or None
        if firstname is None:
            firstname = lastname

        address = serializer.validated_data.get('address')
        city = serializer.validated_data.get('city')
        state = serializer.validated_data.get('state')
        zipcode = serializer.validated_data.get('zipcode')
        phone = serializer.validated_data.get('phone')

        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Curriculum.objects.filter(user=self.request.user)


class UpdateCurriculumView(generics.UpdateAPIView):
    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        title = serializer.validated_data.get('title')
        lastname = serializer.validated_data.get('lastname')
        firstname = serializer.validated_data.get('firstname') or None
        if firstname is None:
            firstname = lastname

        address = serializer.validated_data.get('address')
        city = serializer.validated_data.get('city')
        state = serializer.validated_data.get('state')
        zipcode = serializer.validated_data.get('zipcode')
        phone = serializer.validated_data.get('phone')
        serializer.save(firstname=firstname)


class DeleteCurriculumView(generics.DestroyAPIView):
    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer
    lookup_field = 'pk'


# -----------------------------------------------------------




class CurriculumMixinsView(
        generics.GenericAPIView,
        mixins.ListModelMixin,
        mixins.CreateModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
        mixins.RetrieveModelMixin
):
    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer
    lookup_field = 'pk'

    def _process_firstname(self, serializer):
        # Simplification de la logique pour obtenir le prénom ou, à défaut, le nom de famille
        return serializer.validated_data.get('firstname') or serializer.validated_data.get('lastname')

    def perform_create(self, serializer):
        firstname = self._process_firstname(serializer)
        
        serializer.save(firstname=firstname)

    def perform_update(self, serializer):
        firstname = self._process_firstname(serializer)
        serializer.save(firstname=firstname)

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        if pk is not None:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    
# -------------------------------------------------------------------------
    
    
    
class HobbyAPIView(APIView):
    def get(self, *args, **kwargs):
        hobbies = Hobby.objects.all()
        serializer = HobbySerializer(hobbies, many=True)
        return Response(serializer.data)
    
class CurriculumAPIView(APIView):
    def get(self, *args, **kwargs):
        curriculum = Curriculum.objects.all()
        serializer = CurriculumSerializer(curriculum, many=True)
        return Response(serializer.data)
    
    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = CurriculumSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    
class CurriculumViewSet(ReadOnlyModelViewSet):
    serializer_class = CurriculumSerializer
    
    def get_queryset(self):
        return Curriculum.objects.filter(active=True)   
    

    
class InfoViewset(ModelViewSet):
    serializer_class = InfoSerializer
    
    def get_queryset(self):
        return Info.objects.filter(active=True) 
    
    

class HobbyViewSet(ModelViewSet):
    queryset = Hobby.objects.all()
    serializer_class = HobbySerializer
    
    def get_queryset(self):
        return Hobby.objects.all()
    


class SkillViewset(ModelViewSet):
    serializer_class = SkillSerializer
    
    def get_queryset(self):
        return Skill.objects.filter(active=True)  
    
    
class LanguageViewset(ModelViewSet):
    serializer_class = LanguageSerializer
    
    def get_queryset(self):
        return Language.objects.filter(active=True)          


class FormationViewset(ModelViewSet):
    serializer_class = FormationSerializer
    
    def get_queryset(self):
        return Formation.objects.filter(active=True)  
    

class ExperienceViewset(ModelViewSet):
    serializer_class = ExperienceSerializer
    
    def get_queryset(self):
        return Experience.objects.filter(active=True)  


# -----------------------------------------------------------