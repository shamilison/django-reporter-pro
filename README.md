## Django Reporter Pro (No Stable Release YET!)

---

#### How to use in your Django project:

 * Plugins requirements:
	```bash
    django==2.2.9
    django-cors-headers==2.5.2
    django-rest-swagger==2.2.0
    djangorestframework==3.9.2
    djangorestframework-jwt==1.11.0
    django-silk==3.0.4
    urllib3==1.24.1
	```
 * Install using pip:
	```bash
	pip install django-reporter-pro
	```
 * Add `django_reporter_pro` in your `INSTALLED_APPS` of settings.py
	```python
    INSTALLED_APPS = [
         # Add Django Reporter Pro App
        'django_reporter_pro',
    ]
	```
 * Include report URLs in urls.py
	```python
    from django.conf.urls import url
    from django.urls import path, include
    urlpatterns = [
         # Include Report URL in `urlpatterns`
         # This is very important that you don't add any prefix while including url. 
         # because we don't support prefix at this moent
         url(r'^', include('django_reporter_pro.urls')),
    ]
	```
 * Execute migrate to apply report related changes
	```bash
    python manage.py migrate
	```
 * Start creating, editing and viewing reports going into: 
    * http://<domain.com>/django-reporter-pro/#/build-report/list/
 
---

#### User documentation: 

* Checkout [Wiki Page](https://github.com/shamilison/django-reporter-pro/wiki)
 
---

#### Want to contribute? Here is how to setup development environment:

 * Clone into `django_reporter` folder of you `project's root` directory
	```bash
	 git clone git@github.com:shamilison/django-reporter-pro.git <reporting_cloned_folder_name>
	```
 * Add reporter.pth file in your python environment's site-package folder where content will be
	```bash
	import sys;sys.__plen = len(sys.path)
	/{path_to_<reporting_cloned_folder_name>}/
	import sys; new=sys.path[sys.__plen:];del sys.path[sys.__plen:];p=getattr(sys,'__egginsert',0);sys.path[p:p]=new;sys.__egginsert = p+len(new);
	```
 * Add in settings settings.py
	```python
	WEBPACK_APPLICATION_STATS_PATH = os.path.join(os.path.join(BASE_DIR, '<reporting_cloned_folder_name>'), 
													'django_report_vue', 'webpack-application-stats.json')
	# WEBPACK_APPLICATION_STATS_PATH has to be path to the file of "<reporting_cloned_folder_name>/django_report_vue/webpack-application-stats.json"
	WEBPACK_LOADER = {
	    'DJANGO_REPORT_PRO': {
	        'CACHE': not DEBUG,
	        'BUNDLE_DIR_NAME': '/bundles/',  # must end with slash
	        'STATS_FILE': WEBPACK_APPLICATION_STATS_PATH,
	    },
	}
	```
 * Add apps in our installed app's list
	```bash
	# Vuejs Integration Helpers
    'webpack_loader',
    'corsheaders',
   
	# Reporter app
	'django_reporter_pro',
	```
 * Install required python packages as follows:
	```bash
	cd <reporting_cloned_folder_name>
	pip install -r packages.txt
	```
 * Include report URLs in urls.py
	```python
    from django.conf.urls import url
    from django.urls import path, include
    urlpatterns = [
         # Include Report URL in `urlpatterns`
         # This is very important that you don't add any prefix while including url. 
         # because we don't support prefix at this moent
         url(r'^', include('django_reporter_pro.urls')),
    ]
	```
 * Execute migrate to apply report related changes
	```bash
    python manage.py migrate
	```
 * Here `<reporting_cloned_folder_name>/django_report_vue` is a standalone VueJS project:
    Go to `<reporting_cloned_folder_name>/django_report_vue` and run:
	```bash
	npm install
	npm run serve
	```
	This will update a `webpack-application-stats.json` file for your django project's webpack.
 * Use following decorator over a `Django Model` to make it available for reporter: 
	```python
	enable_for_reporter
	```
 * These are the URLS to check development environment:
	```python
	/django-reporter/#/build-report/list/ # to check list of reports
	/django-reporter/#/build-report/create/ # to create report
	/django-reporter/#/build-report/update/{pk}/ # to update report
	/django-reporter/#/build-report/view/{pk}/ # to view the report output
	```
 
---

##### With any of your feedback, complain or suggestion:
 * Open issue in Github
 * Contact here: shamilsakib@gmail.com
