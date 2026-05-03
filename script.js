const sporeField = document.querySelector(".spore-field");
const sealedButtons = document.querySelectorAll(".sealed-trigger");
const toastMessage = document.getElementById("toastMessage");

const transmissionOutput = document.getElementById("transmissionOutput");
const generateTransmissionBtn = document.getElementById("generateTransmission");

const adjudicateVisitorBtn = document.getElementById("adjudicateVisitor");
const designationText = document.getElementById("designationText");
const symptomText = document.getElementById("symptomText");
const verdictText = document.getElementById("verdictText");

const sigil = document.getElementById("sigil");

const purityFill = document.getElementById("purityFill");
const corruptionFill = document.getElementById("corruptionFill");
const purityValue = document.getElementById("purityValue");
const corruptionValue = document.getElementById("corruptionValue");
const containmentStatus = document.getElementById("containmentStatus");
const ritualButtons = document.querySelectorAll(".ritual-btn[data-action]");
const restartContainment = document.getElementById("restartContainment");

let containment = {
  purity: 28,
  corruption: 18,
  turns: 0,
  failed: false
};

const prognosisSubjects = [
  "An Imperial bastion-world",
  "A shrine convoy under false blessing",
  "A xenos scouting host",
  "A zealot regiment entrenched in ash wastes",
  "A void-station whose liturgies have thinned",
  "A Chapter outpost grown proud in isolation",
  "A hive district already coughing beneath its masks",
  "A pilgrim fleet ripe for devotional fracture"
];

const prognosisWeaknesses = [
  "shows hairline fractures in morale",
  "conceals an undetected contagion vector",
  "depends upon brittle chains of command",
  "mistakes delay for safety",
  "prays loudly to cover the scent of fear",
  "has mistaken ritual repetition for true faith",
  "is overconfident in quarantine doctrine",
  "carries rot in its stores and cannot yet smell it"
];

const prognosisOutcomes = [
  "Prediction: surrender will arrive before comprehension.",
  "Prediction: seven days of denial, then devotional collapse.",
  "Prediction: resistance will persist only long enough to become exemplary.",
  "Prediction: the first rupture will be spiritual, the second biological.",
  "Prediction: attrition will be mistaken for chance until the tally closes.",
  "Prediction: command will fail in increments small enough to be ignored.",
  "Prediction: hope will outlive reason by less than a night cycle.",
  "Prediction: the survivors will call the rot mercy when pain becomes familiar."
];

const prognosisOmens = [
  "Auspex spoor glistens along the outer decks.",
  "The sump-censers burn sweet and wet.",
  "A bell tolls where no bell was mounted.",
  "Three lumen-globes have spoiled into green dusk.",
  "The machine-spirit coughs phlegm through its hymnal vents.",
  "A fly has been heard inside a sealed helm.",
  "The lower hold reports weeping steel and obedient mildew.",
  "Devotional runes have begun to swell like living scabs."
];

const designationPool = [
  "Tally-Marked Intruder",
  "Provisional Witness-Soul",
  "Breach-Borne Supplicant",
  "Unclean Observer of Useful Decline",
  "Pending Corpse with Archive Access",
  "Soft-Flesh Intelligence Unit",
  "Rot-Attuned Trespasser",
  "Mercy-Adjacent Witness"
];

const symptomPool = [
  "Pulse cadence already lagging behind personal denial.",
  "Minor spiritual softening detected beneath surface certainty.",
  "Latent fear-response suitable for cultivation.",
  "Clean habits weakening under sustained exposure.",
  "Language beginning to accommodate rot more easily than hope.",
  "Defensive certainty compromised by fascination.",
  "Moral architecture dampening and sloughing at the edges.",
  "Soul-seal thinning in a manner consistent with useful corruption."
];

const verdictPool = [
  "Not yet claimed. Mark for observation.",
  "Return to the tally after further decline.",
  "Resistance remains, but no longer impressively.",
  "Suitable only as witness, not yet vessel.",
  "Mercy deferred. Contamination probable.",
  "The archive advises patience. Rot improves all things slowly.",
  "Retain under watch. Collapse pattern promising.",
  "Classification complete. Cleansing not recommended."
];

