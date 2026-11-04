export {};

declare global {
  interface Window {
    __portfolioShaderReady?: boolean;
    __portfolioReady?: boolean;
    __portfolioCursorReady?: boolean;
  }
}
