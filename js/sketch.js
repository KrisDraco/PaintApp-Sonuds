let palette = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "magenta",
  "brown",
  "white",
  "black",
];

let currentColor = palette[0];

const sampler = new Tone.Sampler({
  urls: {
    C3: "sounds/paint.mp3",
  },
  onload: () => {
    console.log("Sampler loaded");
  },
}).toDestination();


//Sets up the canvas and paint palette boxes
function setup() {
  createCanvas(1600, 900);

  for (let i = 0; i < palette.length; i++) {
    push();
    fill(palette[i]);
    noStroke();
    rect(0, i * 40 + i, 40, 40);
    pop();
  }

//Notes and durations
const notes = ["C4", "E4", "G4", "B4"];
const durations = [1, 0.5, 0.25, 0.25];

// Sequence that plays notes
// Durations
const synth = new Tone.Synth().toDestination();
const musicPart = new Tone.Sequence(
  (time, noteIndex) => {
    synth.triggerAttackRelease(notes[noteIndex], durations[noteIndex], time);
  },
  [0, 1, 2, 3],
  "4n"
);

// Starts and loops sound sequence
Tone.Transport.start();
musicPart.loop = true;
musicPart.start(0);

}

//New synth connected to destination
const synth = new Tone.Synth().toDestination();

// Plays a sound when file is saved
function playSoundOnSave() {
  // Triggers the synth with an A4 note
  synth.triggerAttackRelease('A4', '8n');
}

// Adds an event listener for the save event
document.addEventListener('save', playSoundOnSave)

//Checks the position of the mouse to make sure it is not painting over a pallette box, if not it paints
function draw() {
  if (mouseIsPressed) {
    if (mouseX > 45 && mouseY > palette.length * 1) {
      stroke(currentColor);
      strokeWeight(10);
      line(mouseX, mouseY, pmouseX, pmouseY);
      sampler.triggerAttack("C3")
    }
  }
}

//Checks to see if the user has clicked on a pallette box
function mousePressed() {
  let x = 0;
  let y = 0;
  let w = 40;
  let h = 40;

  for (let i = 0; i < palette.length; i++) {
    if (
      mouseX >= x &&
      mouseX < x + w &&
      mouseY >= y + i * (h + 1) &&
      mouseY < y + i * (h + 1) + h
    ) {
      currentColor = palette[i];
      sampler.triggerAttack("C6")
      break;
    }
  }
}
