import { useRef, useState } from "react";
import { Upload, X, ImageIcon, FileText } from "lucide-react";

type Props = {
  files: File[];
  onChange: (files: File[]) => void;
  accept?: string;
  helper?: string;
  maxFiles?: number;
  /** id of the visible label describing this upload area. */
  labelledBy?: string;
};

const FileDrop = ({ files, onChange, accept = "image/*", helper, maxFiles = 8, labelledBy }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const add = (incoming: FileList | null) => {
    if (!incoming) return;
    const merged = [...files, ...Array.from(incoming)].slice(0, maxFiles);
    onChange(merged);
  };
  const remove = (idx: number) => onChange(files.filter((_, i) => i !== idx));

  return (
    <div>
      <button
        type="button"
        aria-labelledby={labelledBy}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`w-full border border-dashed rounded-md px-5 py-7 text-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highland-gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          over ? "border-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.04)]" : "border-border hover:border-foreground/30 bg-background"
        }`}
      >
        <Upload className="w-4 h-4 text-[hsl(var(--gold-ink))] mx-auto mb-2" aria-hidden="true" >
        <p className="text-body-xs font-body font-semibold text-foreground/80">
          Drop files or click to upload
        </p>
        {helper && <p className="text-caption text-muted-foreground mt-1 font-body">{helper}</p>}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        onChange={(e) => add(e.target.files)}
      />

      {files.length > 0 && (
        <ul className="mt-3 space-y-2" aria-live="polite">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-3 bg-background border border-border rounded-md px-3 py-2">
              {f.type.startsWith("image/")
                ? <ImageIcon className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0" aria-hidden="true" >
                : <FileText className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0" aria-hidden="true" >}
              <span className="text-body-xs font-body text-foreground/80 truncate flex-1">{f.name}</span>
              <span className="text-caption text-muted-foreground font-body">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                onClick={(e) => { e.stopPropagation(); remove(i); }}
                className="min-h-11 min-w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" >
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileDrop;