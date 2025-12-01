import { useState, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Loader2, CheckCircle2 } from "lucide-react";

type ContactFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ContactForm = ({ open, onOpenChange }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setOrderId("");
    setMessage("");
    setError(null);
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "fccdc043-113c-450f-bf35-0cd834fa864e",
          name,
          email,
          subject,
          orderId,
          message,
        }),
      });

      const data = await response.json();

      // Web3Forms schickt success als boolean ODER als "true" (String)
      const success = (data as any).success === true || (data as any).success === "true";

      if (!response.ok || !success) {
        throw new Error((data as any).message || "Unbekannter Fehler");
      }

      // Erfolg: Formular ausblenden, Bestätigung anzeigen
      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setError("Upsi, da ist etwas schiefgelaufen. Bitte versuch es später noch einmal.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {/* Erfolgsscreen */}
        {isSuccess ? (
          <div className="py-10 flex flex-col items-center text-center space-y-6">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <div>
              <DialogTitle className="text-2xl mb-2">
                Danke für deine Nachricht!
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Wir haben deine Anfrage erhalten und melden uns in der Regel
                innerhalb der nächsten <strong>24–48 Stunden</strong> bei dir.
              </DialogDescription>
            </div>
            <Button
              className="mt-4"
              onClick={() => handleOpenChange(false)}
            >
              Fenster schließen
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Kontakt aufnehmen</DialogTitle>
              <DialogDescription>
                Füll kurz das Formular aus und wir melden uns so schnell wie möglich bei dir.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  required
                  placeholder="Dein vollständiger Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  E-Mail <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="deine.email@beispiel.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">
                  Betreff <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  required
                  placeholder="Worum geht es?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderId">
                  Bestellnummer <span className="text-muted-foreground text-xs">(optional)</span>
                </Label>
                <Input
                  id="orderId"
                  placeholder="z.B. 123-4567890-1234567"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Nachricht <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Deine Nachricht an uns…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Mit dem Absenden erklärst du dich mit der Verarbeitung deiner Daten
                gemäß unserer <a href="/datenschutz" className="underline">Datenschutzerklärung</a> einverstanden.
              </p>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-between sm:items-center mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Abbrechen
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Nachricht senden
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
