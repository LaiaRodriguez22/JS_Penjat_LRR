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
//FALTAR FER QUE SIGUI TOT LOWERCASE. 
function jocInit(){

    //CONTADORS I RESET VARIABLES. 
    partidesJugades++;
    intentsFallits = 0;
    lletresFallides = [];

    // PARAULA QUE ENTRA ADMIN
    paraulaSecreta = prompt("Entra LA paraula").toUpperCase();

    // PARAULA TALLADA
    let paraulaActual = Array(paraulaSecreta.length).fill("_");

    while (true) {
        
        // PARAULA ACTUAL
        mostraParaulaActual(paraulaActual);

        // DEMANA LLETRA
        let lletra = demanaLletra().toUpperCase();

        // COMPROVA LLETRA
        let correcta = lletraCorrecta(paraulaSecreta, lletra);

        // TORNA A IMPRIMIR PARAULA ACTUAL
        if (correcta) {
            actualitzaParaulaActual(paraulaActual, lletra);
        } else {
            lletresFallides.push(lletra);
        }

        // LLETRES FALLADES
        mostraLletresFallides(lletresFallides);

        // HA ACABAT O NO?
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
    if (paraulaActual.join("") !== paraulaSecreta && intentsFallits >= 6) {
        partidesPerdudes++;
    }else if(paraulaActual.join("") === paraulaSecreta){
        partidesGuanyades++;
    }

    return paraulaActual.join("") === paraulaSecreta || intentsFallits >= 6;
}

/* APARTAT INTERFICIE GR + JUGABILITAT */

function novaPartida(){
    //CONTADORS I RESET VARIABLES. 
    partidesJugades++;
    intentsFallits = 0;
    lletresFallides = [];
 
    // PARAULA QUE ENTRA ADMIN
    paraulaSecreta = prompt("Entra LA paraula");

    // PARAULA TALLADA
    let paraulaActual = Array(paraulaSecreta.length).fill("_");

    //AFEGIM LA PARAULA ACTUAL
    document.getElementById("jocPenjat").innerHTML = paraulaActual.join(" ");

    //AFEGIM L'ABECEDARI DINAMIC
    abecadariDinamic();

    //AFEGIM PENJAT DINAMIC. 
    canviaImatgePenjat(intentsFallits);
}

function clickLletra(lletra){ //AIXO NO FUNKA.

    //SI LA LLETRA JA HA ESTAT INTRODUIDA, NO FEU  res
    if (lletresFallides.includes(lletra)) {
        return;
    }
    
    //SI LA LLETRA ESTÀ PRESENT A LA PARAULA SECRETA, ACTUALITZA LA PARAULA ACTUAL
    for (let i = 0; i < paraulaSecreta.length; i++) {
        if (paraulaSecreta[i] === lletra) {
            paraulaActual[i] = lletra;
        }
    }
    
    //REESCRIVEM LA PARAULA ACTUAL AL HTML
    document.getElementById("jocPenjat").innerHTML = paraulaActual.join(" ");
}

function abecadariDinamic(){
    const lletres = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

    const abecedari = lletres.map((lletra) => {
        return `<button onclick="clickLletra('${lletra}')">${lletra}</button>`;
    });

    document.getElementById("abecedari").innerHTML = abecedari.join("");
}

function canviaImatgePenjat(intentsFallits) {
    const imatgesPenjat = ["penjat_0", "penjat_1", "penjat_2", "penjat_3", "penjat_4", "penjat_5", "penjat_6"];
    const rutaHtml = window.location.href;
    const rutaImatge = rutaHtml.substring(0, rutaHtml.lastIndexOf("/")) + "/penjat_" + intentsFallits + ".png";
    document.getElementById("imatgePenjat").src = rutaImatge;
}

function mostrarEstadistica() {
    //localStorage.
}

function acabatGrafic() {

}

/* APARTAT ESTADISTICA --- NO GRAFIC */

function dadesEstadistiques(){
    console.log("Estadístiques del joc");
    console.log("Partides jugades: " + partidesJugades);

    if (partidesJugades > 0) {
        partidesGuanyadesPerc = (partidesGuanyades / partidesJugades) * 100;
        partidesPerdudesPerc = (partidesPerdudes / partidesJugades) * 100;

        console.log("Partides guanyades: (" + partidesGuanyadesPerc + "%) "+  partidesGuanyades);
        console.log("Partides perdudes: (" + partidesPerdudesPerc + "%) " + partidesPerdudes);
    } else {
        console.log("No hi ha estadístiques disponibles.");
    }

    //Mantenim el bucle perque salti el menú 
    inputUser();
}

/* APARTAT EXIT GAME */

function exitGame(){
    console.log("Exit game");
}

