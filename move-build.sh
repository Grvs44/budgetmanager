# Delete existing files
rm -f -r budgetmanager/static

# Move js files
mkdir -p budgetmanager/static/budgetmanager/js
mv budgetmanagerpwa/build/static/*.js budgetmanager/static/budgetmanager/js

# Move img files
mkdir -p budgetmanager/static/budgetmanager/img
mv budgetmanagerpwa/build/*.ico budgetmanager/static/budgetmanager/img/
mv budgetmanagerpwa/build/*.png budgetmanager/static/budgetmanager/img/

# Move service worker and index.html
mkdir -p budgetmanager/templates/budgetmanager
mv budgetmanagerpwa/build/service-worker.js budgetmanager/templates/budgetmanager/
mv budgetmanagerpwa/build/index.html budgetmanager/templates/budgetmanager/
