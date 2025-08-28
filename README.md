# n8n Workspaces - Sales Website

A production-ready website for selling n8n automation workspaces with integrated Stripe and PayPal payments.

## Features

- **Modern Design**: Clean, responsive layout with Inter font and mobile-first approach
- **Payment Integration**: 
  - Stripe Payment Links (opens in new tab)
  - PayPal Smart Buttons (client-side SDK with modal checkout)
- **SEO Optimized**: Complete metadata, Open Graph tags, and accessible markup
- **One-Page Layout**: Hero, How It Works, Catalog, Testimonials, FAQ, Contact sections
- **Product Catalog**: Dynamic product cards with detailed modals
- **Contact Form**: mailto integration with Formspree option
- **Delivery Page**: Post-purchase instructions and support information

## Setup Instructions

### 1. PayPal Configuration

Set your PayPal Client ID in one of these ways:

**Option A: Environment Variable**
```bash
# Add to .env.local
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

**Option B: Direct Configuration**
Edit `components/PaypalButtons.tsx` and replace `PAYPAL_CLIENT_ID` with your actual client ID.

### 2. Stripe Payment Links

Replace the placeholder Stripe URLs in `lib/products.ts`:

```typescript
// Replace these with your actual Stripe Payment Links
stripeUrl: 'https://buy.stripe.com/your-actual-link'
```

To create Stripe Payment Links:
1. Go to your Stripe Dashboard
2. Navigate to Products > Create Product
3. Set up your product and pricing
4. Generate a Payment Link
5. Copy the URL and replace in the products array

### 3. Product Configuration

Edit your products in `lib/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: 'unique-id',
    title: 'Your Product Name',
    price: 99,
    currency: 'USD',
    short: 'Brief description',
    features: [
      'Feature 1',
      'Feature 2',
      // ... more features
    ],
    image: '/img/your-product-image.jpg',
    stripeUrl: 'https://buy.stripe.com/your-link'
  }
  // ... more products
];
```

### 4. Contact Form Configuration

**Current Setup (mailto)**: The contact form uses mailto links to send emails directly.

**Alternative (Formspree)**:
1. Sign up at [Formspree](https://formspree.io)
2. Create a form and get your endpoint
3. Uncomment and configure the fetch request in `components/Contact.tsx`:

```typescript
// Replace 'your-form-id' with your actual Formspree form ID
fetch('https://formspree.io/f/your-form-id', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});
```

### 5. Images

Replace placeholder images in `public/img/`:
- `product-hubspot.jpg`
- `product-shopify.jpg` 
- `product-postgres.jpg`

Or update the image paths in `lib/products.ts` to use your own images.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Netlify
1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify
3. Set environment variables in Netlify dashboard

## Customization

### Styling
- Tailwind CSS configuration: `tailwind.config.ts`
- Global styles: `app/globals.css`
- Color scheme defined in CSS variables

### Content
- Hero section: `components/Hero.tsx`
- FAQ items: `components/FAQ.tsx`
- Testimonials: `components/Testimonials.tsx`
- Contact email: Update in `components/Contact.tsx`

### SEO
- Metadata: `app/layout.tsx`
- Open Graph images: Update URLs in metadata
- Sitemap: Add `sitemap.xml` to public folder

## Support

For technical support or customization needs:
- Email: omidfreelance100@gmail.com
- Response time: Within 24 hours

## License

This project is licensed for commercial use. You may modify and customize it for your business needs.