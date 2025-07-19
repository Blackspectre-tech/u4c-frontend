declare namespace NodeJS {
  interface ProcessEnv {
    VITE_PROJECTID?: string;
    DEV?: string;
  }
}

interface ImportMeta {
  readonly env: {
    readonly VITE_PROJECTID?: string;
    readonly DEV: boolean;
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly PROD: boolean;
    readonly SSR: boolean;
  };
}

declare global {
  function stickyNav(): void;

  namespace JSX {
    interface IntrinsicElements {
      "w3m-button": any;
      "w3m-network-button": any;
      "w3m-connect-button": any;
      "w3m-account-button": any;
    }
  }
}

export {};
