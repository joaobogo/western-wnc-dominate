/**
 * Shared anti-spam trap for every lead form.
 *
 * A text field that people never see or reach: it sits off-screen, is hidden
 * from assistive tech, is skipped by Tab and has no visible label text, so
 * nothing about it shows up in the page copy or the prerendered HTML text.
 * Bots that fill every input fill it. When it has a value the form shows its
 * normal success state but stores nothing and fires no conversion events.
 */
export default function Honeypot({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" data-honeypot className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <input
        id={id}
        name="website_url"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
