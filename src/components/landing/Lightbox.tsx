import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProofItem } from "./config";

/**
 * Accessible, dismissible photo lightbox. Radix supplies the focus trap, Esc to
 * close, scroll lock and return-focus; arrow keys move between photos. It never
 * navigates away from the landing page.
 */
export default function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: ProofItem[];
  index: number | null;
  onIndexChange: (next: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;
  const item = index !== null ? items[index] : null;

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onIndexChange((index + 1) % items.length);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onIndexChange]);

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-foreground/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[91] w-[min(94vw,1100px)] -translate-x-1/2 -translate-y-1/2 outline-none"
          aria-describedby={undefined}
        >
          {item && (
            <figure className="overflow-hidden rounded-sm bg-card shadow-2xl">
              <Dialog.Title className="sr-only">{item.title}</Dialog.Title>
              <img
                src={item.image.src}
                srcSet={item.image.srcSet}
                sizes="(min-width: 1100px) 1100px, 94vw"
                alt={item.image.alt}
                className="max-h-[78vh] w-full bg-secondary object-contain"
              />
              <figcaption className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <div className="font-heading text-lg font-bold text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.detail}</div>
                </div>
                {items.length > 1 && (
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => onIndexChange((index! - 1 + items.length) % items.length)}
                      className="flex h-12 w-12 items-center justify-center rounded-sm border border-border hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onIndexChange((index! + 1) % items.length)}
                      className="flex h-12 w-12 items-center justify-center rounded-sm border border-border hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </figcaption>
            </figure>
          )}
          <Dialog.Close
            className="absolute -top-3 right-0 flex h-12 w-12 -translate-y-full items-center justify-center rounded-full bg-background text-foreground shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:-right-3"
            aria-label="Close photo viewer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
