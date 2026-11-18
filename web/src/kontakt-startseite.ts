import markup from "./kontakt-dialog.html?raw";
import { trackContactOpen, trackContactSubmit } from "./lib/analytics";

const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
const SUBMIT_COOLDOWN_MS = 30_000;
const REQUEST_TIMEOUT_MS = 15_000;

function initKontakt() {
  const links = document.querySelectorAll<HTMLAnchorElement>("[data-kontakt-oeffnen]");
  const dialog = document.createElement("dialog");
  if (!links.length || !accessKey || typeof dialog.showModal !== "function") return;

  dialog.id = "kontakt-dialog";
  dialog.className = "kundendialog";
  dialog.setAttribute("aria-labelledby", "anfrage-titel");
  dialog.setAttribute("data-lenis-prevent", "");
  dialog.innerHTML = markup;
  document.body.append(dialog);

  const form = dialog.querySelector("form")!;
  const review = dialog.querySelector<HTMLElement>(".kundendialog__vorschau")!;
  const status = dialog.querySelector<HTMLElement>('[role="status"]')!;
  const send = dialog.querySelector<HTMLButtonElement>("[data-senden]")!;
  const edit = dialog.querySelector<HTMLButtonElement>("[data-bearbeiten]")!;
  const scrollArea = dialog.querySelector<HTMLElement>(".kundendialog__inhalt")!;
  const values = review.querySelectorAll<HTMLElement>("[data-wert]");
  let opener: HTMLAnchorElement | null = null;
  let openedAt = 0;
  let lastSent = 0;
  let inFlight = false;
  let session = 0;
  let startedOutside = false;

  function resetForm() {
    form.reset();
    for (const input of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]")) {
      input.setCustomValidity("");
    }
    for (const value of values) value.textContent = "";
    form.hidden = false;
    review.hidden = true;
    status.hidden = true;
    status.textContent = "";
    send.disabled = false;
    edit.disabled = false;
    send.textContent = "Nachricht senden";
    scrollArea.scrollTop = 0;
  }

  function open(link: HTMLAnchorElement) {
    if (dialog.open) return;
    resetForm();
    session++;
    opener = link;
    startedOutside = false;
    openedAt = Date.now();
    dialog.showModal();
    trackContactOpen(link.closest("header") ? "header" : "kontakt");
  }

  for (const link of links) {
    link.setAttribute("aria-haspopup", "dialog");
    link.setAttribute("aria-controls", dialog.id);
    link.addEventListener("click", event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      open(link);
    });
  }

  function outside(event: MouseEvent) {
    if (event.target !== dialog) return false;
    const box = dialog.getBoundingClientRect();
    return event.clientX < box.left || event.clientX >= box.right || event.clientY < box.top || event.clientY >= box.bottom;
  }

  dialog.addEventListener("pointerdown", event => {
    startedOutside = event.isPrimary && event.button === 0 && outside(event);
  });
  dialog.addEventListener("pointercancel", () => { startedOutside = false; });
  dialog.addEventListener("click", event => {
    if (startedOutside && outside(event)) dialog.close();
    startedOutside = false;
  });
  dialog.querySelector(".kundendialog__schliessen")!.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    if (dialog.open) return;
    resetForm();
    opener?.focus({ preventScroll: true });
    opener = null;
  });

  form.addEventListener("input", event => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) event.target.setCustomValidity("");
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    for (const field of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[required], textarea[required]")) {
      if (!field.value.trim()) {
        field.setCustomValidity("Bitte fülle dieses Feld aus.");
        field.reportValidity();
        return;
      }
    }
    const data = new FormData(form);
    for (const value of values) {
      const text = String(data.get(value.dataset.wert!) ?? "").trim();
      value.textContent = text;
      value.parentElement!.hidden = !text;
    }
    status.hidden = true;
    form.hidden = true;
    review.hidden = false;
    scrollArea.scrollTop = 0;
    review.querySelector("h3")!.focus();
  });

  edit.addEventListener("click", () => {
    review.hidden = true;
    status.hidden = true;
    form.hidden = false;
    form.querySelector("input")!.focus();
  });

  function notify(message: string) {
    status.hidden = false;
    status.textContent = message;
    status.focus();
  }

  send.addEventListener("click", async () => {
    if (review.hidden) return;
    if (inFlight) {
      notify("Deine vorherige Anfrage wird noch gesendet. Bitte warte einen Moment.");
      return;
    }
    if (Date.now() - lastSent < SUBMIT_COOLDOWN_MS) {
      notify("Bitte warte einen Moment, bevor du eine weitere Nachricht sendest.");
      return;
    }
    if (Date.now() - openedAt < 1200) {
      notify("Bitte prüfe deine Angaben und sende die Nachricht anschließend.");
      return;
    }
    const data = new FormData(form);
    for (const [key, value] of data.entries()) if (typeof value === "string") data.set(key, value.trim());
    data.set("subject", "WEISSHEIM · " + data.get("subject"));
    data.set("access_key", accessKey);
    const activeSession = session;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    send.disabled = edit.disabled = inFlight = true;
    send.textContent = "Wird gesendet …";
    status.hidden = true;
    try {
      if (!data.get("company_name")) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST", body: data, signal: controller.signal, credentials: "omit",
        });
        if (!response.ok || (await response.json()).success !== true) throw new Error("Versand unbestätigt");
      }
      lastSent = Date.now();
      trackContactSubmit("success");
      if (session === activeSession && dialog.open) {
        form.reset();
        review.hidden = true;
        notify("Danke! Deine Nachricht wurde gesendet. Wir antworten dir per E-Mail.");
      }
    } catch {
      trackContactSubmit("error");
      if (session === activeSession && dialog.open) {
        notify("Wir konnten den Versand nicht bestätigen. Deine Angaben sind noch da. Du kannst sie direkt per E-Mail an uns schicken.");
      }
    } finally {
      window.clearTimeout(timeout);
      inFlight = false;
      send.disabled = edit.disabled = false;
      send.textContent = "Nachricht senden";
    }
  });

  function openFromHash() {
    if (location.hash === "#kontakt") open(document.querySelector<HTMLAnchorElement>("#kontakt [data-kontakt-oeffnen]") ?? links[0]);
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();
}

initKontakt();
