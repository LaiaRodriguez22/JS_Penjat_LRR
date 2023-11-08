/* VARIABLES GLOBALS */

let partidesJugades = 0;
let partidesGuanyades = 0;
let partidesGuanyadesPerc = 0;
let partidesPerdudes = 0;
let partidesPerdudesPerc = 0;

let paraulaSecreta;
let intentsFallits;
let lletresFallides;

function inputUser(){
    let inputUser;
    
    while (true) {
        inputUser = Math.floor(prompt("Entra un número: [1, 2, 3].", "Exemple: 3"));

        if (inputUser === 1) {
            // CRIDEM FUNCIO JOC
            jocInit();
            break; 
        } else if (inputUser === 2) {
            // CRIDEM FUNCIO ESTADISTICA
            dadesEstadistiques();
            break;
        } else if (inputUser === 3) {
            // EXIT
            exitGame();
            break; 
        } else {
            // TORNEM A PREGUNTAR
            console.log("Ep, t'he dit que entris 1, 2 o 3.");
        }
    }
}

/* APARTAT JOC */

function jocInit(){

    //CONTADORS I RESET VARIABLES. 
    partidesJugades++;
    intentsFallits = 0;
    lletresFallides = [];

    // PARAULA QUE ENTRA ADMIN
    paraulaSecreta = prompt("Entra LA paraula");

    // PARAULA TALLADA
    let paraulaActual = Array(paraulaSecreta.length).fill("_");

    while (true) {
        
        // Mostrem l'estat actual del joc
        mostraParaulaActual(paraulaActual);

        // Demanem una lletra al jugador
        let lletra = demanaLletra();

        // Comprovem si la lletra és correcta
        let correcta = lletraCorrecta(paraulaSecreta, lletra);

        // Actualitzem l'estat del joc
        if (correcta) {
            actualitzaParaulaActual(paraulaActual, lletra);
        } else {
            lletresFallides.push(lletra);
        }

        // Mostrem les lletres fallides
        mostraLletresFallides(lletresFallides);

        // Comprovem si el joc ha acabat
        if (acabat(paraulaActual, intentsFallits)) {
            break;
        }
    }
}

function mostraParaulaActual(paraulaActual) {
    console.log("Paraula actual:", paraulaActual.join(" "));
}

function demanaLletra() {
    let lletra = prompt("Entra una lletra:");
    while (lletra.length !== 1 || !lletra.match(/[a-zA-Z]/)) {
        lletra = prompt("La lletra ha de tenir una lletra.");
    }
    return lletra;
}

function lletraCorrecta(paraulaSecreta, lletra) {
    let correcta = paraulaSecreta.includes(lletra);
    if (!correcta) {
        intentsFallits++;
    }
    return correcta;
}

function actualitzaParaulaActual(paraulaActual, lletra) {
    for (let i = 0; i < paraulaSecreta.length; i++) {
        if (paraulaSecreta[i] === lletra) {
            paraulaActual[i] = lletra;
        }
    }
}

function mostraLletresFallides(lletresFallides) {
    console.log("Lletres fallades:", lletresFallides.join(", "));
    console.log("Intents: " + intentsFallits + "/6");
}

function acabat(paraulaActual, intentsFallits) {
    return paraulaActual.join("") === paraulaSecreta || intentsFallits >= 6;
}

/* APARTAT ESTADISTICA */

function dadesEstadistiques(){
    console.log("Total de partides jugades: " + partidesJugades);
    console.log("Partides guanyades (%" + partidesGuanyadesPerc + "): " + partidesGuanyades);
    console.log("Partides perdudes (%" + partidesPerdudesPerc + "): " + partidesPerdudes);
}

/* APARTAT EXIT GAME */

function exitGame(){
    console.log("Exit game");
}

