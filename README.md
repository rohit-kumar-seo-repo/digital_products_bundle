# Digital Products Bundle

Next.js storefront for [digitalproductsbundle.in](https://digitalproductsbundle.in).

## Required deployment configuration

Configure these in the dedicated Vercel project before enabling the corresponding features. Do not commit secret values.

### Checkout and order delivery
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (used server-side by current storefront routes; prefer a least-privilege key/RLS policy and migrate privileged operations to server-only credentials where appropriate)
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET` in the Supabase Edge Function secrets for `razorpay-webhook`
- `RESEND_API_KEY` and `EMAIL_FROM` in Supabase Edge Function secrets for order confirmation email
- `SITE_URL=https://digitalproductsbundle.in` in the Edge Function environment

**Important:** checkout intentionally returns an unavailable response when Razorpay API credentials are missing. Do not replace this with a generic fixed-amount payment link, because the amount may not match the customer's order.

### Private Canva Studio
- `CANVA_ADMIN_PASSWORD`: strong, unique password for the Canva admin login.
- `CANVA_ADMIN_SESSION_SECRET`: long, random secret used to sign an eight-hour HttpOnly admin session cookie. Keep it separate from the admin password.
- Existing Canva OAuth environment variables must also be configured for the integration: `CANVA_CLIENT_ID`, `CANVA_CLIENT_SECRET`, and optionally `CANVA_REDIRECT_URI`.
- Configure the Vercel Blob token and required Canva token storage settings used by the existing integration.

The middleware protects `/admin/canva` and `/api/integrations/canva/*`. If the admin password/session secret are missing, sign-in fails closed.

### Contact form
- `RESEND_API_KEY`
- `EMAIL_FROM` must be a verified sender domain in Resend.
- Confirm the destination address used by `app/api/contact/route.ts` is monitored by your team before publishing the form.

## Validation checklist before production
1. Run `npm run build`.
2. Set and verify the environment variables above in the correct Vercel project and Supabase Edge Function.
3. Test invalid and valid admin login; confirm unauthenticated requests to all Canva integration routes return 401.
4. Test one-item and multi-item orders using Razorpay test mode and verify amount, order items, webhook signature validation, paid status, access links, and confirmation email.
5. Confirm each customer-facing Drive/Canva access URL works for a buyer who is not signed in to the owner's account.
6. Confirm the support inbox receives contact form messages.
7. Test search/filter/sorting and cart/checkout on mobile and desktop.

Never test payment delivery by making a real charge until test-mode verification passes.
