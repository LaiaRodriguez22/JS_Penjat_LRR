/* VARIABLES GLOBALS */

let partidesJugades=0;
let partidesGuanyades=0;
let partidesGuanyadesPerc=0;
let partidesPerdudes=0;
let partidesPerdudesPerc=0;

function inputUser(){
    let inputUser;
    
    while (true) {
        inputUser = Math.floor(prompt("Entra un número: [1, 2, 3].", "Exemple: 3"));

        if (inputUser === 1) {
            // CRIDEM FUNCIO JOC
            jocInit();
            console.log("aqui el joc");
            break; 
        } else if (inputUser === 2) {
            // CRIDEM FUNCIO ESTADISTICA
            dadesEstadistiques();
            console.log("estadistiques");
            break;
        } else if (inputUser === 3) {
            // EXIT
            console.log("exit");
            break; 
        } else {
            // TORNEM A PREGUNTAR
            console.log("Ep, t'he dit que entris 1, 2 o 3.");
        }
    }
}

/* APARTAT JOC */

function jocInit(){
    console.log(" start game");
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

