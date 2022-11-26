// Programado por Nic Motta
// 2021
// MURU7.8

// TODO -> Loading de la pagina
// TODO -> Refactorizar codigo - refactor de carpetas y archivos
// TODO -> Que hacer con los nodos que ya no estan activos? - Dejarlos con el último dato que recibió

//! Revisar si funciona bien
document.oncontextmenu = function(){return false}

// * Colores
const BACKGROUND_COLOR = 0;

// 400 -> 51, 153, 0
// 1000 ->  153, 204, 51
// 2000 -> 255, 204, 0
// 3000 -> 255, 153, 102
// 4000 -> 204, 51, 0
// +4000 -> 255, 0, 0

// Configuracion navegacion nodos
let newWidth, newHeight;
const BOX_SIZE = 30;
const offsetWidth = 0.0;
const offsetHeight = 0.0;
const PUSHED = false;
const ELLIPSE_SIZE = 500;

// Configuracion texto de nodos
const TEXT_X = 150;
const TEXT_Y = 40;
const TEXT_SIZE = 150;
const RANDOM_VALUE = 150;

// Textos
const INITIAL_TEXT = "Ella nos acaricia, nos conecta y nos mantiene con vida.";
const FOOTER_TEXT = "MURU 7.8 | Respir0 Namiki | v 2.0 | 2022";

const tMin = 250;
const BACKGROUND_MAX_SIZE = 500;
const backgroundSize = 250;
const imageBackgroundState = false;

const isLoading = true;

const datosDispositivos = [
  { nombre:"Nic Motta", 
    ciudad:"San Fernando", 
    provincia:"Buenos Aires", 
    pais:"Argentina",
    coordenadas: "",
    valorDioxido: 1124,
    texto: "",
    posicionX: -200,
    posicionY: -300,
    valorMap: 0,
    dispositivo: 'dispositivo-1',
    randomValue: 0
  },
  { nombre:"Claudia Valente", 
    ciudad:"Jose C. Paz", 
    provincia:"Buenos Aires", 
    pais:"Argentina",
    coordenadas: "",
    valorDioxido: 480,
    posicionX: -1000,
    posicionY: 200,
    dispositivo: 'dispositivo-1',
    randomValue: 0
  },
  { nombre:"Leandro Barbeito", 
    ciudad:"Lomas del Mirador", 
    provincia:"Buenos Aires", 
    pais:"Argentina",
    coordenadas: "",
    valorCo2: 665,
    posicionX: 300,
    posicionY: 600,
    dispositivo: 'dispositivo-1',
    randomValue: 0
  },
  { nombre:"Lupita Chavez", 
    ciudad:"Tepic", 
    provincia:"Nayarit", 
    pais:"Mexico",
    coordenadas: "",
    valorDioxido: 1200,
    texto: "",
    posicionX: -1000,
    posicionY: -1000,
    dispositivo: 'dispositivo-1',
    randomValue: 0
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
    dispositivo: 'dispositivo-1',
    randomValue: 0
  },
  { nombre:"MURU 7.8 - Fusion", 
    ciudad:"Ciudad de Buenos Aires", 
    provincia:"Buenos Aires", 
    pais:"Argentina",
    coordenadas: "",
    valorDioxido: "",
    texto: "",
    posicionX: 500,
    posicionY: 100,
    dispositivo: 'dispositivo-1',
    randomValue: 0
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
    dispositivo: 'dispositivo-1',
    randomValue: 0
  },
]


/* Definir cada objeto con su informacion correspondiente, posicion en X, Y, offset, texto, color, etc
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
*/
                  
let backgroundSemilla;
let backgroundSound;
let gifBrus;
let mapPin;

function preload() {
  backgroundSemilla = loadImage("./assets/fondoSemilla.png");
  backgroundSound = loadSound('assets/sound/sonidoSemilla.mp3');
  gifBrus = loadImage("./assets/brus.gif");
  mapPin = loadImage("./assets/mapicon.png");
}

function afterLoad(){
  isLoading = false
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  newWidth = width / 2.0;
  newHeight = height / 2.0;
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

  // RANDOMS UTILES
  datosDispositivos.map(item => {
    item.randomValue = random(-RANDOM_VALUE, RANDOM_VALUE)
  })

  setInterval(modeloGiroFondo, 100);

  backgroundSound.loop();
  
}
  
