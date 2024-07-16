from django.urls import include, path
from .views import CurriculumAPIView, CurriculumMixinsView, CurriculumViewSet, ExperienceViewset, FormationViewset, HobbyViewSet, InfoViewset, LanguageViewset, SkillViewset

from rest_framework.routers import SimpleRouter

router = SimpleRouter()  # Utilisez 'router' au lieu de 'routers' pour éviter la confusion

router.register('curriculum', CurriculumViewSet, basename='curriculum')
router.register('info', InfoViewset, basename='info')
router.register('hobby', HobbyViewSet, basename='hobby')


router.register('formations', FormationViewset, basename='formations')
router.register('experiences', ExperienceViewset, basename='experiences')
router.register('skills', SkillViewset, basename='skills')
router.register('languages', LanguageViewset, basename='languages')

urlpatterns = [
    # path('list/', CurriculumMixinsView.as_view()),
    # path('list/<int:pk>/', CurriculumMixinsView.as_view()),
    path('list/<int:pk>/update/', CurriculumMixinsView.as_view()),
    path('list/<int:pk>/delete/', CurriculumMixinsView.as_view()),
    path('list/create/', CurriculumMixinsView.as_view()),
    
    path('curriculum/', include(router.urls)),
    path('info/', include(router.urls)),
    path('curriculum/hobby/', include(router.urls)),
    path('formations/', include(router.urls)),
    path('experiences/', include(router.urls)),
    path('skills/', include(router.urls)),
    path('languages/', include(router.urls)),
    
]

urlpatterns += router.urls  