"use strict";

(function initializeCatFactPanel() {
  const panel = document.querySelector("cat-fact-panel");
  const modeButton = document.querySelector("#cat-fact-mode");
  if (!panel || !modeButton) return;

  const preferenceKey = "hw5-cat-fact-panel-mode";
  let savedMode = "expanded";
  try {
    const storedMode = localStorage.getItem(preferenceKey);
    if (storedMode === "compact" || storedMode === "expanded") savedMode = storedMode;
  } catch (error) {
    // The default works when browser storage is unavailable.
  }
  if (savedMode === "compact") panel.setAttribute("compact", "");

  class CatFactPanel extends HTMLElement {
    static get observedAttributes() { return ["compact"]; }

    connectedCallback() {
      if (this.dataset.initialized === "true") return;
      this.dataset.initialized = "true";
      this.samples = [
        { fact: "A cat's nose print is unique, much like a human fingerprint.", detail: "Sample fact 1 of 3" },
        { fact: "Most cats have five toes on their front paws and four on their back paws.", detail: "Sample fact 2 of 3" },
        { fact: "A group of cats is sometimes called a clowder.", detail: "Sample fact 3 of 3" }
      ];
      this.sampleIndex = 0;

      const card = document.createElement("div");
      card.className = "cat-fact-card";
      const heading = document.createElement("h3");
      heading.textContent = "Cat facts";
      this.factText = document.createElement("p");
      this.factText.className = "cat-fact-text";
      this.detail = document.createElement("p");
      this.detail.className = "cat-fact-detail";
      const controls = document.createElement("div");
      controls.className = "cat-fact-controls";
      const sampleButton = document.createElement("button");
      sampleButton.type = "button";
      sampleButton.textContent = "Show next sample fact";
      this.liveButton = document.createElement("button");
      this.liveButton.type = "button";
      this.liveButton.textContent = "Get a live cat fact";
      this.status = document.createElement("p");
      this.status.className = "cat-fact-status";
      this.status.setAttribute("role", "status");
      this.status.setAttribute("aria-live", "polite");

      controls.append(sampleButton, this.liveButton);
      card.append(heading, this.factText, this.detail, controls, this.status);
      this.replaceChildren(card);
      sampleButton.addEventListener("click", () => this.showSample());
      this.liveButton.addEventListener("click", () => this.loadLiveFact());
      this.showSample();
      this.applyCompactState();
    }

    attributeChangedCallback() {
      this.applyCompactState();
    }

    applyCompactState() {
      if (!this.detail) return;
      this.detail.hidden = this.hasAttribute("compact");
      this.classList.toggle("is-compact", this.hasAttribute("compact"));
    }

    showSample() {
      const sample = this.samples[this.sampleIndex];
      this.factText.textContent = sample.fact;
      this.detail.textContent = sample.detail;
      this.status.textContent = `Showing ${sample.detail.toLowerCase()}.`;
      this.sampleIndex = (this.sampleIndex + 1) % this.samples.length;
    }

    async loadLiveFact() {
      this.liveButton.disabled = true;
      this.status.textContent = "Loading a cat fact…";
      try {
        const response = await fetch("https://catfact.ninja/fact", {
          method: "GET",
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        const data = await response.json();
        if (typeof data?.fact !== "string" || data.fact.trim() === "") {
          throw new Error("The API response did not include a cat fact.");
        }
        this.factText.textContent = data.fact;
        this.detail.textContent = "Live fact from Cat Fact API";
        this.status.textContent = "A new cat fact has loaded.";
      } catch (error) {
        this.status.textContent = "Could not load a live cat fact. Check your connection and try again.";
      } finally {
        this.liveButton.disabled = false;
      }
    }
  }

  customElements.define("cat-fact-panel", CatFactPanel);

  function updateModeControl() {
    const compact = panel.hasAttribute("compact");
    modeButton.setAttribute("aria-pressed", String(compact));
    modeButton.textContent = compact ? "Use expanded view" : "Use compact view";
  }
  modeButton.addEventListener("click", function () {
    panel.toggleAttribute("compact");
    updateModeControl();
    try {
      localStorage.setItem(preferenceKey, panel.hasAttribute("compact") ? "compact" : "expanded");
    } catch (error) {
      // Keep the chosen mode active for this page if saving fails.
    }
  });
  updateModeControl();
}());
