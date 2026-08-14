"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FormSuccess, SelectField, TextField } from "./Field";
import { submitSampleLead } from "@/lib/services/leads";
import { products } from "@/data/products";
import type { SampleLead } from "@/types";

const businessTypes = ["Distributor", "Retailer", "Temple", "Institution", "Event organiser", "Farm / Nursery", "Exporter", "Other"];

const empty: SampleLead = {
  name: "",
  company: "",
  phone: "",
  email: "",
  product: "",
  businessType: "",
  expectedQuantity: "",
  pincode: "",
};

export function SampleRequestModal({
  open,
  onClose,
  presetProduct,
}: {
  open: boolean;
  onClose: () => void;
  presetProduct?: string;
}) {
  const [lead, setLead] = useState<SampleLead>({ ...empty, product: presetProduct ?? "" });
  const [errors, setErrors] = useState<Partial<Record<keyof SampleLead, string>>>({});
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const set = <K extends keyof SampleLead>(key: K, value: SampleLead[K]) =>
    setLead((current) => ({ ...current, [key]: value }));

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Partial<Record<keyof SampleLead, string>> = {};
    if (lead.name.trim().length < 2) next.name = "Name is required.";
    if (!/^[0-9+\-\s()]{8,15}$/.test(lead.phone)) next.phone = "Enter a reachable phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) next.email = "Enter a valid email address.";
    if (!lead.product) next.product = "Which product should we send?";
    if (!/^\d{6}$/.test(lead.pincode)) next.pincode = "Enter a 6-digit pincode.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setBusy(true);
    const response = await submitSampleLead(lead);
    setBusy(false);
    setReference(response.reference);
  }

  return (
    <Modal open={open} onClose={onClose} title="Request a sample">
      {reference ? (
        <FormSuccess
          title="Sample request received"
          copy="We'll confirm availability and courier timeline on WhatsApp, and share the slab pricing for the quantity you mentioned."
          reference={reference}
          onReset={() => {
            setLead(empty);
            setReference(null);
          }}
          resetLabel="Request another sample"
        />
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <p className="text-sm text-mitti-600">
            Samples are for buyers evaluating volume supply. Tell us what to send and where.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Name" required value={lead.name} onChange={(e) => set("name", e.target.value)} error={errors.name} />
            <TextField label="Company" value={lead.company} onChange={(e) => set("company", e.target.value)} />
            <TextField label="Phone" required type="tel" value={lead.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} />
            <TextField label="Email" required type="email" value={lead.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
          </div>
          <SelectField
            label="Product"
            required
            options={products.filter((p) => p.bulkAvailable).map((p) => p.name)}
            value={lead.product}
            onChange={(e) => set("product", e.target.value)}
            error={errors.product}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Business type"
              options={businessTypes}
              value={lead.businessType}
              onChange={(e) => set("businessType", e.target.value)}
            />
            <TextField
              label="Expected quantity"
              value={lead.expectedQuantity}
              onChange={(e) => set("expectedQuantity", e.target.value)}
              placeholder="e.g. 5,000 pcs / month"
            />
          </div>
          <TextField
            label="Delivery pincode"
            required
            inputMode="numeric"
            value={lead.pincode}
            onChange={(e) => set("pincode", e.target.value)}
            error={errors.pincode}
          />
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Sending…" : "Request sample"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
