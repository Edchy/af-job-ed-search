import "@digi/arbetsformedlingen/dist/digi-arbetsformedlingen/digi-arbetsformedlingen.css";
import {
  DigiFooter,
  DigiFooterCard,
  DigiIconAccessibilityUniversal,
  DigiIconSign,
  DigiIconGlobe,
  DigiIconEnvelope,
} from "@digi/arbetsformedlingen-react";
import { FooterCardVariation, FooterVariation } from "@digi/arbetsformedlingen";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <DigiFooter afVariation={FooterVariation.SMALL}>
      {/* Top content slot */}
      <div slot="content-top">
        <div>
          <DigiFooterCard afType={FooterCardVariation.ICON}>
            <ul>
              <li>
                <a href="#">
                  <DigiIconAccessibilityUniversal />
                  Tillgänglighetsredogörelse
                </a>
              </li>
              <li>
                <a href="#">
                  <DigiIconSign />
                  Teckenspråk
                </a>
              </li>
              <li>
                <a href="#">
                  <DigiIconGlobe />
                  Other languages
                </a>
              </li>
              <li>
                <a href="#">
                  <DigiIconEnvelope />
                  Mejla vår funktionbrevlåda
                </a>
              </li>
            </ul>
          </DigiFooterCard>
        </div>
        <div>
          <DigiFooterCard afType={FooterCardVariation.BORDER}>
            <a href="#">Om tjänsten dolores</a>
            <p>
              Systemversion: 1.4.0 <br /> Ansvarig: CJ
            </p>
          </DigiFooterCard>
        </div>
        <div>
          <DigiFooterCard afType={FooterCardVariation.BORDER}>
            <a href="#">Kontakta servicdolores</a>
            <p>
              Telefon: 0771-60 0001 <br /> Öppettider: Vardagar 08:00-16:30
            </p>
          </DigiFooterCard>
        </div>
      </div>

      {/* Bottom right slot */}
      <div slot="content-bottom-right">
        <p>Följ oss på</p>
        <a href="#">Facebook</a>
        <a href="#">Youtube</a>
        <a href="#">Linkedin</a>
        <a href="#">Instagram</a>
      </div>
    </DigiFooter>
  );
}
