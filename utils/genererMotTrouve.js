"use strict";

/**
 * Petit script qui permet de remplir rapidement (mais manuellement) la liste des fichiers à trouver.
 */
var fs = require("fs");
var readlineSync = require("readline-sync");

function start() {
  let motsGardes = [];
  fs.readFile("data/mots.txt", "UTF8", function (erreur, contenu) {
    //console.log(erreur);
    var dictionnaire = contenu.split("\n");
    const motsGardes = [
      ...new Set(
        dictionnaire
          .map((mot) => {
            var motTrouve = false;
            let motAnalyse = mot
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .replace(/,/g, "");
            if (
              motAnalyse.length &&
              !(motAnalyse[0] === motAnalyse[0].toUpperCase()) &&
              motAnalyse.length >= 6 &&
              motAnalyse.length <= 9 &&
              !motAnalyse.includes("!") &&
              !motAnalyse.includes(" ") &&
              !motAnalyse.includes("-") &&
              !motAnalyse.includes("'") &&
              !mot.toUpperCase().startsWith("K") &&
              !mot.toUpperCase().startsWith("Q") &&
              !mot.toUpperCase().startsWith("W") &&
              !mot.toUpperCase().startsWith("X") &&
              !mot.toUpperCase().startsWith("Y") &&
              !mot.toUpperCase().startsWith("Z")
            ) {
              return motAnalyse;
            }
          })
          .filter((mot) => mot)
      ),
    ];

    // let reponse = readlineSync.question(
    //   "On garde ? [O]ui ou [N]on (ou [STOP])\n"
    // );
    // if (reponse.toLowerCase() === "stop") break;
    // let isGarde = true; //reponse.toLowerCase() === "o";
    // if (isGarde)
    console.log(motsGardes);
    fs.appendFile(
      "data/motsATrouve.txt",
      motsGardes.join("\n") + "\n",
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //file written successfully
      }
    );
  });
}

start();
