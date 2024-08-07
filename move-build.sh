# Delete existing files
rm -f -r budgetmanager/static/budgetmanager

# Move js files
mv budgetmanagerpwa/build/static budgetmanager/static/budgetmanager

# Move img files
mkdir -p budgetmanager/static/budgetmanager/img
mv budgetmanagerpwa/build/*.ico budgetmanager/static/budgetmanager/img/
mv budgetmanagerpwa/build/*.png budgetmanager/static/budgetmanager/img/

# Move service worker
mkdir -p budgetmanager/templates/budgetmanager
mv budgetmanagerpwa/build/service-worker.js budgetmanager/templates/budgetmanager/
