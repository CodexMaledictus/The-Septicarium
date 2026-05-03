/* =========================================================
   THE SEPTICARIUM // CORE INTERACTION ENGINE
   Shared public-facing plague-archive behavior
   ========================================================= */

(() => {
  "use strict";

  /* -------------------------
     01. SAFE DOM HELPERS
  ------------------------- */

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const randomFrom = (array) => array[Math.floor(Math.random() * array.length)];

  function exists(element) {
    return element !== null && element !== undefined;
  }

  function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  }

  /* -------------------------
     02. CORE ELEMENTS
  ------------------------- */

  const sporeField = $(".spore-field");
  const moteField = $(".mote-field");

  const sealedButtons = $$(".sealed-trigger, .sealed-entry");
  const toastMessage = $("#toastMessage") || $("#toast");

  const transmissionOutput = $("#transmissionOutput");
  const generateTransmissionBtn = $("#generateTransmission");

  const adjudicateVisitorBtn = $("#adjudicateVisitor");
  const designationText = $("#designationText");
  const symptomText = $("#symptomText");
  const verdictText = $("#verdictText");

  const purityFill = $("#purityFill");
  const corruptionFill = $("#corruptionFill");
  const purityValue = $("#purityValue");
  const corruptionValue = $("#corruptionValue");
  const containmentStatus = $("#containmentStatus");
  const ritualButtons = $$(".ritual-btn[data-action]");
  const restartContainment = $("#restartContainment");

  const sigil = $("#sigil");
  const liturgyOutput = $("#liturgyOutput");

  const hoverLiturgy = $("#hoverLiturgy");

  /* -------------------------
     03. ARCHIVE TEXT POOLS
  ------------------------- */

  const liturgyPool = [
    "The bells are silent. This is not mercy. It is only the pause before recognition.",
    "Rust flowers beneath the paint. Beneath the rust, devotion.",
    "A single fly circles where no atmosphere should permit it.",
    "The tally has no end state. Only deeper entries.",
    "What the Imperium seals, Grandfather ripens.",
    "The kindest rot is the one that arrives slowly enough to be understood as fate.",
    "The warp does not always scream. Sometimes it ferments.",
    "A clean wound is only an unfinished sermon.",
    "Mercy is not release. Mercy is continuation through blessed decay.",
    "The Fourteenth remembers what swifter legions waste.",
    "No wound is wasted once it begins to teach.",
    "Decay is not failure. Decay is instruction made visible.",
    "The ship dreams in mildew and wakes in command cant.",
    "A sealed door is only a chapel waiting to soften.",
    "The rot does not hurry. That is why it wins.",
    "Every quarantine line is a confession of fear.",
    "The first symptom is fascination. The second is obedience.",
    "A corpse that continues to serve has understood the gift."
  ];

  const prognosisSubjects = [
    "An Imperial bastion-world",
    "A shrine convoy under false blessing",
    "A void station whose liturgies have thinned",
    "A xenos scouting host",
    "A hive district already coughing beneath its masks",
    "A Chapter outpost grown proud in isolation",
    "A pilgrim fleet ripe for devotional fracture",
    "A manufactorum-city that mistakes rust for age",
    "A frontier garrison convinced its walls still matter",
    "A mining colony with sealed lower lungs",
    "A faith-bastion whose prayers have become procedural",
    "A command moon overfed on certainty"
  ];

  const prognosisWeaknesses = [
    "shows hairline fractures in morale",
    "conceals an undetected contagion vector",
    "depends upon brittle chains of command",
    "mistakes delay for safety",
    "has mistaken ritual repetition for true faith",
    "is overconfident in quarantine doctrine",
    "carries rot in its stores and cannot yet smell it",
    "has sealed its weakness in layers thin enough to weep",
    "believes discipline can substitute for meaning",
    "has centralized too much hope in too few officers",
    "has confused clean armor for clean souls",
    "stores panic beneath professional language"
  ];

  const prognosisOutcomes = [
    "Prediction: surrender will arrive before comprehension.",
    "Prediction: seven days of denial, then devotional collapse.",
    "Prediction: the first rupture will be spiritual, the second biological.",
    "Prediction: attrition will be mistaken for chance until the tally closes.",
    "Prediction: command will fail in increments small enough to be ignored.",
    "Prediction: the survivors will call the rot mercy when pain becomes familiar.",
    "Prediction: faith will remain upright two days longer than flesh.",
    "Prediction: quarantine will become chapel, then tomb, then nursery.",
    "Prediction: the gate will hold after the defenders have already fallen inward.",
    "Prediction: the officers will keep issuing orders to men whose obedience has spoiled.",
    "Prediction: the first corpse to stand again will be called impossible. The second will be called strategy.",
    "Prediction: cleansing fire will make the smoke devotional."
  ];

  const prognosisOmens = [
    "A bell tolls where no bell was mounted.",
    "The sump-censers burn sweet and wet.",
    "Three lumen-globes have spoiled into green dusk.",
    "A fly has been heard inside a sealed helm.",
    "The machine-spirit coughs phlegm through its vent-choirs.",
    "The lower hold reports obedient mildew and weeping steel.",
    "Devotional runes have begun to swell like scabs.",
    "Spoor signatures have appeared across clean parchment.",
    "A servo-skull recited casualty figures from a battle not yet fought.",
    "The chapel floor softened beneath kneeling officers.",
    "A sealed ration crate opened from the inside.",
    "The vox repeated a prayer in a voice no longer alive."
  ];

  const designationPool = [
    "Tally-Marked Intruder",
    "Provisional Witness-Soul",
    "Breach-Borne Supplicant",
    "Unclean Observer of Useful Decline",
    "Pending Corpse with Archive Access",
    "Soft-Flesh Intelligence Unit",
    "Rot-Attuned Trespasser",
    "Mercy-Adjacent Witness",
    "Unsealed Civilian Asset",
    "Useful Contamination Vector",
    "Archive-Touched Observer",
    "Living Margin Note"
  ];

  const symptomPool = [
    "Pulse cadence already lagging behind personal denial.",
    "Minor spiritual softening detected beneath surface certainty.",
    "Latent fear-response suitable for cultivation.",
    "Clean habits weakening under sustained exposure.",
    "Language beginning to accommodate rot more easily than hope.",
    "Defensive certainty compromised by fascination.",
    "Moral architecture dampening and sloughing at the edges.",
    "Soul-seal thinning in a manner consistent with useful corruption.",
    "Attention repeatedly returning to forbidden sections.",
    "Resistance posture weakening under aesthetic exposure.",
    "Curiosity elevated beyond hygienic thresholds.",
    "Subject appears less repulsed than appropriate."
  ];

  const verdictPool = [
    "Not yet claimed. Mark for observation.",
    "Return to the tally after further decline.",
    "Resistance remains, but no longer impressively.",
    "Suitable only as witness, not yet vessel.",
    "Mercy deferred. Contamination probable.",
    "The archive advises patience. Rot improves all things slowly.",
    "Retain under watch. Collapse pattern promising.",
    "Classification complete. Cleansing not recommended.",
    "Do not purge. The subject has begun to listen.",
    "Seal nothing. Let the exposure mature.",
    "The visitor remains useful precisely because they are uncertain.",
    "Entry permitted. Exit significance doubtful."
  ];

  const containmentResponses = {
    seal: [
      "Bulkheads sealed. The rot answered by blooming within the rivets.",
      "Pressure-locks engaged. Devotional mucus crossed the seam.",
      "Sealant applied. Beneath it, the contamination learned your shape.",
      "Steel accepted the order. Mold accepted the steel.",
      "The breach was sealed from the outside. Something inside began to sing."
    ],
    quarantine: [
      "Quarantine invoked. The spores accepted the perimeter as shelter.",
      "Isolation protocol enacted. The sickness now regards the quarantine as chapel.",
      "Containment cordon raised. The prayers inside began to curdle.",
      "The quarantine held long enough to become meaningful. This was its error.",
      "The perimeter survived. The people within did not remain themselves."
    ],
    purge: [
      "Flame washed the breach. The smoke returned bearing blessings.",
      "Purge sequence completed. The dead blackened, split, and continued breathing.",
      "Cauterization succeeded only in the narrowest technical sense.",
      "The fire performed beautifully. The rot learned from it.",
      "Purge-light passed through the infection and emerged softer."
    ]
  };

  const sealedLines = [
    "ACCESS DENIED. THE DATAVAULT REMAINS CENSURED BY SACRED ROT.",
    "RECORD SEALED. THE WOUND HAS NOT RIPENED.",
    "THE SEPTICARIUM REFUSES PREMATURE REVELATION.",
    "CLEARANCE WITHHELD. THE ARCHIVE IS STILL LISTENING.",
    "OPENING THIS CHAMBER NOW WOULD WASTE THE OMEN."
  ];

  /* -------------------------
     04. STATE
  ------------------------- */

  let containment = {
    purity: 27,
    corruption: 19,
    turns: 0,
    failed: false
  };

  /* -------------------------
     05. ATMOSPHERE GENERATION
  ------------------------- */

  function createSpores() {
    if (!exists(sporeField)) return;

    const existing = sporeField.querySelectorAll(".spore").length;
    if (existing > 0) return;

    const sporeCount = 92;

    for (let i = 0; i < sporeCount; i++) {
      const spore = document.createElement("span");

      spore.classList.add("spore");
      spore.style.left = `${Math.random() * 100}%`;
      spore.style.animationDuration = `${10 + Math.random() * 24}s`;
      spore.style.animationDelay = `${Math.random() * 18}s`;
      spore.style.opacity = `${0.15 + Math.random() * 0.65}`;
      spore.style.transform = `scale(${0.6 + Math.random() * 1.8})`;

      sporeField.appendChild(spore);
    }
  }

  function createMotes() {
    if (!exists(moteField)) return;

    const existing = moteField.querySelectorAll(".mote").length;
    if (existing > 0) return;

    const moteCount = 88;

    for (let i = 0; i < moteCount; i++) {
      const mote = document.createElement("span");

      mote.classList.add("mote");
      mote.style.left = `${Math.random() * 100}%`;
      mote.style.animationDuration = `${9 + Math.random() * 22}s`;
      mote.style.animationDelay = `${Math.random() * 16}s`;
      mote.style.opacity = `${0.14 + Math.random() * 0.58}`;
      mote.style.transform = `scale(${0.65 + Math.random() * 1.45})`;

      moteField.appendChild(mote);
    }
  }

  /* -------------------------
     06. TOASTS
  ------------------------- */

  function showToast(message) {
    if (!exists(toastMessage)) return;

    toastMessage.textContent = message;
    toastMessage.classList.add("show");

    window.setTimeout(() => {
      toastMessage.classList.remove("show");
    }, 2600);
  }

  function initializeSealedButtons() {
    sealedButtons.forEach((button) => {
      if (button.dataset.septicariumBound === "true") return;

      button.dataset.septicariumBound = "true";

      button.addEventListener("click", () => {
        showToast(randomFrom(sealedLines));
      });
    });
  }

  /* -------------------------
     07. LITURGY / SIGIL ENGINE
  ------------------------- */

  function updateLiturgy() {
    if (!exists(liturgyOutput)) return;
    liturgyOutput.textContent = randomFrom(liturgyPool);
  }

  function initializeSigil() {
    if (!exists(sigil)) return;

    sigil.addEventListener("click", () => {
      showToast("XIV LEGION MEMORY-STIR CONFIRMED. THE SEAL RECOGNIZES LIVING FLESH.");
      updateLiturgy();
    });
  }

  /* -------------------------
     08. TRANSMISSION GENERATOR
  ------------------------- */

  function generateTransmission() {
    if (!exists(transmissionOutput)) return;

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

  function initializeTransmissionGenerator() {
    if (!exists(generateTransmissionBtn)) return;

    generateTransmissionBtn.addEventListener("click", generateTransmission);
    generateTransmission();
  }

  /* -------------------------
     09. VISITOR ADJUDICATION
  ------------------------- */

  function adjudicateVisitor() {
    if (!exists(designationText) || !exists(symptomText) || !exists(verdictText)) return;

    designationText.textContent = randomFrom(designationPool);
    symptomText.textContent = randomFrom(symptomPool);
    verdictText.textContent = randomFrom(verdictPool);
  }

  function initializeVisitorAdjudication() {
    if (!exists(adjudicateVisitorBtn)) return;

    adjudicateVisitorBtn.addEventListener("click", adjudicateVisitor);
    adjudicateVisitor();
  }

  /* -------------------------
     10. CONTAINMENT RITUAL
  ------------------------- */

  function updateContainmentUI() {
    const purity = clamp(containment.purity);
    const corruption = clamp(containment.corruption);

    if (exists(purityFill)) purityFill.style.width = `${purity}%`;
    if (exists(corruptionFill)) corruptionFill.style.width = `${corruption}%`;

    if (exists(purityValue)) purityValue.textContent = `${purity}%`;
    if (exists(corruptionValue)) corruptionValue.textContent = `${corruption}%`;
  }

  function setContainmentStatus(text) {
    if (!exists(containmentStatus)) return;
    containmentStatus.textContent = text;
  }

  function failContainment(finalLine) {
    containment.failed = true;
    containment.corruption = 100;

    if (containment.purity > 70) {
      containment.purity = 11;
    }

    updateContainmentUI();

    setContainmentStatus(
      `${finalLine} Containment has failed. It was always going to fail. The rot has accepted your effort as tribute.`
    );

    ritualButtons.forEach((button) => {
      button.disabled = true;
      button.style.opacity = "0.45";
      button.style.cursor = "not-allowed";
    });

    if (exists(restartContainment)) {
      restartContainment.classList.remove("hidden");
    }
  }

  function handleContainmentAction(action) {
    if (containment.failed) return;
    if (!containmentResponses[action]) return;

    containment.turns += 1;

    const purityGain = Math.floor(Math.random() * 10) + 5;
    const corruptionGain = Math.floor(Math.random() * 14) + 12;

    containment.purity = clamp(containment.purity + purityGain);
    containment.corruption = clamp(containment.corruption + corruptionGain);

    const line = randomFrom(containmentResponses[action]);
    setContainmentStatus(line);

    if (containment.turns >= 5 || containment.corruption >= 88) {
      failContainment(line);
      return;
    }

    if (containment.purity >= 82) {
      setContainmentStatus(
        `${line} A moment of stability was observed. The contagion adapted immediately.`
      );

      containment.corruption = clamp(containment.corruption + 10);
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

    setContainmentStatus(
      "Initial rot-signatures detected beneath devotional plating. The system awaits a doomed command."
    );

    if (exists(restartContainment)) {
      restartContainment.classList.add("hidden");
    }

    updateContainmentUI();
  }

  function initializeContainmentRitual() {
    ritualButtons.forEach((button) => {
      button.addEventListener("click", () => {
        handleContainmentAction(button.dataset.action);
      });
    });

    if (exists(restartContainment)) {
      restartContainment.addEventListener("click", resetContainment);
    }

    updateContainmentUI();
  }

  /* -------------------------
     11. HOVER LORE
  ------------------------- */

  function positionHoverLiturgy(event) {
    if (!exists(hoverLiturgy)) return;

    const offset = 18;
    const tooltipWidth = hoverLiturgy.offsetWidth || 340;
    const tooltipHeight = hoverLiturgy.offsetHeight || 140;

    let x = event.clientX + offset;
    let y = event.clientY + offset;

    if (x + tooltipWidth > window.innerWidth - 12) {
      x = event.clientX - tooltipWidth - offset;
    }

    if (y + tooltipHeight > window.innerHeight - 12) {
      y = event.clientY - tooltipHeight - offset;
    }

    hoverLiturgy.style.left = `${x}px`;
    hoverLiturgy.style.top = `${y}px`;
  }

  function initializeHoverLore() {
    if (!exists(hoverLiturgy)) return;

    const loreTargets = $$("[data-lore]");

    loreTargets.forEach((target) => {
      if (target.dataset.hoverBound === "true") return;
      target.dataset.hoverBound = "true";

      target.addEventListener("mouseenter", (event) => {
        hoverLiturgy.textContent = target.dataset.lore || randomFrom(liturgyPool);
        hoverLiturgy.classList.add("show");
        positionHoverLiturgy(event);
      });

      target.addEventListener("mousemove", positionHoverLiturgy);

      target.addEventListener("mouseleave", () => {
        hoverLiturgy.classList.remove("show");
      });
    });
  }

  /* -------------------------
     12. GENERIC SECRET REVEALS
  ------------------------- */

  function initializeSecretReveals() {
    const revealButtons = $$("[data-reveal-target]");

    revealButtons.forEach((button) => {
      if (button.dataset.revealBound === "true") return;
      button.dataset.revealBound = "true";

      button.addEventListener("click", () => {
        const targetSelector = button.dataset.revealTarget;
        const target = $(targetSelector);

        if (!exists(target)) return;

        target.classList.toggle("open");

        if (target.classList.contains("open")) {
          button.textContent = button.dataset.resealText || "Reseal Chamber";
        } else {
          button.textContent = button.dataset.openText || "Unseal Chamber";
        }
      });
    });
  }

  /* -------------------------
     13. GENERIC RANDOM TEXT ENGINE
  ------------------------- */

  const genericWhispers = [
    "Mercy is the wound that teaches.",
    "The blade remembers the hand before the hand remembers the blade.",
    "Do not fear the cut. Fear the moment before it, when he lets you understand.",
    "Those spared by it were not spared.",
    "It hooks more than flesh.",
    "He does not raise it in anger. That is the worst thing.",
    "A weapon is crude until doctrine learns to speak through it.",
    "The edge is curved because straight mercy would be too quick.",
    "No clean death has ever made a useful witness.",
    "The tally did not end. It merely changed bearer."
  ];

  function initializeRandomOutputEngines() {
    const randomButtons = $$("[data-random-output]");

    randomButtons.forEach((button) => {
      if (button.dataset.randomBound === "true") return;
      button.dataset.randomBound = "true";

      button.addEventListener("click", () => {
        const output = $(button.dataset.randomOutput);
        if (!exists(output)) return;

        let pool = genericWhispers;

        if (button.dataset.randomPool === "liturgy") {
          pool = liturgyPool;
        }

        output.textContent = randomFrom(pool);
      });
    });
  }

  /* -------------------------
     14. OPTIONAL VOX DRAWER SUPPORT
     Works only when matching page elements exist.
  ------------------------- */

  const voxButton = $("#voxButton");
  const closeVox = $("#closeVox");
  const voxDrawer = $("#voxDrawer");
  const voxBody = $("#voxBody");

  const voxFragments = [
    {
      tag: "Recovered Vox Leak",
      body: "The archive did not open. It recognized you and became less closed."
    },
    {
      tag: "Deck Murmur",
      body: "Somewhere below the command spine, a bell moved without ringing."
    },
    {
      tag: "Servo-Skull Fragment",
      body: "Observation logged. Visitor resistance diminished by curiosity."
    },
    {
      tag: "Lower Hold Report",
      body: "Spores gathering in disciplined pattern. Possible omen. Possible laughter."
    },
    {
      tag: "Rotfather’s Mercy",
      body: "The vessel does not drift. It remembers direction through corrosion."
    }
  ];

  function renderGenericVox() {
    if (!exists(voxBody)) return;

    voxBody.innerHTML = "";

    const chosen = [...voxFragments].sort(() => 0.5 - Math.random()).slice(0, 3);

    chosen.forEach((fragment) => {
      const div = document.createElement("div");
      div.className = "vox-transmission";
      div.innerHTML = `<span>${fragment.tag}</span><p>${fragment.body}</p>`;
      voxBody.appendChild(div);
    });
  }

  function initializeVoxDrawer() {
    if (!exists(voxButton) || !exists(voxDrawer)) return;

    voxButton.addEventListener("click", () => {
      renderGenericVox();
      voxDrawer.classList.toggle("open");
    });

    if (exists(closeVox)) {
      closeVox.addEventListener("click", () => {
        voxDrawer.classList.remove("open");
      });
    }
  }

  /* -------------------------
     15. INITIALIZATION
  ------------------------- */

  function initializeSepticarium() {
    createSpores();
    createMotes();

    initializeSealedButtons();
    initializeSigil();

    initializeTransmissionGenerator();
    initializeVisitorAdjudication();
    initializeContainmentRitual();

    initializeHoverLore();
    initializeSecretReveals();
    initializeRandomOutputEngines();
    initializeVoxDrawer();

    updateLiturgy();

    if (exists(liturgyOutput)) {
      window.setInterval(updateLiturgy, 6000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSepticarium);
  } else {
    initializeSepticarium();
  }
})();
