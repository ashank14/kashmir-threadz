export {};

declare global {
  interface Window {
    Paytm: {
      CheckoutJS: {
        init: (config: any) => Promise<void>;
        invoke: () => void;
      };
    };
  }
}
