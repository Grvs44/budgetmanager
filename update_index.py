'''Update the build index.html file with the correct resource paths'''
import json

with open('budgetmanagerpwa/build/manifest.json', encoding='utf8') as f:
    manifest: dict = json.load(f)

with open('budgetmanager/templates/budgetmanager/index.html', encoding='utf8') as f:
    contents = f.read()
contents = contents.replace(
    '/budgetmanager/favicon.ico', "{% static '/budgetmanager/img/favicon.ico'}")
old_js_file: str = manifest.get('index.html', {}).get('file', '')
new_js_file: str = "{% static 'budgetmanager/js/" + \
    old_js_file[old_js_file.find('/')+1:] + "' %}"
contents = contents.replace('/budgetmanager/' + old_js_file, new_js_file)
with open('budgetmanager/templates/budgetmanager/index.html', 'w', encoding='utf8') as f:
    f.write(contents)
