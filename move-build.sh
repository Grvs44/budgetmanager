if [ -d budgetmanager/static/budgetmanager ]; then
  rm budgetmanager/static/budgetmanager/*
  echo a
else
  mkdir budgetmanager/static
  mkdir budgetmanager/static/budgetmanager
  echo b
fi
if [ -d budgetmanager/templates/budgetmanager ]; then
  rmdir budgetmanager/templates/budgetmanager/*
  echo c
else
  mkdir budgetmanager/templates
  mkdir budgetmanager/templates/budgetmanager
  echo d
fi
mv budgetmanagerpwa/build/static budgetmanager/static/budgetmanager
mv budgetmanagerpwa/build/* budgetmanager/templates/budgetmanager/
