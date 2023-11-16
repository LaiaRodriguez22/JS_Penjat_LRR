/* VARIABLES GLOBALS */

let partidesJugades = 0;
let partidesGuanyades = 0;
let partidesGuanyadesPerc = 0;
let partidesPerdudes = 0;
let partidesPerdudesPerc = 0;

let paraulaSecreta;
let paraulaActual;
let lletresFallides;

let intentsFallits;

let guanyat = false;

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

/*
    ---------------------- APARTAT JOC ----------------------------- 
    EL JOC FA TOTES LES ENTRADES I DEMES EN MAYUS.  
    NO COMPROVA SI UNA LLETRA HA SIGUT ENTRADA DUES O MES VEGADES. 

    jocInit : bucle de menú
    mostraParaulaActual: mostra la paraula amb '_ _ _ _'
    demanaLletra: demana lletra al usuari i mira si va de A-Z
*/

function jocInit(){

    //CONTADORS I RESET VARIABLES. 
    partidesJugades++;
    intentsFallits = 0;
    lletresFallides = [];

    // PARAULA QUE ENTRA ADMIN
    do {
        paraulaSecreta = prompt("Entra LA paraula").toUpperCase();
    } while (paraulaSecreta.length <= 1);

    // PARAULA TALLADA
    paraulaActual = Array(paraulaSecreta.length).fill("_");

    while (true) {
        
        // PARAULA ACTUAL
        mostraParaulaActual(paraulaActual);

        // DEMANA LLETRA
        let lletra = demanaLletra().toUpperCase();

        // COMPROVA LLETRA
        let correcta = lletraCorrecte(paraulaSecreta, lletra);

        // TORNA A IMPRIMIR PARAULA ACTUAL
        if (correcta) {
            actualitzaParaulaActual(paraulaActual, lletra);
        } else {
            lletresFallides.push(lletra);
        }

        // LLETRES FALLADES
        mostraLletresFallides(lletresFallides);

        // HA ACABAT O NO
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
        lletra = prompt("La lletra ha de tenir una lletra.").toUpperCase();
    }
    return lletra;
}

function lletraCorrecte(paraulaSecreta, lletra) {
    let correcte = paraulaSecreta.includes(lletra);
    if (!correcte) {
        intentsFallits++;
    }
    return correcte;
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
    exitGame();
}

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

    inputUser();
}

function exitGame(){
    console.log("Exit game");
}

/* 
    ------------ APARTAT INTERFICIE GR + JUGABILITAT  --------------- 
    EL JOC FA TOTES LES ENTRADES I DEMES EN MAYUS.  
    AQUESTA VERSIO SI QUE COMPROVA SI UNA LLETRA HA CLICKADA MÉS DE UNA VEGADA.
    SI HO HA SIGUT, EL BOTÓ ES DESACTIVA -ES MOSTRA EN NEGRE-

    novaPartida: incia la partida quan el usuari dona click al boto. 
    abecadariDinamic: crea els botons despres de que l'usuari entri la paraula. 
    clickLletra: jugabilitat en aquesta funcio. 
    canviaImatgePenjat: canvia l'imatge segons els intents de l'usuari
    desactivarButons: desactiva els botons ja clickats o bé, quan la partida ja s'ha acabat.
    acabarGrafic: crida desactivarButons i llavors va a mostrarMissFinal amb la guanyat.
    mostraIntentsLletresF: son els missatges que veura l'usuari mentres juga. 
    mostraMissFinal: mostra els missatges finals, depenguent de la variable guanyat. 
    eliminarLocalStorage: s'encarrega de resetejar les globals si l'usuari interacciona amb el boto
    mostrarEstadistica: obre nova finestra i imprimeix les variables de partidesGuanyades i Perdudes
*/

function novaPartida(){
    //CONTADORS I RESET VARIABLES. 
    partidesJugades++;
    intentsFallits = 0;
    lletresFallides = [];
    guanyat = false;

    // PARAULA QUE ENTRA ADMIN
    do {
        paraulaSecreta = prompt("Entra LA paraula").toUpperCase();
    } while (paraulaSecreta.length <= 1);

    paraulaActual = Array(paraulaSecreta.length).fill("_");

    //AQUI NEM A RESETEJAR TAMBÉ ELS MISSATGES DE LLETRES I INTENTS -ELSE FINAL-
    mostraIntentsLletresF(intentsFallits, lletresFallides);

    //AFEGIM LA PARAULA ACTUAL
    document.getElementById("jocPenjat").innerHTML = paraulaActual.join(" ");

    //AFEGIM L'ABECEDARI DINAMIC
    abecadariDinamic();

    //AFEGIM PENJAT DINAMIC. 
    canviaImatgePenjat(intentsFallits);
}

function abecadariDinamic(){
    //BOTONS DINAMICS
    const lletres = "abcdefghijklmnñopqrstuvwxyz".toUpperCase().split("");

    const abecedari = lletres.map((lletra) => {
        return `<button class="lletraDinamica" id="${lletra}" onclick="clickLletra('${lletra}')">${lletra}</button>`;
    });

    document.getElementById("abecedari").innerHTML = abecedari.join("");
}

