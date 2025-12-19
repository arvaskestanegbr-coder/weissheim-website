import { useState, type FormEvent } from "react";

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WEB3FORMS_ACCESS_KEY = "fccdc043-113c-450f-bf35-0cd834fa864e"; // <- einsetzen

export default function ContactForm({ open, onOpenChange }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  if (!open) return null;

  const close = () => {
    setStatus("idle");
    onOpenChange(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success === true) {
        setStatus("success");
        form.reset();
        return;
      }

      console.error("Web3Forms Fehler:", data);
      setStatus("error");
    } catch (err) {
      console.error("Netzwerkfehler:", err);
      setStatus("error");
    }
  };

  const isSubmitting = status === "loading";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <button
          onClick={close}
          className="absolute right-4 top-4 text-sm text-slate-400 transition hover:text-slate-600"
          aria-label="Fenster schließen"
          type="button"
        >
          ✕
        </button>

        <h2 className="mb-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Kontakt aufnehmen
        </h2>
        <p className="mb-6 text-sm text-slate-500 sm:text-base">
          Füll kurz das Formular aus und wir melden uns so schnell wie möglich
          bei dir.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-800">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="name"
              type="text"
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
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-800">
              Bestellnummer{" "}
              <span className="text-xs font-normal text-slate-400">(optional)</span>
            </label>
            <input
              name="order_number"
              type="text"
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

          {status === "success" && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              Danke dir! Deine Nachricht ist bei uns angekommen. Wir melden uns
              innerhalb der nächsten 24–48 Stunden.
            </div>
          )}

          {status === "error" && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              Upsi, da ist etwas schiefgelaufen. Bitte versuch es später noch
              einmal.
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
              disabled={isSubmitting}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Wird gesendet …" : "Nachricht senden"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
