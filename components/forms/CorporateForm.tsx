"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChoiceGroup, FormSuccess, SelectField, TextArea, TextField } from "./Field";
import { submitCorporateLead } from "@/lib/services/leads";
import type { CorporateLead } from "@/types";

export const quantityBands = ["50–100", "101–250", "251–500", "501–1,000", "1,000–5,000", "5,000+"];
const budgets = ["Under ₹500", "₹500–₹1,000", "₹1,000–₹2,000", "₹2,000–₹5,000", "Above ₹5,000"];
const giftingTypes = [
  "Diwali boxes",
  "Employee gifts",
  "Client gifts",
  "Event gifts",
  "Wedding gifts",
  "Spiritual gift sets",
  "Eco-conscious gifts",
];

const empty: CorporateLead = {
  name: "",
  company: "",
  workEmail: "",
  phone: "",
  quantityBand: "",
  budgetPerGift: "",
  deliveryDate: "",
  city: "",
  giftingType: "",
  brandingRequired: "not-sure",
  message: "",
};

type Errors = Partial<Record<keyof CorporateLead, string>>;

export function CorporateForm({ presetProduct }: { presetProduct?: string }) {
  const [lead, setLead] = useState<CorporateLead>({
    ...empty,
    message: presetProduct ? `Interested in: ${presetProduct}` : "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const set = <K extends keyof CorporateLead>(key: K, value: CorporateLead[K]) =>
    setLead((current) => ({ ...current, [key]: value }));

  function validate(): boolean {
    const next: Errors = {};
    if (lead.name.trim().length < 2) next.name = "Tell us who to address the quote to.";
    if (lead.company.trim().length < 2) next.company = "Company name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.workEmail)) next.workEmail = "Use a valid work email address.";
    if (!/^[0-9+\-\s()]{8,15}$/.test(lead.phone)) next.phone = "Enter a reachable phone number.";
    if (!lead.quantityBand) next.quantityBand = "Pick the quantity band you're planning for.";
    if (!lead.giftingType) next.giftingType = "Select the kind of gifting.";
    if (lead.city.trim().length < 2) next.city = "Which city is this delivering to?";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    setBusy(true);
    const response = await submitCorporateLead(lead);
    setBusy(false);
    setReference(response.reference);
  }

  if (reference) {
    return (
      <FormSuccess
        title="Request received"
        copy="A corporate account manager will come back with box options, per-unit pricing at your quantity and a branding timeline. Expect a reply within one working day."
        reference={reference}
        onReset={() => {
          setLead(empty);
          setReference(null);
        }}
        resetLabel="Start another request"
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Your name"
          required
          value={lead.name}
          onChange={(e) => set("name", e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <TextField
          label="Company name"
          required
          value={lead.company}
          onChange={(e) => set("company", e.target.value)}
          error={errors.company}
          autoComplete="organization"
        />
        <TextField
          label="Work email"
          required
          type="email"
          value={lead.workEmail}
          onChange={(e) => set("workEmail", e.target.value)}
          error={errors.workEmail}
          autoComplete="email"
        />
        <TextField
          label="Phone"
          required
          type="tel"
          value={lead.phone}
          onChange={(e) => set("phone", e.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      <ChoiceGroup
        label="Quantity"
        options={quantityBands}
        value={lead.quantityBand}
        onChange={(value) => set("quantityBand", value)}
        error={errors.quantityBand}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Budget per gift"
          options={budgets}
          value={lead.budgetPerGift}
          onChange={(e) => set("budgetPerGift", e.target.value)}
        />
        <TextField
          label="Delivery date"
          type="date"
          value={lead.deliveryDate}
          onChange={(e) => set("deliveryDate", e.target.value)}
          hint="Approximate is fine"
        />
        <TextField
          label="Delivery city"
          required
          value={lead.city}
          onChange={(e) => set("city", e.target.value)}
          error={errors.city}
        />
        <SelectField
          label="Type of gifting"
          required
          options={giftingTypes}
          value={lead.giftingType}
          onChange={(e) => set("giftingType", e.target.value)}
          error={errors.giftingType}
        />
      </div>

      <ChoiceGroup
        label="Custom branding required?"
        options={["Yes", "No", "Not sure yet"]}
        value={lead.brandingRequired === "yes" ? "Yes" : lead.brandingRequired === "no" ? "No" : "Not sure yet"}
        onChange={(value) =>
          set("brandingRequired", value === "Yes" ? "yes" : value === "No" ? "no" : "not-sure")
        }
        columns={3}
      />

      <TextArea
        label="Anything else we should know?"
        value={lead.message}
        onChange={(e) => set("message", e.target.value)}
        placeholder="Product preferences, number of delivery addresses, artwork status…"
      />

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={busy} className="sm:w-auto">
          {busy ? "Sending…" : "Request corporate quote"}
        </Button>
        <p className="text-xs text-mitti-500">
          No payment is taken here. You&apos;ll get a written quote before anything is confirmed.
        </p>
      </div>
    </form>
  );
}
