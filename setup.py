# Created by shamilsakib at 04/05/20
import os

from setuptools import find_packages, setup

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as readme:
    README = readme.read()

# allow setup.py to be run from any path
os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

setup(
    name='django-reporter-pro',
    version='2020.1.4',
    packages=find_packages(),
    include_package_data=True,
    license='Other/Proprietary License',  # example license
    description='Django report builder pro',
    long_description=README,
    long_description_content_type='text/markdown',
    url='https://github.com/shamilison/django-reporter-pro',
    author='Shamil Sakib',
    author_email='shamilsakib@gmail.com',
    classifiers=[
        'Environment :: Web Environment',
        'Framework :: Django',
        'Framework :: Django :: 1.11',  # replace "X.Y" as appropriate
        'Intended Audience :: Developers',
        'License :: Other/Proprietary License',  # example license
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        # Replace these appropriately if you are stuck on Python 2.
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.7',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
    ],
    install_requires=[
        'djangorestframework==3.*.*',
    ]
)
