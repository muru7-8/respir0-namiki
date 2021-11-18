
// Programado por Nic Motta
// 2021
// MURU7.8

// Configuracion navegacion nodos
let nuevoX;
let nuevoY;
let boxSize = 30;
let xOffset = 0.0;
let yOffset = 0.0;
let apretado = false;

// Configuracion texto de nodos
let xTexto = 130;
let yTexto = 40;
let tamañoTexto = 150;

// Texto inicial - pregunta
let textoInicial = "Ella nos acaricia, nos conecta y nos mantiene vivxs.";

// Footer
let footer = "MURU 7.8 | Respir0 Namiki | v 1.0 | 2021";

let valorMin = 400;
let valorMax = 1000;

let tMin = 250;
let tMax = 500;
let tFondo;
let tEstado = false;

let rNicMotta, rClaudiaValente, rLeandroBarbeito, rLupitaChavez, rLaHabana, rMuruFusion;


// Definir cada objeto con su informacion correspondiente, posicion en X, Y, offset, texto, color, etc
var nicMotta = {
              nombre:"Nic Motta", 
              ciudad:"San Fernando", 
              provincia:"Buenos Aires", 
              pais:"Argentina",
              coordenadas: "",
              valorCo2: 1124,
              texto: "",
              posicionX: -200,
              posicionY: -300,
              valorMap: 0,
              };

var claudiaValente = {
                nombre:"Claudia Valente", 
                ciudad:"Jose C. Paz", 
                provincia:"Buenos Aires", 
                pais:"Argentina",
                coordenadas: "",
                valorCo2: 480,
                posicionX: -1000,
                posicionY: 200,
                };

var leandroBarbeito = {
                nombre:"Leandro Barbeito", 
                ciudad:"Lomas del Mirador", 
                provincia:"Buenos Aires", 
                pais:"Argentina",
                coordenadas: "",
                valorCo2: 665,
                posicionX: 300,
                posicionY: 600,
                };

var lupitaChavez = {
                nombre:"Lupita Chavez", 
                ciudad:"Tepic", 
                provincia:"Nayarit", 
                pais:"Mexico",
                coordenadas: "",
                valorCo2: 1200,
                texto: "",
                posicionX: -1000,
                posicionY: -1000,
                };


var bienalHabana = {
                  nombre:"Bienal de La Habana", 
                  ciudad:"", 
                  provincia:"La Habana", 
                  pais:"Cuba",
                  coordenadas: "",
                  valorCo2: 567,
                  texto: "",
                  posicionX: -500,
                  posicionY: -1500,
                  };

var muruFusion = {
                  nombre:"MURU 7.8 - Fusion", 
                  ciudad:"Ciudad de Buenos Aires", 
                  provincia:"Buenos Aires", 
                  pais:"Argentina",
                  coordenadas: "",
                  valorCo2: "",
                  texto: "",
                  posicionX: 500,
                  posicionY: 100,
                  };
                  

