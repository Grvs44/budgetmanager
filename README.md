# Budget Manager

## Setup

- `urls.py`:
  ```Python
  urlpatterns = [
    path('budgetmanager/', include('budgetmanager.urls')),
  ]
  ```

- `settings.py`:
  ```Python
  INSTALLED_APPS = [
    'budgetmanager',
    'rest_framework',
    'knox',
  ]
  ```
