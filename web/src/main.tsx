import "./kontakt-startseite";
import { trackAmazonClick } from "./lib/analytics";

for (const link of document.querySelectorAll<HTMLAnchorElement>("[data-amazon-klick]")) {
  link.addEventListener("click", () => trackAmazonClick(link.dataset.amazonKlick!));
}
