# Copyright 2024
# Fatima Zahra Ladam LADF17289101
# Pierre-Olivier Fortin FORP22028608
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask, request, redirect, url_for, session
import random
from flask import render_template
from flask import g
from database import Database

app = Flask(__name__, static_url_path="", static_folder="static")


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()


@app.route('/')
def accueil():
    # Page d'accueil.
    db = get_db()
    tous_animaux = db.get_animaux()

    # Sélectionner 5 animaux au hasard
    animaux_aleatoires = random.sample(tous_animaux, min(5, len(tous_animaux)))
    return render_template('accueil.html', animaux=animaux_aleatoires)


@app.route('/animal/<int:animal_id>')
def animal_details(animal_id):
    # Page de détails d'un animal.
    db = get_db()
    animal = db.get_animal(animal_id)

    if animal is None:
        return (render_template('erreur.html', message="Animal non trouvé"),
                404)

    return render_template('animal.html', animal=animal)


@app.route('/apropos')
def apropos():
    return render_template('apropos.html')


@app.route('/recherche')
def recherche():
    # Page de recherche avec résultats.
    db = get_db()
    terme = request.args.get('terme', '').strip()
    tous_animaux = db.get_animaux()

    if not terme:
        return (render_template('recherche.html', animaux=[], terme='',
                resultats=False))

    resultats = []

    for animal in tous_animaux:
        if (terme.lower() in animal['nom'].lower() or
                terme.lower() in animal['espece'].lower() or
                terme.lower() in animal['race'].lower() or
                terme.lower() in animal['ville'].lower() or
                terme.lower() in animal['description'].lower() or
                terme.lower() in animal['cp'].lower()):
            resultats.append(animal)

    if resultats is None:
        return render_template('recherche.html', animaux=tous_animaux,
                               terme='', resultats=False)
    else:
        return render_template('recherche.html', animaux=resultats,
                               terme=terme, resultats=True)


@app.route('/adoption')
def adoption():
    # Page adoption où on affiche tous les animaux.
    db = get_db()
    tous_animaux = db.get_animaux()

    return render_template('adoption.html', animaux=tous_animaux)


@app.route('/form')
def form():
    return render_template('form.html', erreurs={})


@app.route('/ajouter', methods=['POST'])
def donnees_formulaire():
    db = get_db()

    erreurs, donnees = valider_formulaire(request.form)

    if erreurs:
        return render_template('form.html', erreurs=erreurs,
                               nom=nom, espece=espece, race=race,
                               age=age, description=description,
                               courriel=courriel, adresse=adresse,
                               ville=ville, codepostal=codepostal)

    # Ajouter l'animal
    id = db.add_animal(nom, espece, race, age, description, courriel,
                       adresse, ville, codepostal)

    return redirect(url_for('animal_details', animal_id=id))


def valider_formulaire_animal(form_data):

    erreurs = {}

    nom = form_data.get('nom')
    espece = form_data.get('espece')
    race = form_data.get('race')
    age_str = form_data.get('age')
    description = form_data.get('description')
    courriel = form_data.get('courriel')
    adresse = form_data.get('adresse')
    ville = form_data.get('ville')
    codepostal = form_data.get('codepostal')

    # Validations
    if not nom or len(nom) < 3 or len(nom) > 20:
        erreurs['nom'] = \
            'Le nom doit être entre 3 et 20 caractères.'
    if not espece or len(espece) > 25:
        erreurs['espece'] = \
            'L\'espèce doit contenir moins de 25 caractères.'
    if not race or len(race) > 25:
        erreurs['race'] = \
            'La race doit contenir moins de 25 caractères.'
    try:
        age = int(age_str)
        if age < 0 or age > 30:
            erreurs['age'] = 'L\'âge doit être entre 0 et 30 ans.'
    except (ValueError, TypeError):
        erreurs['age'] = 'L\'âge doit être un nombre valide.'
        age = None
    if not description or len(description) > 500:
        erreurs['description'] = \
            'La description doit contenir moins de 500 caractères.'
    if not courriel or len(courriel) > 80:
        erreurs['courriel'] = \
            'Le courriel doit contenir moins de 80 caractères.'
    if not adresse or len(adresse) > 75:
        erreurs['adresse'] = \
            'L\'adresse doit contenir moins de 75 caractères.'
    if not ville or len(ville) > 75:
        erreurs['ville'] = \
            'La ville doit contenir moins de 75 caractères.'
    if not codepostal or len(codepostal) > 7:
        erreurs['codepostal'] = \
            'Veuillez entrer un code postal valide. (ex.: A1A 1A1)'

    donnees = {
        'nom': nom,
        'espece': espece,
        'race': race,
        'age': age,
        'description': description,
        'courriel': courriel,
        'adresse': adresse,
        'ville': ville,
        'codepostal': codepostal
    }

    return erreurs, donnees


if __name__ == "__main__":
    app.run(debug=True)
