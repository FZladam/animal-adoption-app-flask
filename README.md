# animal-adoption-app-flask

## Auteurs

- **Fatima Zahra Ladam**
- **Pierre-Olivier Fortin**

## Description

Application web permettant de consulter et de mettre en adoption des animaux de compagnie. L'application offre une interface conviviale pour parcourir les animaux disponibles, effectuer des recherches et soumettre de nouveaux animaux à l'adoption.

## Fonctionnalités

- **Page d'accueil** : Affichage aléatoire de 5 animaux disponibles
- **Consultation** : Page détaillée pour chaque animal avec informations complètes
- **Recherche** : Moteur de recherche permettant de trouver les animaux
- **Mise en adoption** : Formulaire de soumission

## Technologies utilisées

### Backend
- Python
- Flask
- SQLite

### Frontend
- HTML5
- CSS3
- JavaScript

## Structure du projet
- `index.py` : le point d'entrée de l'app, il contient les routes de l'app
- `database.py` : gère la connexion et les interactions avec la base de données
- `db/` : 
    - `animaux.db` : la base de données utilisée
    - `animaux.sql` : script pour créer la base de données
- `templates/` : toutes les pages HTML du site
- `static/` : 
    - `css/` : pour le style
    - `js/` : pour les scripts
    - `images/` : Les images utilisées dans le site  
- `makefile` : permet de lancer le projet plus rapidement avec des commandes simples

## Installation

1. Cloner ou extraire le projet dans un répertoire local

2. Installer Flask (si ce n'est pas déjà fait) :
```bash
pip install flask
```

3. S'assurer que la base de données `animaux.db` est présente dans le répertoire du projet

## Exécution

### Méthode 1 : Avec make (recommandé)
```bash
make run
```

### Méthode 2 : Directement avec Python
```bash
python3 index.py
```

### Méthode 3 : Avec Flask
```bash
export FLASK_APP=index.py
flask run
```

L'application sera accessible à l'adresse : `http://127.0.0.1:5000/`

## Licence

Copyright 2024 - Fatima Zahra Ladam et Pierre-Olivier Fortin

Licensed under the Apache License, Version 2.0
