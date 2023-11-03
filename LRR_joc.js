/* VARIABLES GLOBALS */

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

}

/* APARTAT ESTADISTICA */

function dadesEstadistiques(){

}

/* APARTAT EXIT GAME */

function exitGame(){
    console.log("Trukutru end game");
}

