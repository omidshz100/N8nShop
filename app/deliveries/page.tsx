import Link from 'next/link';
import { CheckCircle, Download, Mail, FileText, LifeBuoy } from 'lucide-react';

export default function DeliveriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to n8n Workspaces
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-600 mb-4">
              Thank you for your purchase! Your n8n workspace will be delivered shortly. Here's what happens next:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Process</h2>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Confirmation</h3>
                  <p className="text-gray-600 text-sm">You'll receive a confirmation email within 5 minutes with your order details.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Download Links</h3>
                  <p className="text-gray-600 text-sm">Within 15 minutes, you'll get download links for your workspace files and documentation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Setup Support</h3>
                  <p className="text-gray-600 text-sm">Access to our customer portal with video tutorials and 30 days of email support.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What You'll Receive</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Download className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">n8n workflow file (.json)</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Complete setup documentation</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Configuration templates</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <LifeBuoy className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">30-day email support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-800 mb-4">
              If you don't receive your delivery email within 30 minutes, or if you have any questions:
            </p>
            <div className="space-y-2">
              <p className="text-blue-800">
                📧 Email: <a href="mailto:omidfreelance100@gmail.com" className="underline hover:text-blue-600">omidfreelance100@gmail.com</a>
              </p>
              <p className="text-blue-800">
                ⏰ Response time: Within 24 hours (usually much faster)
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse More Workspaces
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}