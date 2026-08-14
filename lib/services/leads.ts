import type { BulkLead, CorporateLead, SampleLead } from "@/types";

export interface LeadResponse {
  ok: boolean;
  reference: string;
}

/**
 * Frontend-only lead capture.
 * Phase 2: POST to /api/leads/* which writes to the CRM and triggers email +
 * WhatsApp notifications. Nothing is transmitted today — the payload is logged
 * in development so the shape can be verified against the future endpoint.
 */
async function submit(kind: string, payload: unknown): Promise<LeadResponse> {
  if (process.env.NODE_ENV === "development") {
    console.info(`[lead:${kind}] captured (not transmitted — Phase 1)`, payload);
  }
  await new Promise((resolve) => setTimeout(resolve, 700));
  const reference = `${kind.toUpperCase().slice(0, 3)}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  return { ok: true, reference };
}

export const submitCorporateLead = (lead: CorporateLead) => submit("corporate", lead);
export const submitBulkLead = (lead: BulkLead) => submit("bulk", lead);
export const submitSampleLead = (lead: SampleLead) => submit("sample", lead);
export const submitNewsletter = (email: string) => submit("newsletter", { email });
