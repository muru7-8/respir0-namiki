// Programado por Nic Motta
// 2021 - 2022
// MURU7.8

// TODO -> Loading de la pagina
// TODO -> Que hacer con los nodos que ya no estan activos? - Dejarlos con el último dato que recibió
// TODO -> Mapear valores co2 con colores

//! Revisar si funciona bien
document.oncontextmenu = function(){return false}

// * Colores
const BACKGROUND_COLOR = 0;
const LINES_COLOR = 80;
const LINES_ALPHA = 100;
const TEXT_COLOR = 200;

// 400 -> 51, 153, 0
// 1000 ->  153, 204, 51
// 2000 -> 255, 204, 0
// 3000 -> 255, 153, 102
// 4000 -> 204, 51, 0
// +4000 -> 255, 0, 0

// Configuracion navegacion
let newWidth, newHeight;
const BOX_SIZE = 30;
let offsetWidth = 0.0;
let offsetHeight = 0.0;
let PRESSED = false;
const ELLIPSE_SIZE = 500;

// Configuracion texto
const TEXT_X = 150;
const TEXT_Y = 40;
const TEXT_SIZE = 150;
const RANDOM_VALUE = 150;
const TEXT_FOOTER_SIZE = 12;
const TEXT_CENTER = 18;
const TEXT_NODOS = 15;
const INITIAL_TEXT = 'Ella nos acaricia, nos conecta y nos mantiene con vida.';
const FOOTER_TEXT = 'MURU 7.8 | Respir0 Namiki | v 2.0 | 2022';

const BACKGROUND_MAX_SIZE = 500;
let backgroundSize = 250;
let imageBackgroundState = false;

const isLoading = true;
const isActiveSound = true;

let backgroundSemilla;
let backgroundSound;
let gifBrus;
let mapPin;

const datosDispositivos = [
  { nombre: 'Nic Motta', 
    ciudad: 'San Fernando', 
    provincia: 'Buenos Aires', 
    pais: 'Argentina',
    coordenadas: '',
    dioxidoText: 'Valor Co2: ',
    valorDioxido: 1124,
    texto: '',
    posicionX: -200,
    posicionY: -300,
    valorMap: 0,
    idDispositivo: 'dispositivo-1',
    randomValue: 0
  },
  { nombre: 'Claudia Valente', 
    ciudad: 'Jose C. Paz', 
    provincia: 'Buenos Aires', 
    pais: 'Argentina',
    coordenadas: '',
    dioxidoText: 'Valor Co2: ',
    valorDioxido: 480,
    posicionX: -1000,
    posicionY: 200,
    idDispositivo: 'dispositivo-1',
    randomValue: 0
  },
  { nombre: 'Leandro Barbeito', 
    ciudad: 'Lomas del Mirador', 
    provincia: 'Buenos Aires', 
    pais: 'Argentina',
    coordenadas: '',
    dioxidoText: 'Valor Co2: ',
    valorDioxido: 665,
    posicionX: 300,
    posicionY: 600,
    idDispositivo: 'dispositivo-1',
    randomValue: 0
  },
  { nombre: 'Lupita Chavez', 
    ciudad: 'Tepic', 
    provincia: 'Nayarit', 
    pais: 'Mexico',
    coordenadas: '',
    dioxidoText: 'Valor Co2: ',
    valorDioxido: 1200,
    texto: '',
    posicionX: -1000,
    posicionY: -1000,
    idDispositivo: 'dispositivo-1',
    randomValue: 0
  },
  { nombre: 'Bienal de La Habana', 
    ciudad:'', 
    provincia: 'La Habana', 
    pais: 'Cuba',
    coordenadas: '',
    dioxidoText: 'Valor Co2: ',
    valorDioxido: 567,
    texto: '',
    posicionX: -500,
    posicionY: -1500,
    idDispositivo: 'dispositivo-1',
    randomValue: 0
  },
  { nombre: 'MURU 7.8 - Fusion', 
    ciudad: 'Ciudad de Buenos Aires', 
    provincia: 'Buenos Aires', 
    pais: 'Argentina',
    coordenadas: '',
    dioxidoText: 'Valor Co2: ',
    valorDioxido: '',
    texto: '',
    posicionX: 500,
    posicionY: 100,
    idDispositivo: 'dispositivo-1',
    randomValue: 0
  },
  { nombre: 'Ver mapa de dispositivos activos', 
    ciudad:'', 
    provincia:'', 
    pais:'',
    coordenadas: '',
    dioxidoText: '',
    valorDioxido: '',
    texto: '',
    posicionX: 700,
    posicionY: -300,
    idDispositivo: 'dispositivo-1',
    randomValue: 0
  },
]                 

function preload() {
  backgroundSemilla = loadImage('./assets/fondoSemilla.png');
  backgroundSound = loadSound('assets/sound/sonidoSemilla.mp3');
  gifBrus = loadImage('./assets/brus.gif');
  mapPin = loadImage('./assets/mapicon.png');
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
  textLeading(18);
  textFont('Exo');
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
  const config = {
    apiKey: 'AIzaSyB72EJgyU1K8SAuNPgRtoaOJywraSFNByY',
    authDomain: 'respir0-namiki.firebaseapp.com',
    databaseURL: 'https://respir0-namiki-default-rtdb.firebaseio.com',
    projectId: 'respir0-namiki',
    storageBucket: '',
    messagingSenderId: ''
  }
    
  firebase.initializeApp(config); 
  database = firebase.database();
    
  const ref = database.ref('data');
  ref.on('value', gotData, errData);

  // RANDOMS UTILES
  datosDispositivos.map(item => {
    item.randomValue = random(-RANDOM_VALUE, RANDOM_VALUE)
  })

  setInterval(modeloGiroFondo, 100);

  backgroundSound.loop();
  
}
  
