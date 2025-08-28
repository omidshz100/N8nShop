import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">n8n Workspaces</h3>
            <p className="text-gray-300 mb-4">
              Professional n8n workflow solutions for businesses of all sizes. 
              Automate your processes with confidence using our battle-tested workspaces.
            </p>
            <p className="text-gray-300 text-sm">
              © 2024 n8n Workspaces. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="#catalog" className="hover:text-white transition-colors">HubSpot Sync</Link></li>
              <li><Link href="#catalog" className="hover:text-white transition-colors">Shopify Notifier</Link></li>
              <li><Link href="#catalog" className="hover:text-white transition-colors">DB Monitor</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Custom Workflows</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/deliveries" className="hover:text-white transition-colors">Delivery Info</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}