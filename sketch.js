
// Programado por Nic Motta
// 2021
// MURU7.8

// TODO -> Loading de la pagina
// TODO -> Refactorizar codigo
// TODO -> Que hacer con los nodos que ya no estan activos?


// * Colores
// 400 -> 51, 153, 0
// 1000 ->  153, 204, 51
// 2000 -> 255, 204, 0
// 3000 -> 255, 153, 102
// 4000 -> 204, 51, 0
// +4000 -> 255, 0, 0

// Constantes de color
const colorFondo = 0

// Configuracion navegacion nodos
let nuevoX;
let nuevoY;
let boxSize = 30;
let xOffset = 0.0;
let yOffset = 0.0;
let apretado = false;

// Configuracion texto de nodos
let xTexto = 150;
let yTexto = 40;
let tamañoTexto = 150;

// Texto inicial - pregunta
let textoInicial = "Ella nos acaricia, nos conecta y nos mantiene con vida.";

// Footer
let textoFooter = "MURU 7.8 | Respir0 Namiki | v 2.0 | 2022";

let valorMin = 400;
let valorMax = 1000;

let tMin = 250;
let maxSize = 500;
let sizeFondo;
let estadoFondo = false;

let loading = true;

let rNicMotta, rClaudiaValente, rLeandroBarbeito, rLupitaChavez, rLaHabana, rMuruFusion, rMapa;

const datosMapa = [
  { nombre:"Nic Motta", 
    ciudad:"San Fernando", 
    provincia:"Buenos Aires", 
    pais:"Argentina",
    coordenadas: "",
    valorCo2: 1124,
    texto: "",
    posicionX: -200,
    posicionY: -300,
    valorMap: 0,
    dispositivo: 'dispositivo-1'
  },
  { nombre:"Claudia Valente", 
    ciudad:"Jose C. Paz", 
    provincia:"Buenos Aires", 
    pais:"Argentina",
    coordenadas: "",
    valorCo2: 480,
    posicionX: -1000,
    posicionY: 200,
    dispositivo: 'dispositivo-1'
  },
  { nombre:"Leandro Barbeito", 
    ciudad:"Lomas del Mirador", 
    provincia:"Buenos Aires", 
    pais:"Argentina",
    coordenadas: "",
    valorCo2: 665,
    posicionX: 300,
    posicionY: 600,
    dispositivo: 'dispositivo-1'
  },
  { nombre:"Lupita Chavez", 
    ciudad:"Tepic", 
    provincia:"Nayarit", 
    pais:"Mexico",
    coordenadas: "",
    valorCo2: 1200,
    texto: "",
    posicionX: -1000,
    posicionY: -1000,
    dispositivo: 'dispositivo-1'
  },
  { nombre:"Bienal de La Habana", 
    ciudad:"", 
    provincia:"La Habana", 
    pais:"Cuba",
    coordenadas: "",
    valorCo2: 567,
    texto: "",
    posicionX: -500,
    posicionY: -1500,
    dispositivo: 'dispositivo-1'
  },
  { nombre:"MURU 7.8 - Fusion", 
    ciudad:"Ciudad de Buenos Aires", 
    provincia:"Buenos Aires", 
    pais:"Argentina",
    coordenadas: "",
    valorCo2: "",
    texto: "",
    posicionX: 500,
    posicionY: 100,
    dispositivo: 'dispositivo-1'
  },
  { nombre:"Ver mapa de dispositivos activos", 
    ciudad:"", 
    provincia:"", 
    pais:"",
    coordenadas: "",
    valorCo2: "",
    texto: "",
    posicionX: 700,
    posicionY: -300,
    dispositivo: 'dispositivo-1'
  },
]


// Definir cada objeto con su informacion correspondiente, posicion en X, Y, offset, texto, color, etc
let nicMotta = {
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
  dispositivo: 'dispositivo-1'
};

let claudiaValente = {
  nombre:"Claudia Valente", 
  ciudad:"Jose C. Paz", 
  provincia:"Buenos Aires", 
  pais:"Argentina",
  coordenadas: "",
  valorCo2: 480,
  posicionX: -1000,
  posicionY: 200,
};

let leandroBarbeito = {
  nombre:"Leandro Barbeito", 
  ciudad:"Lomas del Mirador", 
  provincia:"Buenos Aires", 
  pais:"Argentina",
  coordenadas: "",
  valorCo2: 665,
  posicionX: 300,
  posicionY: 600,
};