function gotData (data) {
  const allDispositivos = data.val();
  const keyDispositivo = allDispositivos['dispositivo-1']
  const indexData = Object.keys(keyDispositivo)
  const lastIndex = indexData[indexData.length - 1]

  datosDispositivos.map( item => {
    item.valorDioxido = allDispositivos[item.idDispositivo][lastIndex].co2
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
  stroke(LINES_COLOR, LINES_ALPHA);

  datosDispositivos.map(item => {
    line(item.posicionX + newWidth, item.nombre + newHeight, newWidth, newHeight)
  })

  fill(LINES_COLOR);
  ellipse(newWidth, newHeight, 20);
  noFill();
  noStroke();

  // Centro de espacio virtual - pregunta
  text(INITIAL_TEXT, newWidth, newHeight, TEXT_SIZE, TEXT_SIZE);
  
  // Color de los textos
  fill(TEXT_COLOR);

  // Footer informacion MURU 7.8
  textStyle(NORMAL);
  textSize(TEXT_FOOTER_SIZE);
  text(FOOTER_TEXT, windowWidth / 2, windowHeight - 10);

  // Centro de espacio virtual - pregunta
  textStyle(BOLD);
  textSize(TEXT_CENTER)
  text(INITIAL_TEXT, newWidth, newHeight, TEXT_SIZE + 180, TEXT_SIZE)

  // Nodos dibujados
  textStyle(BOLD)
  textAlign(LEFT)
  textSize(TEXT_NODOS)

  datosDispositivos.map( item => {
    fill(TEXT_COLOR)
    text(
      item.nombre + '\n' + 
      item.ciudad + '\n' + 
      item.provincia + '\n' + 
      item.pais + '\n',
      item.posicionX + 
      newWidth + TEXT_X, 
      item.posicionY + 
      newHeight + TEXT_Y,
      TEXT_SIZE, 
      TEXT_SIZE
    )

    fill(255, 0, 0)
    text(
      '\n' + '\n' + '\n' + '\n' + '\n' + item.dioxidoText + item.valorDioxido, item.posicionX + 
      newWidth + TEXT_X, 
      item.posicionY + 
      newHeight + TEXT_Y,
      TEXT_SIZE, 
      TEXT_SIZE
    )
  })

  nicMottaModel.position.x = datosDispositivos[0].posicionX + newWidth;
  nicMottaModel.position.y = datosDispositivos[0].posicionY + newHeight;

  if (nicMottaModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  claudiaValenteModel.position.x = datosDispositivos[1].posicionX + newWidth;
  claudiaValenteModel.position.y = datosDispositivos[1].posicionY + newHeight;

  if (claudiaValenteModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  leandroBarbeitoModel.position.x = datosDispositivos[2].posicionX + newWidth;
  leandroBarbeitoModel.position.y = datosDispositivos[2].posicionY + newHeight;

  if (leandroBarbeitoModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  lupitaChavezModel.position.x = datosDispositivos[3].posicionX + newWidth;
  lupitaChavezModel.position.y = datosDispositivos[3].posicionY + newHeight;

  if (lupitaChavezModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  bienalHabanaModel.position.x = datosDispositivos[4].posicionX + newWidth;
  bienalHabanaModel.position.y = datosDispositivos[4].posicionY + newHeight;

  if (bienalHabanaModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  muruFusionModel.position.x = datosDispositivos[5].posicionX + newWidth;
  muruFusionModel.position.y = datosDispositivos[5].posicionY + newHeight;

  if (muruFusionModel.mouseIsPressed) {
    // Abrir pop-up con el texto de cada persona
  }

  mapModel.position.x = datosDispositivos[6].posicionX + newWidth;
  mapModel.position.y = datosDispositivos[6].posicionY + newHeight;

  if (mapModel.mouseIsPressed) {
    window.location.href = './mapa.html';
  }

  drawSprites();
}

function mousePressed() {
  PRESSED = true;
  offsetWidth = mouseX - newWidth;
  offsetHeight = mouseY - newHeight;
  cursor(MOVE);
}


function mouseDragged() {
  if (PRESSED) {
    newWidth = mouseX - offsetWidth;
    newHeight = mouseY - offsetHeight;
  }
}

function mouseReleased() {
  PRESSED = false;
  cursor(ARROW);
}

function keyPressed(){  // Reset / poner un boton para volver al centro con algun tipo de delay, mas fluido
  //resetMap()
}

function playSound(){
  isActiveSound = !isActiveSound;

  isActiveSound === true
    ? backgroundSound.loop()
    : backgroundSound.stop()
}

function resetMap(){
  newWidth = width / 2.0;
  newHeight = height / 2.0;
}

function modeloGiroFondo(){
  imageBackgroundState === false && backgroundSize++
  imageBackgroundState && backgroundSize--
  
  backgroundSize === BACKGROUND_MAX_SIZE
    ? imageBackgroundState = true
    : imageBackgroundState = false
}

document.oncontextmenu = function() {
  return false
}
