import React, { useState } from "react";
import { Button } from "./ui/button";

type ContactFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ open, onOpenChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    // Web3Forms Access Key
    formData.append("access_key", "fccdc043-113c-450f-bf35-0cd834fa864e");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (json.success) {
        setStatus("success");
        event.currentTarget.reset();
      } else {
        console.error("Web3Forms error:", json);
        setStatus("error");
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-background text-foreground rounded-xl shadow-2xl max-w-2xl w-full mx-4 md:mx-0 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Kontakt aufnehmen
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Füll kurz das Formular aus und wir melden uns so schnell wie
              möglich bei dir.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground text-xl leading-none"
            aria-label="Dialog schließen"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Dein vollständiger Name"
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* E-Mail */}
          <div>
            <label className="block text-sm font-medium mb-1">
              E-Mail <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="deine.email@beispiel.com"
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Betreff */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Betreff <span className="text-red-500">*</span>
            </label>
            <input
              name="subject"
              type="text"
              required
              placeholder="Worum geht es?"
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Bestellnummer (optional) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Bestellnummer <span className="text-xs text-muted-foreground">(optional)</span>
            </label>
            <input
              name="order_number"
              type="text"
              placeholder="z. B. 123-4567890-1234567"
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Nachricht */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nachricht <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Deine Nachricht an uns..."
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Hinweis + Status */}
          <p className="text-xs text-muted-foreground">
            Mit dem Absenden erklärst du dich mit der Verarbeitung deiner Daten
            gemäß unserer Datenschutzerklärung einverstanden.
          </p>

          {status === "success" && (
            <p className="text-sm text-emerald-500">
              Danke dir! Deine Nachricht wurde erfolgreich gesendet.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-500">
              Upsi, da ist etwas schiefgelaufen. Bitte versuch es später noch
              einmal.
            </p>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full md:w-auto"
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
