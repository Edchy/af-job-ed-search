import {
  DigiHeader,
  DigiHeaderNavigation,
  DigiHeaderNavigationItem,
} from "@digi/arbetsformedlingen-react";
// import { Logo } from "./Logo";
export default function Header() {
  return (
    <DigiHeader
      afSystemName="Fanta Zero"
      afHideSystemName={false}
      afMenuButtonText="Meny"
    >
      {/* <Logo height={40} width={40} /> */}
      <div slot="header-navigation">
        <DigiHeaderNavigation
          afCloseButtonText="Stäng"
          afCloseButtonAriaLabel="Stäng meny"
          afNavAriaLabel="Huvudmeny"
        >
          <DigiHeaderNavigationItem>
            <a href="utbildningar">Utbildningar</a>
          </DigiHeaderNavigationItem>
          <DigiHeaderNavigationItem>
            <a href="jobb">Jobb</a>
          </DigiHeaderNavigationItem>
        </DigiHeaderNavigation>
      </div>
    </DigiHeader>
  );
}
