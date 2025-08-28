import {
  DigiHeader,
  DigiHeaderNavigation,
  DigiHeaderNavigationItem,
} from "@digi/arbetsformedlingen-react";
import React from "react";
import { Link } from "react-router";
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
            <Link to="/">Hem</Link>
          </DigiHeaderNavigationItem>
          <DigiHeaderNavigationItem>
            <Link to="/utbildningar">Utbildningar</Link>
          </DigiHeaderNavigationItem>
          <DigiHeaderNavigationItem>
            <Link to="/jobb">Jobb</Link>
          </DigiHeaderNavigationItem>
        </DigiHeaderNavigation>
      </div>
    </DigiHeader>
  );
}
