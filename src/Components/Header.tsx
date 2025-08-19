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
          <DigiHeaderNavigationItem afCurrentPage={true}>
            <a href="education">Education</a>
          </DigiHeaderNavigationItem>
          <DigiHeaderNavigationItem>
            <a href="contact">Contact</a>
          </DigiHeaderNavigationItem>
        </DigiHeaderNavigation>
      </div>
    </DigiHeader>
  );
}
