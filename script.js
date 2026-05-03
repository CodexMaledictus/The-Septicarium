const sporeField = document.querySelector(".spore-field");
const sealedButtons = document.querySelectorAll(".sealed-trigger");
const sealedMessage = document.getElementById("sealedMessage");
const designationButton = document.getElementById("designationButton");
const designationOutput = document.getElementById("designationOutput");
const sigil = document.getElementById("sigil");

const designations = [
  "PROVISIONAL ENTRY: Witness-rot // Awaiting deeper count.",
  "PROVISIONAL ENTRY: Unclean observer // Resistance noted.",
  "PROVISIONAL ENTRY: Breach-soul // Archive contact confirmed.",
  "PROVISIONAL ENTRY: Carrion intelligence // Do not cleanse.",
  "PROVISIONAL ENTRY: Tally-marked // Mercy pending.",
  "PROVISIONAL ENTRY: Auspex ghost // Still breathing.",
  "PROVISIONAL ENTRY: Soft flesh // Future scripture.",
  "PROVISIONAL ENTRY: Unblessed witness // Grandfather sees."
];

function createSpores() {
  const sporeCount = 64;

  for (let i = 0; i < sporeCount; i++) {
    const spore = document.createElement("span");

    spore.classList.add("spore");
    spore.style.left = `${Math.random() * 100}%`;
    spore.style.animationDuration = `${10 + Math.random() * 22}s`;
    spore.style.animationDelay = `${Math.random() * 16}s`;
    spore.style.opacity = `${0.15 + Math.random() * 0.65}`;
    spore.style.transform = `scale(${0.6 + Math.random() * 1.8})`;

    sporeField.appendChild(spore);
  }
}

function showSealedMessage() {
  sealedMessage.classList.add("show");

  setTimeout(() => {
    sealedMessage.classList.remove("show");
  }, 2600);
}

function assignDesignation() {
  const designation = designations[Math.floor(Math.random() * designations.length)];
  designationOutput.textContent = designation;
}

function activateSigil() {
  designationOutput.textContent = "THE SEAL DOES NOT OPEN. IT RECOGNIZES.";
  document.body.classList.add("sigil-active");

  setTimeout(() => {
    document.body.classList.remove("sigil-active");
  }, 1800);
}

sealedButtons.forEach((button) => {
  button.addEventListener("click", showSealedMessage);
});

designationButton.addEventListener("click", assignDesignation);
sigil.addEventListener("click", activateSigil);

createSpores();
