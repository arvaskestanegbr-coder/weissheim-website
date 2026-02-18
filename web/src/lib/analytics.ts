type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: string, event: string, params?: AnalyticsPayload) => void;
  }
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;

  const detail = {
    event,
    ...payload,
    timestamp: new Date().toISOString(),
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(detail);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }

  window.dispatchEvent(new CustomEvent("weissheim:analytics", { detail }));
}

export function trackAmazonClick(source: string): void {
  trackEvent("amazon_click", { source });
}

export function trackContactOpen(source: string): void {
  trackEvent("contact_open", { source });
}

export function trackContactSubmit(status: "success" | "error"): void {
  trackEvent("contact_submit", { status });
}

export function trackTestsiegerClick(source: string): void {
  trackEvent("testsieger_click", { source });
}
