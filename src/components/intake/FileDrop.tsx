import { useRef, useState } from "react";
import { Upload, X, ImageIcon, FileText } from "lucide-react";

type Props = {
  files: File[];
  onChange: (files: File[]) => void;
  accept?: string;
  helper?: string;
  maxFiles?: number;
};

const FileDrop = ({ files, onChange, accept = "image/*", helper, maxFiles = 8 }: Props) => {
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
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border border-dashed rounded-md px-5 py-7 text-center cursor-pointer transition-colors ${
          over ? "border-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.04)]" : "border-border hover:border-foreground/30 bg-background"
        }`}
      >
        <Upload className="w-5 h-5 text-[hsl(var(--highland-gold))] mx-auto mb-2" />
        <p className="text-[13.5px] font-body font-semibold text-foreground/80">
          Drop files or click to upload
        </p>
        {helper && <p className="text-[11.5px] text-foreground/50 mt-1 font-body">{helper}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(e) => add(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-3 bg-background border border-border rounded-md px-3 py-2">
              {f.type.startsWith("image/")
                ? <ImageIcon className="w-4 h-4 text-[hsl(var(--highland-gold))] flex-shrink-0" />
                : <FileText className="w-4 h-4 text-[hsl(var(--highland-gold))] flex-shrink-0" />}
              <span className="text-[12.5px] font-body text-foreground/80 truncate flex-1">{f.name}</span>
              <span className="text-[11px] text-foreground/75 font-body">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
              <button type="button" onClick={(e) => { e.stopPropagation(); remove(i); }} className="text-foreground/75 hover:text-foreground transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileDrop;