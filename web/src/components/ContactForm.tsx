import React, { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "./ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

type ContactFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type SubmitStatus = "idle" | "success" | "error";

const ContactForm: React.FC<ContactFormProps> = ({ open, onOpenChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setStatus("idle");
    setErrorMessage("");
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      access_key: "fccdc043-113c-450f-bf35-0cd834fa864e",
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      order_number: formData.get("orderNumber"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
        form.reset();
      } else {
        console.error("Web3Forms response:", json);
        setStatus("error");
        setErrorMessage(
          "Leider hat das Senden nicht geklappt. Bitte probier es später noch einmal oder schreib uns direkt an info@weissheim.com."
        );
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        "Leider hat das Senden nicht geklappt. Bitte probier es später noch einmal oder schreib uns direkt an info@weissheim.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Wenn nicht geöffnet, rendert die Komponente gar nichts
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-background text-foreground rounded-xl shadow-xl max-w-xl w-full mx-4">
        {status === "success" ? (
          // ✅ Erfolgsansicht mit grünem Haken
          <div className="p-8 flex flex-col items-center text-center gap-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h2 className="text-2xl font-semibold">
              Danke für deine Nachricht!
            </h2>
            <p className="text-muted-foreground">
              Wir haben deine Anfrage erhalten und melden uns in der Regel
              innerhalb von{" "}
              <span className="font-medium text-foreground">
                24–48 Stunden
              </span>{" "}
              bei dir.
            </p>
            <Button className="mt-2" onClick={handleClose}>
              Fenster schließen
            </Button>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  Kontakt aufnehmen
                </h2>
                <p className="text-sm text-muted-foreground">
                  Füll kurz das Formular aus und wir melden uns so schnell wie
                  möglich bei dir.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Schließen"
              >
                ✕
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground"
                >
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Dein vollständiger Name"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  E-Mail *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="deine.email@beispiel.de"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground"
                >
                  Betreff *
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="Worum geht es?"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-medium text-foreground"
                >
                  Bestellnummer{" "}
                  <span className="text-xs text-muted-foreground">
                    (optional)
                  </span>
                </label>
                <input
                  id="orderNumber"
                  name="orderNumber"
                  placeholder="z.B. 123-4567890-1234567"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground"
                >
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Deine Nachricht an uns…"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-y"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Mit dem Absenden erklärst du dich mit der Verarbeitung deiner
                Daten gemäß unserer{" "}
                <a
                  href="/datenschutz"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  Datenschutzerklärung
                </a>{" "}
                einverstanden.
              </p>

              {status === "error" && (
                <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  <XCircle className="w-4 h-4 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-4 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Abbrechen
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Nachricht senden
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
