import {
  DigiHeader,
  DigiHeaderNavigation,
  DigiHeaderNavigationItem,
} from "@digi/arbetsformedlingen-react";

export default function Header() {
  return (
    <DigiHeader
      afSystemName="YobXplorer"
      afHideSystemName={false}
      afMenuButtonText="Meny"
    >
      <a slot="header-logo" aria-label="Designsystemets startsida" href="/"></a>
      <div slot="header-navigation">
        <DigiHeaderNavigation
          afCloseButtonText="Stäng"
          afCloseButtonAriaLabel="Stäng meny"
          afNavAriaLabel="Huvudmeny"
        >
          <DigiHeaderNavigationItem afCurrentPage={true}>
            <a href="about">About</a>
          </DigiHeaderNavigationItem>
          <DigiHeaderNavigationItem>
            <a href="contact">Contact</a>
          </DigiHeaderNavigationItem>
        </DigiHeaderNavigation>
      </div>
    </DigiHeader>
  );
}
