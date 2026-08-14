"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckboxGroup, ChoiceGroup, FormSuccess, SelectField, TextArea, TextField } from "./Field";
import { submitBulkLead } from "@/lib/services/leads";
import type { BulkLead, BuyerType } from "@/types";

export const buyerTypes: { value: BuyerType; label: string }[] = [
  { value: "distributor", label: "Distributor" },
  { value: "retailer", label: "Retailer" },
  { value: "temple", label: "Temple" },
  { value: "institution", label: "Institution" },
  { value: "event-organiser", label: "Event organiser" },
  { value: "farm-nursery", label: "Farm / Nursery" },
  { value: "exporter", label: "Exporter" },
  { value: "other", label: "Other" },
];

const productOptions = [
  "Cow dung cakes",
  "Havan cups",
  "Diyas",
  "Dhoop",
  "Havan lakdi / logs",
  "Manure & powder",
  "Gift boxes",
];

const packagingOptions = ["Standard bulk", "Retail ready", "Private label", "Custom packaging"];
const monthlyOptions = ["One-off order", "Under 1,000 units", "1,000–10,000 units", "10,000–50,000 units", "50,000+ units"];

const empty: BulkLead = {
  name: "",
  company: "",
  email: "",
  phone: "",
  buyerType: "distributor",
  products: [],
  quantity: "",
  monthlyRequirement: "",
  city: "",
  state: "",
  country: "India",
  packaging: "Standard bulk",
  message: "",
};

type Errors = Partial<Record<keyof BulkLead, string>>;

export function BulkForm({ presetProduct }: { presetProduct?: string }) {
  const [lead, setLead] = useState<BulkLead>({
    ...empty,
    message: presetProduct ? `Interested in: ${presetProduct}` : "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const set = <K extends keyof BulkLead>(key: K, value: BulkLead[K]) =>
    setLead((current) => ({ ...current, [key]: value }));

  const toggleProduct = (product: string) =>
    setLead((current) => ({
      ...current,
      products: current.products.includes(product)
        ? current.products.filter((p) => p !== product)
        : [...current.products, product],
    }));

  function validate(): boolean {
    const next: Errors = {};
    if (lead.name.trim().length < 2) next.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) next.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s()]{8,15}$/.test(lead.phone)) next.phone = "Enter a reachable phone number.";
    if (lead.products.length === 0) next.products = "Pick at least one product line.";
    if (!lead.quantity.trim()) next.quantity = "Tell us the quantity you need.";
    if (lead.city.trim().length < 2) next.city = "Delivery city is required.";
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
    const response = await submitBulkLead(lead);
    setBusy(false);
    setReference(response.reference);
  }

  if (reference) {
    return (
      <FormSuccess
        title="Enquiry logged"
        copy="You'll get slab pricing against your quantity, the packaging options that apply, and freight to your district. Sample despatch can run in parallel if you need one."
        reference={reference}
        onReset={() => {
          setLead(empty);
          setReference(null);
        }}
        resetLabel="Send another enquiry"
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <ChoiceGroup
        label="I am buying as a"
        options={buyerTypes.map((b) => b.label)}
        value={buyerTypes.find((b) => b.value === lead.buyerType)?.label ?? ""}
        onChange={(label) => {
          const match = buyerTypes.find((b) => b.label === label);
          if (match) set("buyerType", match.value);
        }}
        columns={4}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" required value={lead.name} onChange={(e) => set("name", e.target.value)} error={errors.name} autoComplete="name" />
        <TextField label="Company / organisation" value={lead.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" />
        <TextField label="Email" required type="email" value={lead.email} onChange={(e) => set("email", e.target.value)} error={errors.email} autoComplete="email" />
        <TextField label="Phone" required type="tel" value={lead.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} autoComplete="tel" />
      </div>

      <div>
        <CheckboxGroup label="Products you need" options={productOptions} values={lead.products} onToggle={toggleProduct} />
        {errors.products ? (
          <p role="alert" className="mt-1.5 text-xs text-gerua-600">
            {errors.products}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Quantity needed"
          required
          value={lead.quantity}
          onChange={(e) => set("quantity", e.target.value)}
          error={errors.quantity}
          placeholder="e.g. 5,000 pieces or 500 KG"
        />
        <SelectField
          label="Estimated monthly requirement"
          options={monthlyOptions}
          value={lead.monthlyRequirement}
          onChange={(e) => set("monthlyRequirement", e.target.value)}
        />
        <TextField label="City" required value={lead.city} onChange={(e) => set("city", e.target.value)} error={errors.city} />
        <TextField label="State" value={lead.state} onChange={(e) => set("state", e.target.value)} />
        <TextField label="Country" value={lead.country} onChange={(e) => set("country", e.target.value)} />
      </div>

      <ChoiceGroup
        label="Packaging"
        options={packagingOptions}
        value={lead.packaging}
        onChange={(value) => set("packaging", value)}
        columns={4}
      />

      <TextArea
        label="Notes"
        value={lead.message}
        onChange={(e) => set("message", e.target.value)}
        placeholder="Delivery frequency, label requirements, existing suppliers…"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" variant="dark" disabled={busy}>
          {busy ? "Sending…" : "Get wholesale pricing"}
        </Button>
        <p className="text-xs text-mitti-500">Pricing is quoted per slab. Nothing is charged from this form.</p>
      </div>
    </form>
  );
}