let fondoSemilla;
let menuUno, menuDos, menuTres, menuCuatro, menuCinco, menuSeis, menuSiete, menuOcho;
function preload() {
 fondoSemilla = loadImage("./assets/fondoSemilla.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  nuevoX = width / 2.0;
  nuevoY = height / 2.0;
  rectMode(CENTER);
  strokeWeight(1);
  textLeading(18); // Espacio entre lineas de texto
  textFont("MuseoModerno");
  imageMode(CENTER);
  
  textAlign(CENTER);
 
  // Modelos de cada persona
  nicMottaModel = createSprite(100, 100);
  nicMottaModel.addAnimation('normal', 'assets/modeloAchira.gif');
  nicMottaModel.scale = 0.2;
  nicMottaModel.mouseActive = true;

  claudiaValenteModel = createSprite(100, 100);
  claudiaValenteModel.addAnimation('normal', 'assets/modeloAchira.gif');
  claudiaValenteModel.scale = 0.2;
  claudiaValenteModel.mouseActive = true;

  // Modelos de cada persona
  lupitaChavezModel = createSprite(100, 100);
  lupitaChavezModel.addAnimation('normal', 'assets/modeloAchira.gif');
  lupitaChavezModel.scale = 0.2;
  lupitaChavezModel.mouseActive = true;

  // Modelos de cada persona
  leandroBarbeitoModel = createSprite(100, 100);
  leandroBarbeitoModel.addAnimation('normal', 'assets/modeloAchira.gif');
  leandroBarbeitoModel.scale = 0.2;
  leandroBarbeitoModel.mouseActive = true;

  // Modelos de cada persona
  bienalHabanaModel = createSprite(100, 100);
  bienalHabanaModel.addAnimation('normal', 'assets/modeloAchira.gif');
  bienalHabanaModel.scale = 0.2;
  bienalHabanaModel.mouseActive = true;

  // Modelos de cada persona
  muruFusionModel = createSprite(100, 100);
  muruFusionModel.addAnimation('normal', 'assets/modeloAchira.gif');
  muruFusionModel.scale = 0.2;
  muruFusionModel.mouseActive = true;


    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyB72EJgyU1K8SAuNPgRtoaOJywraSFNByY",
      authDomain: "respir0-namiki.firebaseapp.com",
      databaseURL: "https://respir0-namiki-default-rtdb.firebaseio.com",
      projectId: "respir0-namiki",
      storageBucket: "",
      messagingSenderId: ""
  }
    firebase.initializeApp(config); 
    database = firebase.database();
    
    var ref = database.ref('usuarios');
    ref.on('value', gotData, errData);

  // 

  tFondo = tMin;

  // RANDOMS UTILES

  rClaudiaValente = random(-150, 150);
  rNicMotta = random(-150, 150);
  rLeandroBarbeito = random(-150, 150);
  rLupitaChavez = random(-150, 150);
  rLaHabana = random(-150, 150);
  rMuruFusion = random(-150, 150);


  setInterval(tModelo, 100);

  
  }
  
  function gotData (data) {
      //console.log(data.val());
    var usuarios = data.val();
      var keys = Object.keys(usuarios);
      //console.log(keys);
    
    for (var i = 0; i < keys.length; i++) {
      var nombres = keys[i];
        var co2 = usuarios[nombres].nombre;
        //console.log(nombres + " / " + co2);	
          
      }
    //console.log(usuarios[keys[1]]);
    muruFusion.valorCo2 = usuarios[keys[1]];
    //console.log(nicMotta.valorCo2);
  }
  
  function errData(err) {
    console.log('Error!');
      console.log(err);
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }


