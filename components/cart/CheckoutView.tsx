"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Info, Lock } from "lucide-react";
import { useStore } from "@/lib/store";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TextField, ChoiceGroup } from "@/components/forms/Field";
import { ButtonLink } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { brandConfig } from "@/config/brand";

const deliveryOptions = ["Standard (3–6 days)", "Express (2–3 days)"];
const paymentOptions = ["UPI", "Card", "Netbanking", "Cash on delivery"];

/**
 * Checkout UI only — Phase 1 does not process orders or payments.
 *
 * Phase 2 integration points:
 *  1. Address:  validate pincode + serviceability  -> GET  /api/shipping/serviceability
 *  2. Delivery: fetch live rates and ETAs          -> GET  /api/shipping/rates
 *  3. Order:    create the order record            -> POST /api/orders
 *  4. Payment:  create a gateway session and hand  -> POST /api/checkout/session
 *               off to Razorpay / PayU / Cashfree
 *  5. Confirm:  verify signature on the webhook    -> POST /api/webhooks/payment
 *  6. Invoice:  raise the GST invoice              -> POST /api/invoices
 * Nothing below submits anywhere today.
 */
export function CheckoutView() {
  const { lines, subtotal, shipping, total, hydrated } = useStore();
  const [delivery, setDelivery] = useState(deliveryOptions[0]!);
  const [payment, setPayment] = useState(paymentOptions[0]!);

  return (
    <div className="shell py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Cart", href: "/cart" },
          { name: "Checkout", href: "/checkout" },
        ]}
      />
      <h1 className="text-[30px] leading-tight sm:text-[38px]">Checkout</h1>

      <p className="mt-4 flex items-start gap-2.5 rounded-lg border border-saffron-300 bg-saffron-100 px-4 py-3 text-[14px] text-mitti-800">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-saffron-700" aria-hidden />
        <span>
          This is the checkout interface only. Payments and order processing connect in Phase 2 — nothing is
          charged and no order is placed from this screen.
        </span>
      </p>

      {hydrated && lines.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-mitti-300 bg-sand-100 px-6 py-14 text-center">
          <p className="font-display text-xl font-semibold text-mitti-800">There&apos;s nothing to check out</p>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-mitti-600">
            Add a product to the cart and this page will fill in.
          </p>
          <ButtonLink href="/shop" className="mt-6">
            Browse the shop
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            <section>
              <h2 className="mb-4 font-display text-lg font-bold">Contact</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
                <TextField label="Phone" type="tel" autoComplete="tel" placeholder="For delivery updates" />
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-display text-lg font-bold">Shipping address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Full name" autoComplete="name" />
                <TextField label="Pincode" inputMode="numeric" autoComplete="postal-code" />
                <TextField label="Address line 1" className="sm:col-span-2" autoComplete="address-line1" />
                <TextField label="Address line 2" className="sm:col-span-2" autoComplete="address-line2" />
                <TextField label="City" autoComplete="address-level2" />
                <TextField label="State" autoComplete="address-level1" />
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-display text-lg font-bold">Delivery</h2>
              <ChoiceGroup label="Speed" options={deliveryOptions} value={delivery} onChange={setDelivery} columns={2} />
              <p className="mt-2 text-xs text-mitti-500">
                {/* Phase 2: replace with live courier rates from /api/shipping/rates */}
                Rates shown are placeholders until the courier integration is connected.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-display text-lg font-bold">Payment method</h2>
              <ChoiceGroup label="Pay using" options={paymentOptions} value={payment} onChange={setPayment} columns={4} />
              <div className="mt-4 rounded-lg border border-dashed border-mitti-300 bg-sand-100 p-5">
                <p className="flex items-center gap-2 font-display text-sm font-semibold text-mitti-800">
                  <Lock className="h-4 w-4 text-mitti-500" aria-hidden />
                  Payment gateway not connected
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-mitti-600">
                  {/* Phase 2: POST /api/checkout/session then hand off to the gateway SDK. */}
                  In Phase 2 this block hands off to the payment provider. Until then the button below is
                  deliberately inactive rather than simulating a transaction.
                </p>
              </div>
            </section>

            <div>
              <button
                type="button"
                disabled
                title="Payments connect in Phase 2"
                className="h-[52px] w-full rounded bg-mitti-800 font-display font-semibold text-sand-100 opacity-50"
              >
                Place order — available in Phase 2
              </button>
              <p className="mt-3 text-center text-xs text-mitti-500">
                Need this order now?{" "}
                <a
                  href={`https://wa.me/${brandConfig.contact.whatsappNumber}`}
                  className="font-semibold text-gerua-600 underline underline-offset-4"
                >
                  Send it on WhatsApp
                </a>{" "}
                and we&apos;ll confirm it manually.
              </p>
            </div>
          </form>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-mitti-200 bg-sand-100 p-6">
              <h2 className="font-display text-lg font-bold">Order summary</h2>
              <ul className="mt-4 space-y-3 border-b border-mitti-200 pb-4">
                {lines.map((line) => (
                  <li key={line.key} className="flex gap-3">
                    <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded border border-mitti-200 bg-sand-50">
                      <Image src={line.image} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-mitti-800">{line.name}</span>
                      <span className="block font-mono text-[11px] text-mitti-500">
                        {line.variantLabel} × {line.quantity}
                      </span>
                    </span>
                    <span className="font-mono text-sm">{formatINR(line.unitPrice * line.quantity)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-mitti-600">Subtotal</dt>
                  <dd className="font-mono">{formatINR(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-mitti-600">Shipping</dt>
                  <dd className="font-mono">{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-mitti-200 pt-3 font-display text-base font-bold">
                  <dt>Total</dt>
                  <dd>{formatINR(total)}</dd>
                </div>
              </dl>
              <Link href="/cart" className="mt-4 block text-center text-sm text-mitti-600 hover:text-gerua-600">
                Edit cart
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