function clickLletra(lletra){ 
    let lletraCorrecta = false;

    //console.log("HAS FET CLICK A AQUESTA LLETRA: " + lletra);

    //console.log("PARAULA ACTUAL: " + paraulaActual);
    //console.log("PARAULA SECRETA: " + paraulaSecreta);

    if (lletresFallides.includes(lletra) || paraulaActual.includes(lletra)) {
        desactivarBotoLletra(lletra);
        return;
    }

    for (let i = 0; i < paraulaSecreta.length; i++) {
        if (paraulaSecreta[i] === lletra) {
            paraulaActual[i] = lletra;
            lletraCorrecta = true;

            //DESACTIVAR BOTO. 
            desactivarBotoLletra(lletra);
        }
    }

    //SEGUEIX IMPRIMINT LES LLETRES E INTENTS A LA FUNCIO
    mostraIntentsLletresF(intentsFallits, lletresFallides);

    if (!lletraCorrecta) {
        intentsFallits++;
        lletresFallides.push(lletra);
        //console.log("Intents fallits: " + intentsFallits);

        //SEGUEIX IMPRIMINT LES LLETRES E INTENTS A LA FUNCIO
        mostraIntentsLletresF(intentsFallits, lletresFallides);

        canviaImatgePenjat(intentsFallits);

        desactivarBotoLletra(lletra);

        if (intentsFallits >= 6) {
            guanyat=false;
            //PER EL MOSTRAR LOCAL STORAGE CORRECTE
            partidesPerdudes++;
            localStorage.setItem('partidesGuanyades', partidesGuanyades);
            localStorage.setItem('partidesPerdudes', partidesPerdudes);
            acabatGrafic(guanyat);
        }
    }

    if (!paraulaActual.includes("_")) {
        guanyat=true;
        //PER EL LOCAL STORAGE
        partidesGuanyades++;
        localStorage.setItem('partidesGuanyades', partidesGuanyades);
        localStorage.setItem('partidesPerdudes', partidesPerdudes);
        acabatGrafic(guanyat);
    }
}

function canviaImatgePenjat(intentsFallits) {
    const rutaHtml = window.location.href;
    let rutaImatge;

    //SI EL NÚMERO D'INTENTS FALLITS ÉS MAJOR QUE 6, NO ES CANVIA D'IMATGE 
    if (intentsFallits >= 6) {
        rutaImatge = rutaHtml.substring(0, rutaHtml.lastIndexOf("/")) + "/penjat_6.png";
    } else {
        rutaImatge = rutaHtml.substring(0, rutaHtml.lastIndexOf("/")) + "/penjat_" + intentsFallits + ".png";
    }

    document.getElementById("imatgePenjat").src = rutaImatge;
}

function desactivarBotoLletra(lletra){
    let botoLletra = document.getElementById(lletra);
    //console.log(botoLletra);
    if (botoLletra) {
        botoLletra.disabled = true;
    }
}

function desactivarButons() {
    //BORRA BOTONS DINAMICS A TRAVES DE LA CLASSE LLETRADINAMICA
    //AIXO ES CRIDA SI EL USER ARRIBA A ACABATGRAFIC. 
    const parentElement = document.getElementById("abecedari");
    const buttons = document.getElementsByClassName("lletraDinamica");

    while (buttons.length > 0) {
        parentElement.removeChild(buttons[0]);
    }
}

function acabatGrafic(guanyat) {
    desactivarButons();
    mostraMissFinal(guanyat);
}

function mostraIntentsLletresF(intentsFallits, lletresFallides) {
    document.getElementById("jocPenjat").innerHTML = paraulaActual.join(" ");
    document.getElementById("lletresFallides").innerHTML = "Lletres fallades: " + lletresFallides.join(", ");

    //HAIG DE FER BLOCK PERQUE SINO VE DEL GUANYAR -SI FA PARTIDA SEGUIDA- I NO ES MOSTRA.     
    document.getElementById("intentsRestants").style.display = 'block';
    document.getElementById("intentsRestants").innerHTML = "Intents: " + intentsFallits + "/6";

}

function mostraMissFinal(guanyat){
    if(guanyat){
        document.getElementById("lletresFallides").innerHTML = "HAS GUANYAT";
        document.getElementById("intentsRestants").style.display = 'none';
    }else{       
        document.getElementById("lletresFallides").innerHTML = "HAS PERDUT";
        document.getElementById("intentsRestants").style.display = 'none';
    }
}

function eliminarLocalStorage(){
    localStorage.removeItem('partidesGuanyades');
    localStorage.removeItem('partidesPerdudes');

    //RESET GLOBALS.  
    partidesGuanyades = 0;
    partidesPerdudes = 0;
}

function mostrarEstadistica() {
    // FEM GET DEL LOCAL STORAGE. 
    partidesGuanyades = localStorage.getItem('partidesGuanyades') || 0;
    partidesPerdudes = localStorage.getItem('partidesPerdudes') || 0;

    const finestraEstad = window.open('', 'Estadistiques', 'width=400,height=300');

    // CONTINGUT
    const htmlEstadistica = `
        <h2>Estadistiques</h2>
        <p>Partides jugades: ${partidesJugades}</p>
        <p>Partides guanyades: ${partidesGuanyades}</p>
        <p>Partides perdudes: ${partidesPerdudes}</p>`;

    // ARRANQUEM EL HTML
    finestraEstad.document.body.innerHTML = htmlEstadistica;
}
