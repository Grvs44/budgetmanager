if [ ! -d budgetmanager/static ]; then
  mkdir budgetmanager/static
elif [ -d budgetmanager/static/budgetmanager ]; then
  rm -r budgetmanager/static/budgetmanager
fi
mv budgetmanagerpwa/build/static budgetmanager/static/budgetmanager
mv budgetmanagerpwa/build/manifest.json budgetmanager/templates/budgetmanager/manifest.json
