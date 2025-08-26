import "@digi/arbetsformedlingen/dist/digi-arbetsformedlingen/digi-arbetsformedlingen.css";
import { DigiFooter } from "@digi/arbetsformedlingen-react";
import { DigiFooterCard } from "@digi/arbetsformedlingen-react";
import { FooterCardVariation } from "@digi/arbetsformedlingen";
import { DigiIconAccessibilityUniversal } from "@digi/arbetsformedlingen-react";
import { DigiIconSign } from "@digi/arbetsformedlingen-react";
// import { Link } from "react-router";
import { DigiIconGlobe } from "@digi/arbetsformedlingen-react";
import { DigiIconEnvelope } from "@digi/arbetsformedlingen-react";
import { FooterVariation } from "@digi/arbetsformedlingen";

export const Footer = () => {
  return (
    <>
      <DigiFooter afVariation={FooterVariation.SMALL}>
        <div slot="content-top">
          <div>
            <DigiFooterCard afType={FooterCardVariation.ICON}>
              <ul>
                <li>
                  <a href="#">
                    <DigiIconAccessibilityUniversal></DigiIconAccessibilityUniversal>
                    Tillgänglighetsredogörelse
                  </a>
                </li>
                <li>
                  <a href="#">
                    <DigiIconSign></DigiIconSign>
                    Teckenspråk
                  </a>
                </li>
                <li>
                  <a href="#">
                    <DigiIconGlobe></DigiIconGlobe>
                    Other languages
                  </a>
                </li>
                <li>
                  <a href="#">
                    <DigiIconEnvelope></DigiIconEnvelope>
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
                Systemversion: 1.4.0 <br /> Ansvarig: Jenny Svensson
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

        </DigiFooter>
      </footer>

        </div>
        <div slot="content-bottom-left">
          <Link to="/">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20 0C27.4768 0 31.2154 -0.000204921 34 1.60742C35.8242 2.66064 37.3394 4.17577 38.3926 6C40.0002 8.7846 40 12.5232 40 20C40 27.4768 40.0002 31.2154 38.3926 34C37.3394 35.8242 35.8242 37.3394 34 38.3926C31.2154 40.0002 27.4768 40 20 40C12.5232 40 8.7846 40.0002 6 38.3926C4.17577 37.3394 2.66064 35.8242 1.60742 34C-0.000204921 31.2154 0 27.4768 0 20C0 12.5232 -0.000204921 8.7846 1.60742 6C2.66064 4.17577 4.17577 2.66064 6 1.60742C8.7846 -0.000204921 12.5232 0 20 0ZM22 4C13.1634 4 6 11.1634 6 20C6 28.8366 13.1634 36 22 36C30.8366 36 38 28.8366 38 20C38 11.1634 30.8366 4 22 4Z"
                fill="#FF4D00"
              ></path>
              <path
                d="M36 20C36 25.5228 31.5228 30 26 30C20.4772 30 16 25.5228 16 20C16 14.4772 20.4772 10 26 10C31.5228 10 36 14.4772 36 20Z"
                fill="#FF4D00"
              ></path>
            </svg>
          </Link>
        </div>
        <div slot="content-bottom-right">
          <p>Följ oss på</p>
          <a href="#">Facebook</a>
          <a href="#">Youtube</a>
          <a href="#">Linkedin</a>
          <a href="#">Instagram</a>
        </div>
      </DigiFooter>

    </>
  );
};
