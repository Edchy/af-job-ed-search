declare global {
  namespace JSX {
    interface IntrinsicElements {
      "digi-icon-clock": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {}; // This makes it a module
