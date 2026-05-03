const sporeField = document.querySelector(".spore-field");
const sealedButtons = document.querySelectorAll(".sealed-trigger");
const toastMessage = document.getElementById("toastMessage");

const transmissionOutput = document.getElementById("transmissionOutput");
const generateTransmissionBtn = document.getElementById("generateTransmission");

const adjudicateVisitorBtn = document.getElementById("adjudicateVisitor");
const designationText = document.getElementById("designationText");
const symptomText = document.getElementById("symptomText");
const verdictText = document.getElementById("verdictText");

const purityFill = document.getElementById("purityFill");
const corruptionFill = document.getElementById("corruptionFill");
const purityValue = document.getElementById("purityValue");
const corruptionValue = document.getElementById("corruptionValue");
const containmentStatus = document.getElementById("containmentStatus");
const ritualButtons = document.querySelectorAll(".ritual-btn[data-action]");
const restartContainment = document.getElementById("restartContainment");

const sigil = document.getElementById("sigil");
const liturgyOutput = document.getElementById("liturgyOutput");

let containment = {
  purity: 27,
  corruption: 19,
  turns: 0,
  failed: false
};

const liturgyPool = [
  "The bells are silent. This is not mercy. It is only the pause before recognition.",
  "Rust flowers beneath the paint. Beneath the rust, devotion.",
  "A single fly circles where no atmosphere should permit it.",
  "The tally has no end state. Only deeper entries.",
  "What the Imperium seals, Grandfather ripens.",
  "The kindest rot is the one that arrives slowly enough to be understood as fate.",
  "The warp does not always scream. Sometimes it ferments."
];

const prognosisSubjects = [
  "An Imperial bastion-world",
  "A shrine convoy under false blessing",
  "A void station whose liturgies have thinned",
  "A xenos scouting host",
  "A hive district already coughing beneath its masks",
  "A Chapter outpost grown proud in isolation",
  "A pilgrim fleet ripe for devotional fracture",
  "A manufactorum-city that mistakes rust for age"
];

const prognosisWeaknesses = [
  "shows hairline fractures in morale",
  "conceals an undetected contagion vector",
  "depends upon brittle chains of command",
  "mistakes delay for safety",
  "has mistaken ritual repetition for true faith",
  "is overconfident in quarantine doctrine",
  "carries rot in its stores and cannot yet smell it",
  "has sealed its weakness in layers thin enough to weep"
];

const prognosisOutcomes = [
  "Prediction: surrender will arrive before comprehension.",
  "Prediction: seven days of denial, then devotional collapse.",
  "Prediction: the first rupture will be spiritual, the second biological.",
  "Prediction: attrition will be mistaken for chance until the tally closes.",
  "Prediction: command will fail in increments small enough to be ignored.",
  "Prediction: the survivors will call the rot mercy when pain becomes familiar.",
  "Prediction: faith will remain upright two days longer than flesh.",
  "Prediction: quarantine will become chapel, then tomb, then nursery."
];

const prognosisOmens = [
  "A bell tolls where no bell was mounted.",
  "The sump-censers burn sweet and wet.",
  "Three lumen-globes have spoiled into green dusk.",
  "A fly has been heard inside a sealed helm.",
  "The machine-spirit coughs phlegm through its vent-choirs.",
  "The lower hold reports obedient mildew and weeping steel.",
  "Devotional runes have begun to swell like scabs.",
  "Spoor signatures have appeared across clean parchment."
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
    "Pressure-locks engaged. Devotional mucus crossed the seam.",
    "Sealant applied. Beneath it, the contamination learned your shape."
  ],
  quarantine: [
    "Quarantine invoked. The spores accepted the perimeter as shelter.",
    "Isolation protocol enacted. The sickness now regards the quarantine as chapel.",
    "Containment cordon raised. The prayers inside began to curdle."
  ],
  purge: [
    "Flame washed the breach. The smoke returned bearing blessings.",
    "Purge sequence completed. The dead blackened, split, and continued breathing.",
    "Cauterization succeeded only in the narrowest technical sense."
  ]
};

function createSpores() {
  const sporeCount = 82;

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

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function showToast(message) {
  toastMessage.textContent = message;
  toastMessage.classList.add("show");

  setTimeout(() => {
    toastMessage.classList.remove("show");
  }, 2600);
}

function updateLiturgy() {
  liturgyOutput.textContent = randomFrom(liturgyPool);
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
    containment.purity = 11;
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

  const purityGain = Math.floor(Math.random() * 10) + 5;
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
      `${line} A moment of stability was observed. The contagion adapted immediately.`;
    containment.corruption = Math.min(100, containment.corruption + 10);
  }

  updateContainmentUI();
}

function resetContainment() {
  containment = {
    purity: 27,
    corruption: 19,
    turns: 0,
    failed: false
  };

  ritualButtons.forEach((button) => {
    button.disabled = false;
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  });

  containmentStatus.textContent =
    "Initial rot-signatures detected beneath devotional plating. The system awaits a doomed command.";

  restartContainment.classList.add("hidden");
  updateContainmentUI();
}

sealedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showToast("ACCESS DENIED. THE DATAVAULT REMAINS CENSURED BY SACRED ROT.");
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
  updateLiturgy();
});

createSpores();
updateContainmentUI();
generateTransmission();
updateLiturgy();
setInterval(updateLiturgy, 6000);
