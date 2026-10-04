# Digital Products Bundle — Production Checklist

## Completed in the repository
- Premium responsive storefront
- Product catalog model
- Dynamic product pages
- Product detail / purchase UX
- Cart
- Checkout shell
- FAQ, About, Contact and legal routes
- SEO metadata
- robots.txt and sitemap
- Server-side Razorpay order endpoint
- Razorpay signature verification utilities
- Razorpay webhook signature boundary
- PostgreSQL/Prisma commerce schema
- Private-download data model
- GitHub → Vercel deployment

## Required before accepting real money
1. Create a PostgreSQL database for this project and set DATABASE_URL in the dedicated Vercel project.
2. Run the Prisma migration/deploy workflow.
3. Add this project's own Razorpay Key ID and Key Secret as Vercel environment variables.
4. Add the Razorpay webhook secret and configure the webhook endpoint:
   /api/webhooks/razorpay
5. Connect private object storage and configure its credentials.
6. Implement/order-persistence against the database before enabling fulfillment.
7. Implement signed, expiring download URLs against private storage.
8. Add real product files and final license/refund terms.
9. Test successful, failed, cancelled and duplicate webhook/payment scenarios in Razorpay test mode.
10. Only then connect digitalproductsbundle.in to this Vercel project.

## Security rule
Never commit payment secrets, database credentials, private storage credentials or downloadable product source files to GitHub.