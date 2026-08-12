/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

// vite-imagetools transforms: `import x from "./a.webp?format=avif"`
declare module "*?format=avif" {
  const src: string;
  export default src;
}
declare module "*?format=webp" {
  const src: string;
  export default src;
}
