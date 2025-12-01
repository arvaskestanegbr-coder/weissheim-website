import type { FormEvent } from "react";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Loader2, CheckCircle2, XCircle, X } from "lucide-react";

type ContactFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ open, onOpenChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Web3Forms Access Key
    formData.set("access_key", "fccdc043-113c-450f-bf35-0cd834fa864e");
    // optionale Zusatzinfos
    formData.set("from_name", "WEISSHEIM Kontaktformular");
    formData.set("subject", "Neue Anfrage über weissheim.com");

    const object = Object.fromEntries(formData.entries());
    const jsonBody = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: jsonBody,
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        // ignorieren, falls mal kein JSON zurückkommt
      }

      if (response.ok) {
        // ✅ erfolgreich
        setIsSuccess(true);
        setError(null);
        form.reset();
      } else {
        const message =
          result?.message ??
          "Es ist ein Fehler aufgetreten. Bitte versuch es später noch einmal.";
        setError(message);
        setIsSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setError(
        "Es ist ein Fehler aufgetreten. Bitte versuch es später noch einmal."
      );
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError(null);
    setIsSubmitting(false);
    formRef.current?.reset();
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-background p-6 shadow-xl md:p-8">
        {/* Close-Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted"
          aria-label="Dialog schließen"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 space-y-2 pr-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Kontakt aufnehmen
          </h2>
          <p className="text-sm text-muted-foreground">
            Füll kurz das Formular aus und wir melden uns so schnell wie möglich
            bei dir.
          </p>
        </div>

        {/* Erfolg */}
        {isSuccess && (
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
            <div>
              <p className="font-semibold">Danke für deine Nachricht!</p>
              <p>
                Wir haben deine Anfrage erhalten und melden uns innerhalb der
                nächsten 24–48 Stunden bei dir.
              </p>
            </div>
          </div>
        )}

        {/* Fehler */}
        {error && !isSuccess && (
          <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900">
            <XCircle className="mt-0.5 h-5 w-5 text-red-500" />
            <div>
              <p className="font-semibold">Upsi, da ist etwas schiefgelaufen.</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Name *
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Dein vollständiger Name"
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
          </div>

          {/* E-Mail */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              E-Mail *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="deine.email@beispiel.com"
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
          </div>

          {/* Betreff */}
          <div className="space-y-1.5">
            <label
              htmlFor="topic"
              className="text-sm font-medium text-foreground"
            >
              Betreff *
            </label>
            <input
              id="topic"
              name="topic"
              required
              placeholder="Worum geht es?"
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
          </div>

          {/* Bestellnummer */}
          <div className="space-y-1.5">
            <label
              htmlFor="order"
              className="text-sm font-medium text-foreground"
            >
              Bestellnummer <span className="text-xs text-muted-foreground">(optional)</span>
            </label>
            <input
              id="order"
              name="order_number"
              placeholder="z.B. 123-4567890-1234567"
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
          </div>

          {/* Nachricht */}
          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="text-sm font-medium text-foreground"
            >
              Nachricht *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Deine Nachricht an uns…"
              disabled={isSubmitting}
              className="mt-1 block w-full resize-y rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Mit dem Absenden erklärst du dich mit der Verarbeitung deiner Daten
            gemäß unserer Datenschutzerklärung einverstanden.
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[180px]"
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting
                ? "Wird gesendet…"
                : isSuccess
                ? "Nachricht gesendet"
                : "Nachricht senden"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
