window.onload = function () {
    document.getElementById('formulaire').addEventListener('submit', soumettre);
}
//--------------------------------------------------
// Fonctions validation
//--------------------------------------------------

function validerNom() {
    const nom = document.getElementById('nom').value.trim();
    const messageValidation = document.getElementById('validation_nom');
    messageValidation.textContent = '';

    if (!nom) {
        messageValidation.textContent = 'Ce champ est obligatoire.';
        messageValidation.style.color = 'red';
        return false;
    } else if (nom.length < 3 || nom.length > 20) {
        messageValidation.textContent = 'Le nom doit être entre 3 et 20 caractères.';
        messageValidation.style.color = 'red';
        return false;
    }

    return true;
}

function validerEspece() {
    const espece = document.getElementById('espece').value.trim();
    const messageValidation = document.getElementById('validation_espece');
    messageValidation.textContent = '';

    if (!espece) {
        messageValidation.textContent = 'Ce champ est obligatoire.';
        messageValidation.style.color = 'red';
        return false;
    } else if (espece.length > 25) {
        messageValidation.textContent = 'L\'espèce doit contenir moins de 25 caractères.';
        messageValidation.style.color = 'red';
        return false;
    }

    return true;
}

function validerRace() {
    const race = document.getElementById('race').value.trim();
    const messageValidation = document.getElementById('validation_race');
    messageValidation.textContent = '';

    if (!race) {
        messageValidation.textContent = 'Ce champ est obligatoire.';
        messageValidation.style.color = 'red';
        return false;
    } else if (race.length > 25) {
        messageValidation.textContent = 'La race doit contenir moins de 25 caractères.';
        messageValidation.style.color = 'red';
        return false;
    }

    return true;
}

function validerAge() {
    const age = parseInt(document.getElementById('age').value);
    const messageValidation = document.getElementById('validation_age');
    messageValidation.textContent = '';

    if (isNaN(age)) {
        messageValidation.textContent = 'Ce champ est obligatoire.';
        messageValidation.style.color = 'red';
        return false;
    } else if (age < 0 || age > 30) {
        messageValidation.textContent = 'L\'âge doit être entre 0 et 30 ans.';
        messageValidation.style.color = 'red';
        return false;
    }

    return true;
}

function validerDescription() {
    const description = document.getElementById('description').value.trim();
    const messageValidation = document.getElementById('validation_description');
    messageValidation.textContent = '';

    if (!description) {
        messageValidation.textContent = 'Ce champ est obligatoire.';
        messageValidation.style.color = 'red';
        return false;
    } else if (description.length > 500) {
        messageValidation.textContent = 'La description doit contenir moins de 500 caractères.';
        messageValidation.style.color = 'red';
        return false;
    }

    return true;
}

function validerCourriel() {
    let courriel = document.getElementById('courriel').value.trim();
    const courrielRegex = //Regex standard RCF2822 simplifié
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const messageValidation = document.getElementById('validation_courriel');
    messageValidation.textContent = '';

    if (!courriel) {
        messageValidation.textContent = 'Ce champ est obligatoire.';
        messageValidation.style.color = 'red';
        return false;
    }

    courriel = courriel.toLowerCase();

    if (!courrielRegex.test(courriel)) {
        messageValidation.textContent = 'Veuillez entrer un courriel valide.';
        messageValidation.style.color = 'red';
        return false;
    } else if (courriel.length > 80) {
        messageValidation.textContent = 'Le courriel doit contenir moins de 80 caractères.';
        messageValidation.style.color = 'red';
        return false;
    }

    return true;
}

function validerAdresse() {
    const adresse = document.getElementById('adresse').value.trim();
    const messageValidation = document.getElementById('validation_adresse');
    messageValidation.textContent = '';

    if (!adresse) {
        messageValidation.textContent = 'Ce champ est obligatoire.';
        messageValidation.style.color = 'red';
        return false;
    } else if (adresse.length > 75) {
        messageValidation.textContent = 'L\'adresse doit contenir moins de 75 caractères.';
        messageValidation.style.color = 'red';
        return false;
    }

    return true;
}

function validerVille() {
    const ville = document.getElementById('ville').value.trim();
    const messageValidation = document.getElementById('validation_ville');
    messageValidation.textContent = '';

    if (!ville) {
        messageValidation.textContent = 'Ce champ est obligatoire.';
        messageValidation.style.color = 'red';
        return false;
    } else if (ville.length > 75) {
        messageValidation.textContent = 'La ville doit contenir moins de 75 caractères.';
        messageValidation.style.color = 'red';
        return false;
    }

    return true;
}

function validerCodePostal() {
    const codePostal = document.getElementById('codepostal').value.trim();
    const codePostalRegex = //Code postal format canadien
    /[A-Z][0-9][A-Z] [0-9][A-Z][0-9]/;
    const messageValidation = document.getElementById('validation_codepostal');
    messageValidation.textContent = '';

    if (!codePostal) {
        messageValidation.textContent = 'Ce champ est obligatoire.';
        messageValidation.style.color = 'red';
        return false;
    } else if (!codePostalRegex.test(codePostal)) {
        messageValidation.textContent = 'Veuillez entrer un code postal valide. (ex.: A1A 1A1)';
        messageValidation.style.color = 'red';
        return false;
    }

    return true;
}

function soumettre(event) {

    let nomValide = validerNom();
    let especeValide = validerEspece();
    let raceValide = validerRace();
    let ageValide = validerAge();
    let descriptionValide = validerDescription();
    let courrielValide = validerCourriel();
    let adresseValide = validerAdresse();
    let villeValide = validerVille();
    let codePostalValide = validerCodePostal();

    let toutValide = nomValide && 
                     especeValide && 
                     raceValide && 
                     ageValide && 
                     descriptionValide && 
                     courrielValide && 
                     adresseValide && 
                     villeValide && 
                     codePostalValide;

    if (!toutValide) {
        event.preventDefault();
        return;
    }
}