const containmentResponses = {
  seal: [
    "Bulkheads sealed. The rot answered by blooming within the rivets.",
    "Pressure-locks engaged. Devotional mucus has crossed the seam.",
    "Sealant applied. Beneath it, the contamination learned your shape."
  ],
  quarantine: [
    "Deck quarantined. The spores complied by taking root inside the warning runes.",
    "Isolation protocol enacted. The sickness now regards the quarantine as shelter.",
    "Perimeter held for a moment. Then the prayers inside began to curdle."
  ],
  purge: [
    "Flame washed the breach. The smoke returned bearing blessings.",
    "Purge sequence completed. The dead blackened, split, and continued breathing.",
    "Cauterization successful only in the narrowest technical sense."
  ]
};

function createSpores() {
  const sporeCount = 80;

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

function showToast(message) {
  toastMessage.textContent = message;
  toastMessage.classList.add("show");

  setTimeout(() => {
    toastMessage.classList.remove("show");
  }, 2600);
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateTransmission() {
  const subject = randomFrom(prognosisSubjects);
  const weakness = randomFrom(prognosisWeaknesses);
  const omen = randomFrom(prognosisOmens);
  const outcome = randomFrom(prognosisOutcomes);

  transmissionOutput.innerHTML = `
    <p><strong>OMEN:</strong> ${omen}</p>
    <p><strong>TARGET READ:</strong> ${subject} ${weakness}.</p>
    <p><strong>PROGNOSIS:</strong> ${outcome}</p>
  `;
}

function adjudicateVisitor() {
  designationText.textContent = randomFrom(designationPool);
  symptomText.textContent = randomFrom(symptomPool);
  verdictText.textContent = randomFrom(verdictPool);
}

function updateContainmentUI() {
  purityFill.style.width = `${containment.purity}%`;
  corruptionFill.style.width = `${containment.corruption}%`;
  purityValue.textContent = `${containment.purity}%`;
  corruptionValue.textContent = `${containment.corruption}%`;
}

function failContainment(finalLine) {
  containment.failed = true;
  containment.corruption = 100;
  if (containment.purity > 70) {
    containment.purity = 12;
  }
  updateContainmentUI();

  containmentStatus.textContent =
    `${finalLine} Containment has failed. It was always going to fail. The rot has accepted your effort as tribute.`;

  ritualButtons.forEach((button) => {
    button.disabled = true;
    button.style.opacity = "0.45";
    button.style.cursor = "not-allowed";
  });

  restartContainment.classList.remove("hidden");
}

function handleContainmentAction(action) {
  if (containment.failed) return;

  containment.turns += 1;

  const purityGain = Math.floor(Math.random() * 10) + 6;
  const corruptionGain = Math.floor(Math.random() * 14) + 12;

  containment.purity = Math.min(100, containment.purity + purityGain);
  containment.corruption = Math.min(100, containment.corruption + corruptionGain);

  const line = randomFrom(containmentResponses[action]);
  containmentStatus.textContent = line;

  if (containment.turns >= 5 || containment.corruption >= 88) {
    failContainment(line);
    return;
  }

  if (containment.purity >= 82) {
    containmentStatus.textContent =
      `${line} A brief stability has been observed. The contamination adapted immediately.`;
    containment.corruption = Math.min(100, containment.corruption + 10);
  }

  updateContainmentUI();
}

function resetContainment() {
  containment = {
    purity: 28,
    corruption: 18,
    turns: 0,
    failed: false
  };

  ritualButtons.forEach((button) => {
    button.disabled = false;
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  });

  containmentStatus.textContent =
    "First spoor detected in lower devotional ducts. The system awaits your futile response.";
  restartContainment.classList.add("hidden");
  updateContainmentUI();
}

sealedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showToast("ACCESS DENIED. THE DATA-CRYPT REMAINS CENSURED BY SACRED ROT.");
  });
});

ritualButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleContainmentAction(button.dataset.action);
  });
});

restartContainment.addEventListener("click", resetContainment);

generateTransmissionBtn.addEventListener("click", generateTransmission);
adjudicateVisitorBtn.addEventListener("click", adjudicateVisitor);

sigil.addEventListener("click", () => {
  showToast("XIV LEGION MEMORY-STIR CONFIRMED. THE SEAL RECOGNIZES LIVING FLESH.");
});

createSpores();
updateContainmentUI();
generateTransmission();
