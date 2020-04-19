# Django Reporter Pro

### Setup in your django project:

1. Clone into django_reporter folder of you project's root directory
2. Add reporter.pth file in your python environment's site-package folder where content will be
	```bash
	import sys;sys.__plen = len(sys.path)
	/{path_to}/django_reporter
	import sys; new=sys.path[sys.__plen:];del sys.path[sys.__plen:];p=getattr(sys,'__egginsert',0);sys.path[p:p]=new;sys.__egginsert = p+len(new);
	```
3. Add in settings settings.py
	```python
	WEBPACK_LOADER = {
	    ...
	    'DJANGO_REPORT_PRO': {
	        'CACHE': not DEBUG,
	        'BUNDLE_DIR_NAME': '/bundles/',  # must end with slash
	        'STATS_FILE': os.path.join(os.path.join(BASE_DIR, 'django_reporter'),
	                                   'django_report_vue', 'webpack-application-stats.json'),
	    },
	    ...
	}
	```
4. Include urls of reporter library in your project urls.py
url(r'^', include('django_reporter_pro.urls')),
5. These are the URLS:
	```
	/django-reporter/#/build-report/create/ - to create report
	/django-reporter/#/build-report/update/{pk}/ - to update report
	/django-reporter/#/build-report/view/{pk}/ - to view the report output
	```
6. Use following decorator over a model to make it available for reporter: `enable_for_reporter`
7. Here `django_reporter/django_report_vue` is a standalone VueJS project:
 
	a. Go to `django_reporter/django_report_vue` and run `npm install` and `npm run serve` 
	
	b. This will update a `webpack-application-stats.json` file for your django project's webpack.