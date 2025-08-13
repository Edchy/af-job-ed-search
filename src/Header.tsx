import { DigiHeader } from "@digi/arbetsformedlingen-react";

export default function Header() {
  return (
    <DigiHeader
      afSystemName="Typ AF eller nåt"
      afHideSystemName={true}
      afMenuButtonText="Meny"
    ></DigiHeader>
  );
}