function gotData (data) {
  let dispositivos = data.val();
  let keys = Object.keys(dispositivos);
  
  let kk = dispositivos['dispositivo-1']
  let indexDB = Object.keys(kk)
  let lastIndex = indexDB[indexDB.length - 1]

  datosDispositivos.map( item => {
    item.valorDioxido = dispositivos[item.dispositivo][lastIndex].co2
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
  background(BACKGROUND_COLOR);
  noFill();
  noStroke();

  datosDispositivos.map(( item ) => {
    image(backgroundSemilla,
      item.posicionX + newWidth,
      item.posicionY + newHeight,
      backgroundSize + item.randomValue,
      backgroundSize + item.randomValue
    )

    ellipse(
      item.posicionX + newWidth, 
      item.posicionY + newHeight,
      ELLIPSE_SIZE
    )
  })
  
  // LINEAS CONECTORAS
  stroke(80, 100);

  datosDispositivos.map(item => {
    line(item.posicionX + newWidth, item.nombre + newHeight, newWidth, newHeight)
  })

  fill(80);
  ellipse(newWidth, newHeight, 20);
  noFill();
  noStroke();

  // Centro de espacio virtual - pregunta
  text(INITIAL_TEXT, newWidth, newHeight, TEXT_SIZE, TEXT_SIZE);
  
  // Color de los textos
  fill(200);

  // Footer informacion MURU 7.8
  textStyle(NORMAL);
  textSize(12);
  text(FOOTER_TEXT, windowWidth / 2, windowHeight - 10);

  // Centro de espacio virtual - pregunta
  textStyle(BOLD);
  textSize(18)
  text(INITIAL_TEXT, newWidth, newHeight, TEXT_SIZE + 180, TEXT_SIZE)

  // Nodos dibujados
  textStyle(BOLD)
  textAlign(LEFT)
  textSize(15)

  datosDispositivos.map( item => {
    text(
      item.nombre + "\n" + 
      item.ciudad + "\n" + 
      item.provincia + "\n" + 
      item.pais + "\n" + 
      "Valor Co2: " + 
      item.valorDioxido,
      item.posicionX + 
      newWidth + TEXT_X, 
      item.posicionY + 
      newHeight + TEXT_Y,
      TEXT_SIZE, 
      TEXT_SIZE
    )
  })

  nicMottaModel.position.x = datosDispositivos.nicMotta.posicionX + newWidth;
  nicMottaModel.position.y = datosDispositivos.nicMotta.posicionY + newHeight;

  if (nicMottaModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  claudiaValenteModel.position.x = datosDispositivos.claudiaValente.posicionX + newWidth;
  claudiaValenteModel.position.y = datosDispositivos.claudiaValente.posicionY + newHeight;

  if (claudiaValenteModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  leandroBarbeitoModel.position.x = datosDispositivos.leandroBarbeito.posicionX + newWidth;
  leandroBarbeitoModel.position.y = datosDispositivos.leandroBarbeito.posicionY + newHeight;

  if (leandroBarbeitoModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  lupitaChavezModel.position.x = datosDispositivos.lupitaChavez.posicionX + newWidth;
  lupitaChavezModel.position.y = datosDispositivos.lupitaChavez.posicionY + newHeight;

  if (lupitaChavezModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  bienalHabanaModel.position.x = datosDispositivos.bienalHabana.posicionX + newWidth;
  bienalHabanaModel.position.y = datosDispositivos.bienalHabana.posicionY + newHeight;

  if (bienalHabanaModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  muruFusionModel.position.x = datosDispositivos.muruFusion.posicionX + newWidth;
  muruFusionModel.position.y = datosDispositivos.muruFusion.posicionY + newHeight;

  if (muruFusionModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  mapModel.position.x = datosDispositivos.map.posicionX + newWidth;
  mapModel.position.y = datosDispositivos.map.posicionY + newHeight;

  if (mapModel.mouseIsPressed) {
    window.location.href = "./mapa.html";
  }

  drawSprites();
}

function mousePressed() {
  PUSHED = true;
  offsetWidth = mouseX - newWidth;
  offsetHeight = mouseY - newHeight;
  cursor(MOVE);
}


function mouseDragged() {
  if (PUSHED) {
    newWidth = mouseX - offsetWidth;
    newHeight = mouseY - offsetHeight;
  }
}

function mouseReleased() {
  PUSHED = false;
  cursor(ARROW);
}

function keyPressed(){  // Reset / poner un boton para volver al centro con algun tipo de delay, mas fluido
  //resetMap()
}

let sonido = true;

function playSound(){
  sonido = !sonido;

  if (sonido === true) {
    backgroundSound.loop();
  }
  else {
    backgroundSound.stop();
  }
}

function resetMap(){
  newWidth = width / 2.0;
  newHeight = height / 2.0;
}

function modeloGiroFondo(){
  imageBackgroundState === false && backgroundSize++
  imageBackgroundState && backgroundSize--
  
  (backgroundSize === BACKGROUND_MAX_SIZE)
    ? imageBackgroundState = true
    : imageBackgroundState = false
}

document.oncontextmenu = function() {
  return false
}
