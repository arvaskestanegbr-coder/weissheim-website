import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { trackContactSubmit } from "../lib/analytics";

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const LAST_SUBMIT_STORAGE_KEY = "weissheim_contact_last_submit_at";
const SUBMIT_COOLDOWN_MS = 30_000;
const MIN_OPEN_DURATION_MS = 1_200;

export default function ContactForm({ open, onOpenChange }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const openedAtRef = useRef<number>(0);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const hasAccessKey =
    typeof WEB3FORMS_ACCESS_KEY === "string" && WEB3FORMS_ACCESS_KEY.trim() !== "";

  const close = useCallback(() => {
    setStatus("idle");
    setErrorMessage("");
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    openedAtRef.current = Date.now();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 10);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [close, open]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!hasAccessKey) {
      setStatus("error");
      setErrorMessage(
        "Das Formular ist aktuell nicht aktiv. Bitte schreibe uns direkt an info@weissheim.com.",
      );
      trackContactSubmit("error");
      return;
    }

    if (Date.now() - openedAtRef.current < MIN_OPEN_DURATION_MS) {
      setStatus("error");
      setErrorMessage("Bitte prüfe kurz deine Angaben und versuche es erneut.");
      trackContactSubmit("error");
      return;
    }

    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = String(formData.get("company_name") ?? "").trim();

    if (honeypot.length > 0) {
      form.reset();
      setStatus("success");
      trackContactSubmit("success");
      return;
    }

    try {
      const lastSubmitAt = Number(localStorage.getItem(LAST_SUBMIT_STORAGE_KEY) ?? "0");
      if (Date.now() - lastSubmitAt < SUBMIT_COOLDOWN_MS) {
        setStatus("error");
        setErrorMessage("Bitte warte kurz und versuche es in 30 Sekunden erneut.");
        trackContactSubmit("error");
        return;
      }
    } catch (error) {
      console.error("LocalStorage nicht verfügbar:", error);
    }

    formData.set("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success === true) {
        setStatus("success");
        try {
          localStorage.setItem(LAST_SUBMIT_STORAGE_KEY, String(Date.now()));
        } catch (error) {
          console.error("LocalStorage nicht verfügbar:", error);
        }
        form.reset();
        trackContactSubmit("success");
        return;
      }

      console.error("Web3Forms Fehler:", data);
      setStatus("error");
      setErrorMessage(
        typeof data?.message === "string"
          ? data.message
          : "Upsi, da ist etwas schiefgelaufen. Bitte versuch es später noch einmal.",
      );
      trackContactSubmit("error");
    } catch (error) {
      console.error("Netzwerkfehler:", error);
      setStatus("error");
      setErrorMessage("Netzwerkfehler. Bitte versuch es in ein paar Minuten erneut.");
      trackContactSubmit("error");
    }
  };

  const isSubmitting = status === "loading";
  const disableSubmit = isSubmitting || !hasAccessKey;

  if (!open) return null;

  const handleBackdropKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      close();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      onKeyDown={handleBackdropKeyDown}
      aria-hidden={!open}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-form-title"
        aria-describedby="contact-form-description"
        className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl sm:p-8"
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 text-sm text-slate-400 transition hover:text-slate-600"
          aria-label="Fenster schließen"
          type="button"
        >
          ✕
        </button>

        <h2 id="contact-form-title" className="mb-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Kontakt aufnehmen
        </h2>
        <p id="contact-form-description" className="mb-6 text-sm text-slate-500 sm:text-base">
          Füll kurz das Formular aus und wir melden uns so schnell wie möglich bei dir.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-800">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              ref={firstInputRef}
              name="name"
              type="text"
              autoComplete="name"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-800">
              E-Mail <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-800">
              Betreff <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="subject"
              type="text"
              autoComplete="off"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-800">
              Bestellnummer <span className="text-xs font-normal text-slate-400">(optional)</span>
            </label>
            <input
              name="order_number"
              type="text"
              autoComplete="off"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-800">
              Nachricht <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              name="message"
              rows={4}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input type="hidden" name="from" value="Kontaktformular weissheim.com" />
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company_name">Firmenname</label>
            <input
              id="company_name"
              name="company_name"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {status === "success" && (
            <div
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
              aria-live="polite"
            >
              Danke dir! Deine Nachricht ist bei uns angekommen. Wir melden uns innerhalb der
              nächsten 24–48 Stunden.
            </div>
          )}

          {status === "error" && (
            <div
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
              aria-live="assertive"
            >
              {errorMessage ||
                "Upsi, da ist etwas schiefgelaufen. Bitte versuch es später noch einmal."}
            </div>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={close}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={disableSubmit}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Wird gesendet …" : "Nachricht senden"}
            </button>
          </div>

          {!hasAccessKey && (
            <p className="text-xs text-slate-500">
              Formular derzeit deaktiviert. Schreib uns bitte direkt an{" "}
              <a className="underline" href="mailto:info@weissheim.com">
                info@weissheim.com
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
