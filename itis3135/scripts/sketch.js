// Global variables
let currentHue;
let canvasHistory = [];
let maxHistory = 20;

let undoButtonX, undoButtonY;
let undoButtonSize = 40;

// Helper functions
function saveCanvasState() {
  if (canvasHistory.length >= maxHistory) {
    canvasHistory.shift();
  }
  canvasHistory.push(get());
}

function undoCanvas() {
  if (canvasHistory.length > 1) {
    canvasHistory.pop();
    let previousCanvas = canvasHistory[canvasHistory.length - 1];
    image(previousCanvas, 0, 0, width, height);
  }
}

function setBlendedStroke(x, y) {
  let baseHue;

  if (x < width / 2 && y < height / 2) {
    baseHue = 200;
  } else if (x >= width / 2 && y < height / 2) {
    baseHue = 340;
  } else if (x < width / 2 && y >= height / 2) {
    baseHue = 160;
  } else {
    baseHue = 45;
  }

  let offset = map(x - y, -width, width, -20, 20);
  currentHue = (baseHue + offset + 360) % 360;
}

// Draw the undo button (simple triangle, no hover)
function drawUndoButton() {
  push();
  noStroke();
  fill(0, 0, 80, 0.6); 

  let size = undoButtonSize;
  let halfSize = size / 2;

  triangle(
    undoButtonX, undoButtonY,
    undoButtonX, undoButtonY + size,
    undoButtonX - size, undoButtonY + halfSize
  );
  pop();
}

// Check if mouse clicked inside undo button
function isInsideUndoButton(x, y) {
  return x >= undoButtonX - undoButtonSize && x <= undoButtonX + 10 &&
         y >= undoButtonY && y <= undoButtonY + undoButtonSize;
}

// Event functions
function setup() {
  createCanvas(1280, 720);
  colorMode(HSB, 360, 100, 100, 1);
  background(210, 20, 30);
  strokeWeight(15);
  
  describe('Draws colorful lines with undo button.');

  saveCanvasState(); 
  
  // position undo button
  undoButtonX = 50;
  undoButtonY = height - 50;
}

function draw() {
  if (mouseIsPressed && !isInsideUndoButton(mouseX, mouseY)) {
    setBlendedStroke(mouseX, mouseY);
    stroke(currentHue, 80, 95, 1); 
    line(pmouseX, pmouseY, mouseX, mouseY); 
  }

  drawUndoButton();
}

function mousePressed() {
  if (isInsideUndoButton(mouseX, mouseY)) {
    undoCanvas();
  }
}

function mouseReleased() {
  if (!isInsideUndoButton(mouseX, mouseY)) {
    saveCanvasState();
  }
}

function keyPressed() {
  if (key === 'z' || key === 'Z') {
    undoCanvas();
  }
}
