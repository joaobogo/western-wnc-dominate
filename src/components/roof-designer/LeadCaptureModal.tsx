import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, CalendarCheck, Loader2, CheckCircle, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { Link } from "react-router-dom";
import FormConsent from "@/components/FormConsent";
import { syncDesignerLeadToJobTread } from "@/lib/leads";
import { actionableError } from "@/lib/microcopy";

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  designId: string | null;
  resultCanvas: HTMLCanvasElement | null;
}

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(20).optional(),
  town: z.string().trim().max(100).optional(),
  timeline: z.string().optional(),
  gdpr_consent: z.literal(true, { message: "Please agree to continue" }),
});

const LeadCaptureModal = ({ open, onOpenChange, designId, resultCanvas }: LeadCaptureModalProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    town: "",
    timeline: "researching",
    gdpr_consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sessionId = sessionStorage.getItem("roof-session") || "";

  const handleSubmit = async () => {
    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      // Save lead — generate id client-side because anon has no SELECT policy.
      const designerLeadId = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}`;
      const { error } = await supabase.from("designer_leads").insert({
        id: designerLeadId,
        design_id: designId,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        town: form.town.trim() || null,
        timeline: form.timeline,
        gdpr_consent: form.gdpr_consent,
      });
      if (error) throw error;
      syncDesignerLeadToJobTread(designerLeadId);

      // Track metric
      await supabase.from("designer_metrics").insert({
        event_type: "email_submit",
        design_id: designId,
        session_id: sessionId,
        metadata: { timeline: form.timeline },
      });

      setSubmitted(true);
      toast.success("Design saved! Check your email.");
    } catch (err) {
      console.error("Lead capture error:", err);
      toast.error(actionableError(err, "lead"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    if (!resultCanvas) return;
    const link = document.createElement("a");
    link.download = "my-roof-design.jpg";
    link.href = resultCanvas.toDataURL("image/jpeg", 0.9);
    link.click();
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl mb-2">Your Design Is Saved!</DialogTitle>
              <DialogDescription className="text-base">
                Based on your roof style, we recommend:
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-6">
              <Button onClick={handleDownload} variant="outline" className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Preview Image
              </Button>
              <Link to="/consultation" className="block">
                <Button className="w-full gap-2 cta-gradient text-accent-foreground border-0 font-semibold">
                  <CalendarCheck className="w-4 h-4" />
                  Request a Project Consultation
                </Button>
              </Link>
              <Link to="/financing" className="block">
                <Button variant="ghost" className="w-full text-muted-foreground">
                  Explore Financing Options →
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Mail className="w-5 h-5 text-primary" />
            Download Your Roof Design
          </DialogTitle>
          <DialogDescription>
            Enter your info to save and receive your design preview by email.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="lead-name">Name *</Label>
            <Input
              id="lead-name"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead-email">Email *</Label>
            <Input
              id="lead-email"
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="lead-phone">Phone (optional)</Label>
              <Input
                id="lead-phone"
                type="tel"
                placeholder="(828) 555-0123"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-town">Town</Label>
              <Input
                id="lead-town"
                placeholder="Highlands, NC"
                value={form.town}
                onChange={(e) => setForm({ ...form, town: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="f-timeline">Timeline</Label>
            <Select value={form.timeline} onValueChange={(v) => setForm({ ...form, timeline: v })}>
              <SelectTrigger id="f-timeline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">ASAP – I need a roof now</SelectItem>
                <SelectItem value="30_days">Within 30 days</SelectItem>
                <SelectItem value="researching">Just researching</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="gdpr"
              checked={form.gdpr_consent}
              onCheckedChange={(checked) => setForm({ ...form, gdpr_consent: !!checked })}
            />
            <label htmlFor="gdpr" className="text-xs text-muted-foreground leading-snug cursor-pointer">
              I agree to receive my roof design by email and understand my photo will be deleted within 30 days.
            </label>
          </div>
          {errors.gdpr_consent && <p className="text-xs text-destructive">{errors.gdpr_consent}</p>}

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full gap-2 cta-gradient text-accent-foreground border-0 font-semibold"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Download My Roof Design
          </Button>
          <FormConsent className="mt-1" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