function draw() {
    background(0);
    
    

    noFill();
    noStroke();


    // TAMAÑO MODELOS


    // FONDOS MODELOS
    image(fondoSemilla, nicMotta.posicionX + nuevoX, nicMotta.posicionY + nuevoY, tFondo + rNicMotta, tFondo + rNicMotta);
    image(fondoSemilla, claudiaValente.posicionX + nuevoX, claudiaValente.posicionY + nuevoY, tFondo + rClaudiaValente, tFondo + rClaudiaValente);
    image(fondoSemilla, leandroBarbeito.posicionX + nuevoX, leandroBarbeito.posicionY + nuevoY, tFondo + rLeandroBarbeito, tFondo + rLeandroBarbeito);
    image(fondoSemilla, lupitaChavez.posicionX + nuevoX, lupitaChavez.posicionY + nuevoY, tFondo + rLupitaChavez, tFondo + rLupitaChavez);
    image(fondoSemilla, bienalHabana.posicionX + nuevoX, bienalHabana.posicionY + nuevoY, tFondo + rLaHabana, tFondo + rLaHabana);
    image(fondoSemilla, muruFusion.posicionX + nuevoX, muruFusion.posicionY + nuevoY, tFondo + rMuruFusion, tFondo + rMuruFusion);
    
    // CIRCULOS SEMAFOROS
    ellipse(nicMotta.posicionX + nuevoX, nicMotta.posicionY + nuevoY, 500);
    ellipse(claudiaValente.posicionX + nuevoX, claudiaValente.posicionY + nuevoY, 500);
    ellipse(leandroBarbeito.posicionX + nuevoX, leandroBarbeito.posicionY + nuevoY, 500);
    ellipse(lupitaChavez.posicionX + nuevoX, lupitaChavez.posicionY + nuevoY, 500);
    ellipse(bienalHabana.posicionX + nuevoX, bienalHabana.posicionY + nuevoY, 500);
    ellipse(muruFusion.posicionX + nuevoX, muruFusion.posicionY + nuevoY, 500);


    // LINEAS CONECTORAS
    stroke(120, 100);
    line(nicMotta.posicionX + nuevoX, nicMotta.posicionY + nuevoY, nuevoX, nuevoY);
    line(claudiaValente.posicionX + nuevoX, claudiaValente.posicionY + nuevoY, nuevoX, nuevoY);
    line(leandroBarbeito.posicionX + nuevoX, leandroBarbeito.posicionY + nuevoY, nuevoX, nuevoY);
    line(lupitaChavez.posicionX + nuevoX, lupitaChavez.posicionY + nuevoY, nuevoX, nuevoY);
    line(bienalHabana.posicionX + nuevoX, bienalHabana.posicionY + nuevoY, nuevoX, nuevoY);
    line(muruFusion.posicionX + nuevoX, muruFusion.posicionY + nuevoY, nuevoX, nuevoY);
    fill(120);
    ellipse(nuevoX, nuevoY, 20);
    noFill();
    noStroke();


    // Centro de espacio virtual - pregunta
    text(textoInicial, nuevoX, nuevoY, tamañoTexto, tamañoTexto);
  

    // Colores semaforo para CO2
    nicMotta.valorMap = map(nicMotta.valorCo2, valorMin, valorMax, 0, 255);
    fill(nicMotta.valorMap, 120, 0, 100);
    ellipse(nicMotta.posicionX + nuevoX, nicMotta.posicionY + nuevoY, 100);

    claudiaValente.valorMap = map(claudiaValente.valorCo2, valorMin, valorMax, 0, 255);
    fill(claudiaValente.valorMap, 120, 0, 100);
    ellipse(claudiaValente.posicionX + nuevoX, claudiaValente.posicionY + nuevoY, 100);

    leandroBarbeito.valorMap = map(leandroBarbeito.valorCo2, valorMin, valorMax, 0, 255);
    fill(leandroBarbeito.valorMap, 120, 0, 100);
    ellipse(leandroBarbeito.posicionX + nuevoX, leandroBarbeito.posicionY + nuevoY, 100);

    lupitaChavez.valorMap = map(lupitaChavez.valorCo2, valorMin, valorMax, 0, 255);
    fill(lupitaChavez.valorMap, 120, 0, 100);
    ellipse(lupitaChavez.posicionX + nuevoX, lupitaChavez.posicionY + nuevoY, 100);

    bienalHabana.valorMap = map(bienalHabana.valorCo2, valorMin, valorMax, 0, 255);
    fill(bienalHabana.valorMap, 120, 0, 100);
    ellipse(bienalHabana.posicionX + nuevoX, bienalHabana.posicionY + nuevoY, 100);

    muruFusion.valorMap = map(muruFusion.valorCo2, valorMin, valorMax, 0, 255);
    fill(muruFusion.valorMap, 120, 0, 100);
    ellipse(muruFusion.posicionX + nuevoX, muruFusion.posicionY + nuevoY, 100);


    // Color de los textos
    fill(200);

    // Footer informacion MURU 7.8
    textStyle(NORMAL);
    textSize(12);
    text(footer, windowWidth / 2, windowHeight - 10);


    // Centro de espacio virtual - pregunta
    textStyle(BOLD);
    textSize(18)
    text(textoInicial, nuevoX, nuevoY, tamañoTexto + 180, tamañoTexto)


        /// MEDIDOR CO2
        let alfa = 200;
        fill(200, alfa);
        text("CO2", windowWidth * 0.90, windowHeight * 0.19);
    
        fill(200, 0, 0, alfa);
        rect(windowWidth * 0.9, windowHeight * 0.36, 3, 400/3);
        text("10000 ppm", windowWidth * 0.90, windowHeight * 0.23);
    
        fill(255, 200, 0, alfa)
        rect(windowWidth * 0.9, windowHeight * 0.505, 3, 400/3);
    
        fill(100, 150, 0, alfa)
        rect(windowWidth * 0.9, windowHeight * 0.65, 3, 400/3);
        text("400 ppm", windowWidth * 0.9, windowHeight * 0.8);
    
        ///


    // Nodos dibujados
    textStyle(NORMAL)
    textSize(15)

    text(nicMotta.nombre + "\n" + nicMotta.ciudad + "\n" + nicMotta.provincia + "\n" + nicMotta.pais + "\n" + "Valor Co2: " + nicMotta.valorCo2,
         nicMotta.posicionX + nuevoX + xTexto, nicMotta.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    text(claudiaValente.nombre + "\n" + claudiaValente.ciudad + "\n" + claudiaValente.provincia + "\n" + claudiaValente.pais + "\n" + "Valor Co2: " + claudiaValente.valorCo2,
         claudiaValente.posicionX + nuevoX + xTexto, claudiaValente.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    text(lupitaChavez.nombre + "\n" + lupitaChavez.ciudad + "\n" + lupitaChavez.provincia + "\n" + lupitaChavez.pais + "\n" + "Valor Co2: " + lupitaChavez.valorCo2,
         lupitaChavez.posicionX + nuevoX + xTexto, lupitaChavez.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    text(leandroBarbeito.nombre + "\n" + leandroBarbeito.ciudad + "\n" + leandroBarbeito.provincia + "\n" + leandroBarbeito.pais + "\n" + "Valor Co2: " + leandroBarbeito.valorCo2,
         leandroBarbeito.posicionX + nuevoX + xTexto, leandroBarbeito.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    text(bienalHabana.nombre + "\n" + bienalHabana.ciudad + "\n" + bienalHabana.provincia + "\n" + bienalHabana.pais + "\n" + "Valor Co2: " + bienalHabana.valorCo2,
         bienalHabana.posicionX + nuevoX + xTexto, bienalHabana.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    text(muruFusion.nombre + "\n" + muruFusion.ciudad + "\n" + muruFusion.provincia + "\n" + muruFusion.pais + "\n" + "Valor Co2: " + muruFusion.valorCo2,
         muruFusion.posicionX + nuevoX + xTexto, muruFusion.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    nicMottaModel.position.x = nicMotta.posicionX + nuevoX;
    nicMottaModel.position.y = nicMotta.posicionY + nuevoY;

    if(nicMottaModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    claudiaValenteModel.position.x = claudiaValente.posicionX + nuevoX;
    claudiaValenteModel.position.y = claudiaValente.posicionY + nuevoY;

    if(claudiaValenteModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    leandroBarbeitoModel.position.x = leandroBarbeito.posicionX + nuevoX;
    leandroBarbeitoModel.position.y = leandroBarbeito.posicionY + nuevoY;

    if(leandroBarbeitoModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    lupitaChavezModel.position.x = lupitaChavez.posicionX + nuevoX;
    lupitaChavezModel.position.y = lupitaChavez.posicionY + nuevoY;

    if(lupitaChavezModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    bienalHabanaModel.position.x = bienalHabana.posicionX + nuevoX;
    bienalHabanaModel.position.y = bienalHabana.posicionY + nuevoY;

    if(bienalHabanaModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    muruFusionModel.position.x = muruFusion.posicionX + nuevoX;
    muruFusionModel.position.y = muruFusion.posicionY + nuevoY;

    if(muruFusionModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    drawSprites();
   
    

    

}

function mousePressed() {
    apretado = true;
    xOffset = mouseX - nuevoX;
    yOffset = mouseY - nuevoY;
    cursor(MOVE);

    
}


function mouseDragged() {
    if (apretado) {
     nuevoX = mouseX - xOffset;
     nuevoY = mouseY - yOffset;
    }
}

function mouseReleased() {
  apretado = false;
  cursor(ARROW);
}

function keyPressed(){  // Reset / poner un boton para volver al centro con algun tipo de delay, mas fluido
  //resetMap()
 
}

function resetMap(){

  nuevoX = width / 2.0;
  nuevoY = height / 2.0;
}

let estadoMenu = true;
function mostrarMenu(){
  var menuRosa = document.getElementById('menuRosa');

  estadoMenu = !estadoMenu;

  if (estadoMenu == true) {
    
  }

  if (estadoMenu == false) {
    menuRosa.style.visibility = "visible";
  }
  else { menuRosa.style.visibility = "hidden"; }
   
}


function tModelo(){
  
  if (tEstado == false) {
    tFondo++;
  }
  
  if (tFondo == tMax) {
    tEstado = true;
  }

  if (tEstado == true) {
    tFondo--;
  }

  if (tFondo == tMin) {
    tEstado = false;
  }

}



	document.oncontextmenu = function(){return false}