let lupitaChavez = {
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


let bienalHabana = {
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

let muruFusion = {
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


let mapa = {
  nombre:"Ver mapa de dispositivos activos", 
  ciudad:"", 
  provincia:"", 
  pais:"",
  coordenadas: "",
  valorCo2: "",
  texto: "",
  posicionX: 700,
  posicionY: -300,
};
                  
let fondoSemilla;
let menuUno, menuDos, menuTres, menuCuatro, menuCinco, menuSeis, menuSiete, menuOcho;
let polygonClaudiaValente, polygonNicMotta, polygonLeandroBarbeito, polygonLupitaChavez, polygonMuruFusion, polygonLaHabana;

function preload() {
  fondoSemilla = loadImage("./assets/fondoSemilla.png");
  sonidoFondo = loadSound('assets/sound/sonidoSemilla.mp3');
  gifBrus = loadImage("./assets/brus.gif");
  mapPin = loadImage("./assets/mapicon.png");
}

function afterLoad(){
  loading = false
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  nuevoX = width / 2.0;
  nuevoY = height / 2.0;
  rectMode(CENTER);
  strokeWeight(1);
  textLeading(18); // Espacio entre lineas de texto
  textFont("Exo");
  imageMode(CENTER);
  
  textAlign(CENTER);

  // Modelos de mapa / menu
  mapModel = createSprite(100, 100);
  mapModel.addAnimation('normal', mapPin);
  mapModel.scale = 0.18;
  mapModel.mouseActive = true;
 
  // Modelos de cada persona
  nicMottaModel = createSprite(100, 100);
  nicMottaModel.addAnimation('normal', gifBrus);
  nicMottaModel.scale = 0.4;
  nicMottaModel.mouseActive = true;

  claudiaValenteModel = createSprite(100, 100);
  claudiaValenteModel.addAnimation('normal', gifBrus);
  claudiaValenteModel.scale = 0.4;
  claudiaValenteModel.mouseActive = true;

  // Modelos de cada persona
  lupitaChavezModel = createSprite(100, 100);
  lupitaChavezModel.addAnimation('normal', gifBrus);
  lupitaChavezModel.scale = 0.4;
  lupitaChavezModel.mouseActive = true;

  // Modelos de cada persona
  leandroBarbeitoModel = createSprite(100, 100);
  leandroBarbeitoModel.addAnimation('normal', gifBrus);
  leandroBarbeitoModel.scale = 0.4;
  leandroBarbeitoModel.mouseActive = true;

  // Modelos de cada persona
  bienalHabanaModel = createSprite(100, 100);
  bienalHabanaModel.addAnimation('normal', gifBrus);
  bienalHabanaModel.scale = 0.4;
  bienalHabanaModel.mouseActive = true;

  // Modelos de cada persona
  muruFusionModel = createSprite(100, 100);
  muruFusionModel.addAnimation('normal', gifBrus);
  muruFusionModel.scale = 0.4;
  muruFusionModel.mouseActive = true;


  // ! SACAR DE ACA
  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyB72EJgyU1K8SAuNPgRtoaOJywraSFNByY",
    authDomain: "respir0-namiki.firebaseapp.com",
    databaseURL: "https://respir0-namiki-default-rtdb.firebaseio.com",
    projectId: "respir0-namiki",
    storageBucket: "",
    messagingSenderId: ""
  }
    
  firebase.initializeApp(config); 
  database = firebase.database();
    
  let ref = database.ref('data');
  ref.on('value', gotData, errData);

  sizeFondo = tMin;

  // RANDOMS UTILES
  rClaudiaValente = random(-150, 150);
  rNicMotta = random(-150, 150);
  rLeandroBarbeito = random(-150, 150);
  rLupitaChavez = random(-150, 150);
  rLaHabana = random(-150, 150);
  rMuruFusion = random(-150, 150);
  rMap = random(-150, 150);

  setInterval(modeloGiroFondo, 100);

  sonidoFondo.loop();

  polygonClaudiaValente = new Polygon();
  polygonNicMotta = new Polygon();
  polygonLeandroBarbeito = new Polygon();
  polygonLupitaChavez = new Polygon();
  polygonMuruFusion = new Polygon();
  polygonLaHabana = new Polygon();
  
}
  
function gotData (data) {
  let dispositivos = data.val();
  let keys = Object.keys(dispositivos);
  
  let kk = dispositivos['dispositivo-1']
  let indexDB = Object.keys(kk)
  let lastIndex = indexDB[indexDB.length - 1]

  datosMapa.map( item => {
    item.valorCo2 = dispositivos[item.dispositivo][lastIndex].co2
  })
}
  
function errData(err) {
    console.log('Error!');
      console.log(err);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(colorFondo);
  noFill();
  noStroke();

  //Refactorizado
  datosMapa.map(( item ) => {
    image(fondoSemilla,
      item.posicionX + nuevoX,
      item.posicionY + nuevoY,
      sizeFondo + rNicMotta,
      sizeFondo + rNicMotta
    )

    ellipse(
      item.posicionX + nuevoX, 
      item.posicionY + nuevoY,
      500
    )
  })
  
  // LINEAS CONECTORAS
  stroke(80, 100);
  line(nicMotta.posicionX + nuevoX, nicMotta.posicionY + nuevoY, nuevoX, nuevoY);
  line(claudiaValente.posicionX + nuevoX, claudiaValente.posicionY + nuevoY, nuevoX, nuevoY);
  line(leandroBarbeito.posicionX + nuevoX, leandroBarbeito.posicionY + nuevoY, nuevoX, nuevoY);
  line(lupitaChavez.posicionX + nuevoX, lupitaChavez.posicionY + nuevoY, nuevoX, nuevoY);
  line(bienalHabana.posicionX + nuevoX, bienalHabana.posicionY + nuevoY, nuevoX, nuevoY);
  line(muruFusion.posicionX + nuevoX, muruFusion.posicionY + nuevoY, nuevoX, nuevoY);
  line(mapa.posicionX + nuevoX, mapa.posicionY + nuevoY, nuevoX, nuevoY);
  fill(80);
  ellipse(nuevoX, nuevoY, 20);
  noFill();
  noStroke();

  // Centro de espacio virtual - pregunta
  text(textoInicial, nuevoX, nuevoY, tamañoTexto, tamañoTexto);
  
  /*
  // Colores semaforo para CO2
  nicMotta.valorMap = map(nicMotta.valorCo2, valorMin, valorMax, 0, 255);
  let colorNicMotta = color(nicMotta.valorMap, 120, 0, 100);
  polygonNicMotta.x = nicMotta.posicionX + nuevoX;
  polygonNicMotta.y = nicMotta.posicionY + nuevoY;
  polygonNicMotta.size = sizeFondo / 6 + rNicMotta / 10;
  polygonNicMotta.color = colorNicMotta;
  polygonNicMotta.sides = 25;
  polygonNicMotta.spin = 45 + frameCount / 3;
  polygonNicMotta.show();

  claudiaValente.valorMap = map(claudiaValente.valorCo2, valorMin, valorMax, 0, 255);
  let colorClaudiaValente = color(claudiaValente.valorMap, 120, 0, 100);
  polygonClaudiaValente.x = claudiaValente.posicionX + nuevoX;
  polygonClaudiaValente.y = claudiaValente.posicionY + nuevoY;
  polygonClaudiaValente.size = sizeFondo / 6 + rClaudiaValente / 10;
  polygonClaudiaValente.color = colorClaudiaValente;
  polygonClaudiaValente.sides = 25;
  polygonClaudiaValente.spin = 45 + frameCount / 4;
  polygonClaudiaValente.show();

  leandroBarbeito.valorMap = map(leandroBarbeito.valorCo2, valorMin, valorMax, 0, 255);
  let colorLeandroBarbeito = color(leandroBarbeito.valorMap, 120, 0, 100);
  polygonLeandroBarbeito.x = leandroBarbeito.posicionX + nuevoX;
  polygonLeandroBarbeito.y = leandroBarbeito.posicionY + nuevoY;
  polygonLeandroBarbeito.size = sizeFondo / 6 + rLeandroBarbeito / 10;
  polygonLeandroBarbeito.color = colorLeandroBarbeito;
  polygonLeandroBarbeito.sides = 25;
  polygonLeandroBarbeito.spin = 45 + frameCount / 5;
  polygonLeandroBarbeito.show();

  lupitaChavez.valorMap = map(lupitaChavez.valorCo2, valorMin, valorMax, 0, 255);
  let colorLupitaChavez = color(lupitaChavez.valorMap, 120, 0, 100);
  polygonLupitaChavez.x = lupitaChavez.posicionX + nuevoX;
  polygonLupitaChavez.y = lupitaChavez.posicionY + nuevoY;
  polygonLupitaChavez.size = sizeFondo / 6 + rLupitaChavez / 10;
  polygonLupitaChavez.color = colorLupitaChavez;
  polygonLupitaChavez.sides = 25;
  polygonLupitaChavez.spin = 45 + frameCount / 4;
  polygonLupitaChavez.show();

  bienalHabana.valorMap = map(bienalHabana.valorCo2, valorMin, valorMax, 0, 255);
  let colorLaHabana = color(bienalHabana.valorMap, 120, 0, 100);
  polygonLaHabana.x = bienalHabana.posicionX + nuevoX;
  polygonLaHabana.y = bienalHabana.posicionY + nuevoY;
  polygonLaHabana.size = sizeFondo / 6 + rLaHabana / 10;
  polygonLaHabana.color = colorLaHabana;
  polygonLaHabana.sides = 25;
  polygonLaHabana.spin = 45 + frameCount / 3;
  polygonLaHabana.show();

  muruFusion.valorMap = map(muruFusion.valorCo2, valorMin, valorMax, 0, 255);
  let colorMuruFusion = color(muruFusion.valorMap, 120, 0, 100);
  polygonMuruFusion.x = muruFusion.posicionX + nuevoX;
  polygonMuruFusion.y = muruFusion.posicionY + nuevoY;
  polygonMuruFusion.size = sizeFondo / 6 + rMuruFusion / 10;
  polygonMuruFusion.color = colorMuruFusion;
  polygonMuruFusion.sides = 25;
  polygonMuruFusion.spin = 45 + frameCount / 5;
  polygonMuruFusion.show();
  */

  // Color de los textos
  fill(200);

  // Footer informacion MURU 7.8
  textStyle(NORMAL);
  textSize(12);
  text(textoFooter, windowWidth / 2, windowHeight - 10);

  // Centro de espacio virtual - pregunta
  textStyle(BOLD);
  textSize(18)
  text(textoInicial, nuevoX, nuevoY, tamañoTexto + 180, tamañoTexto)

  // Nodos dibujados
  textStyle(BOLD)
  textAlign(LEFT)
  textSize(15)

  datosMapa.map( item => {
    text(
      item.nombre + "\n" + 
      item.ciudad + "\n" + 
      item.provincia + "\n" + 
      item.pais + "\n" + 
      "Valor Co2: " + 
      item.valorCo2,
      item.posicionX + 
      nuevoX + xTexto, 
      item.posicionY + 
      nuevoY + yTexto,
      tamañoTexto, 
      tamañoTexto
    )
  })

  nicMottaModel.position.x = nicMotta.posicionX + nuevoX;
  nicMottaModel.position.y = nicMotta.posicionY + nuevoY;

  if(nicMottaModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  claudiaValenteModel.position.x = claudiaValente.posicionX + nuevoX;
  claudiaValenteModel.position.y = claudiaValente.posicionY + nuevoY;

  if(claudiaValenteModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  leandroBarbeitoModel.position.x = leandroBarbeito.posicionX + nuevoX;
  leandroBarbeitoModel.position.y = leandroBarbeito.posicionY + nuevoY;

  if(leandroBarbeitoModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  lupitaChavezModel.position.x = lupitaChavez.posicionX + nuevoX;
  lupitaChavezModel.position.y = lupitaChavez.posicionY + nuevoY;

  if(lupitaChavezModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  bienalHabanaModel.position.x = bienalHabana.posicionX + nuevoX;
  bienalHabanaModel.position.y = bienalHabana.posicionY + nuevoY;

  if(bienalHabanaModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  muruFusionModel.position.x = muruFusion.posicionX + nuevoX;
  muruFusionModel.position.y = muruFusion.posicionY + nuevoY;

  if(muruFusionModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  mapModel.position.x = mapa.posicionX + nuevoX;
  mapModel.position.y = mapa.posicionY + nuevoY;

  if(mapModel.mouseIsPressed) {
    window.location.href = "./mapa.html";
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

let sonido = true;

function playSound(){
  sonido = !sonido;

  if (sonido === true) {
    sonidoFondo.loop();
  }
  else {
    sonidoFondo.stop();
  }
}

function resetMap(){
  nuevoX = width / 2.0;
  nuevoY = height / 2.0;
}

let estadoMenu = true;

function mostrarMenu(){
  let menuRosa = document.getElementById('menuRosa');
  estadoMenu = !estadoMenu;

  if (estadoMenu === true) {
    
  }

  (estadoMenu === false) 
    ? menuRosa.style.visibility = "visible" 
    : menuRosa.style.visibility = "hidden";
}


function modeloGiroFondo(){
  estadoFondo === false && sizeFondo++
  estadoFondo && sizeFondo--
  
  (sizeFondo === maxSize)
    ? estadoFondo = true
    : estadoFondo = false
}

document.oncontextmenu = function() {
  return false
}
