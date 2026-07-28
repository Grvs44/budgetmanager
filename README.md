# Budget Manager

A web app for keeping track of budgets, payees, and payments.

This repository contains the server-side Django app, which manages the database and provides the REST API.
To get the front-end React app please see [budgetmanagerpwa](https://github.com/Grvs44/budgetmanagerpwa).

## Setup

To install, run `pip install budgetmanager`

Create a new Django project (or use an existing project) and update the files below.

- `urls.py`:

  ```Python
  from django.urls import include, path
  urlpatterns = [
    path('budgetmanager/api/', include('budgetmanager.urls')),
    ...
  ]
  ```

- `settings.py`:

  ```Python
  INSTALLED_APPS = [
    'budgetmanager',
    'rest_framework',
    'django_filters',
    ...
  ]
  ```

  - To disable the browsable API:
    ```Python
    REST_FRAMEWORK = {
      'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
      )
    }
    ```

- Add URLs for the auth app if not there already:
  - Add to imports in `urls.py`:
    ```Python
    from django.contrib.auth.views import logout_then_login
    from django.views.generic import RedirectView
    ```
  - Add to `urlpatterns`:
    ```Python
    path('accounts/logout/?next=<str:login_url>', logout_then_login, name='logout'),
    path('accounts/profile/', RedirectView.as_view(url='/budgetmanager/')),
    path('accounts/', include('django.contrib.auth.urls')),
    ```
