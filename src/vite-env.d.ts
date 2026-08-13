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

// Responsive srcset transforms: `import x from "./a.webp?w=640;1024&format=avif&as=srcset"`
declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}
