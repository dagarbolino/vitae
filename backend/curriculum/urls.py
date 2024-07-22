from django.urls import include, path
from .views import  CurriculumCreateViewSet, CurriculumViewSet, ExperienceViewset, FormationViewset, HobbyViewSet, InfoViewset, LanguageViewset, SkillViewset

from rest_framework.routers import SimpleRouter

router = SimpleRouter()  

router.register('curriculum', CurriculumViewSet, basename='curriculum')
router.register('info', InfoViewset, basename='info')
router.register('hobby', HobbyViewSet, basename='hobby')
router.register('formations', FormationViewset, basename='formations')
router.register('experiences', ExperienceViewset, basename='experiences')
router.register('skills', SkillViewset, basename='skills')
router.register('languages', LanguageViewset, basename='languages')

router.register('curriculum_create', CurriculumCreateViewSet, basename='curriculum_create')


urlpatterns = [

    
    path('curriculum/', include(router.urls)),
    path('info/', include(router.urls)),
    path('curriculum/hobby/', include(router.urls)),
    path('formations/', include(router.urls)),
    path('experiences/', include(router.urls)),
    path('skills/', include(router.urls)),
    path('languages/', include(router.urls)),
    
    
    path('curriculum_create/', include(router.urls)),

]

urlpatterns += router.urls  