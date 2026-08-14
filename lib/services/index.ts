/**
 * Service layer — the seam between the storefront and Phase 2 infrastructure.
 *
 * Every component talks to these functions, never to the mock data directly
 * (with the exception of static generation, which reads the catalogue at build
 * time). Swapping a body here for `fetch()` is the whole backend integration.
 *
 * Planned implementations:
 *   products    -> GET  /api/products, /api/products/:slug
 *   inventory   -> GET  /api/inventory/:sku
 *   cart        -> POST /api/cart, PATCH /api/cart/:id
 *   orders      -> POST /api/orders
 *   checkout    -> POST /api/checkout/session   (payment gateway handoff)
 *   auth        -> POST /api/auth/*             (customer accounts)
 *   leads       -> POST /api/leads/corporate | /api/leads/bulk | /api/leads/sample
 *   shipping    -> GET  /api/shipping/rates     (courier aggregator)
 *   coupons     -> POST /api/coupons/validate
 *   crm         -> webhook fan-out from the leads endpoints
 */
export * from "./products";
export * from "./leads";
