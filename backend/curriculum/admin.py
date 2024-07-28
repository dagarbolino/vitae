from django.contrib import admin
from . models import Curriculum, Info, Hobby, Formation, Experience, Skill, Language


# Register your models here.

class CurriculumAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'updated_at', 'user']
    

class InfoAdmin(admin.ModelAdmin):
    list_display = ['id', 'lastname', 'firstname', 'type_of_contract', 'date_of_birth', 'place_of_birth', 'address', 'city', 'state', 'zipcode', 'phone', 'email', 'photo', 'motivation']
    

class HobbyAdmin(admin.ModelAdmin):
    list_display = ['title_hobby']
    
    
class FormationAdmin(admin.ModelAdmin):
    list_display = ['title_formation', 'description_formation', 'business', 'start_date_of_formation', 'end_date_of_formation', 'location_formation']
    
    
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['title_experience', 'description_experience', 'business', 'start_date_of_experience', 'end_date_of_experience', 'location_experience']  
    
    
class SkillAdmin(admin.ModelAdmin):
    list_display = ['title_skill']
    
    
class LanguageAdmin(admin.ModelAdmin):
    list_display = ['title_language', 'niveau_language']
    
    
    
    
admin.site.register(Curriculum, CurriculumAdmin)
admin.site.register(Info, InfoAdmin)
admin.site.register(Hobby, HobbyAdmin)
admin.site.register(Formation, FormationAdmin)
admin.site.register(Experience, ExperienceAdmin)
admin.site.register(Skill, SkillAdmin)
admin.site.register(Language, LanguageAdmin)
            

    



