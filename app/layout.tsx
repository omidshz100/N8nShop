import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'n8n Workspaces - Automated Workflows for Your Business',
  description: 'Ready-to-use n8n workspaces that integrate your favorite tools. Install, configure, and launch powerful automations in minutes, not weeks.',
  keywords: 'n8n, workflow automation, business automation, integrations, zapier alternative',
  openGraph: {
    title: 'n8n Workspaces - Automated Workflows for Your Business',
    description: 'Ready-to-use n8n workspaces that integrate your favorite tools. Install, configure, and launch powerful automations in minutes, not weeks.',
    type: 'website',
    url: 'https://your-domain.com',
    siteName: 'n8n Workspaces',
    images: [
      {
        url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
        width: 1200,
        height: 630,
        alt: 'n8n Workspaces - Business Automation'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'n8n Workspaces - Automated Workflows for Your Business',
    description: 'Ready-to-use n8n workspaces that integrate your favorite tools. Install, configure, and launch powerful automations in minutes, not weeks.',
    images: ['https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg']
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}