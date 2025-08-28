import { Download, Settings, Link, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Download,
    title: 'Install',
    description: 'Download your purchased n8n workspace and import it into your n8n instance.'
  },
  {
    icon: Settings,
    title: 'Configure',
    description: 'Follow our detailed setup guide to configure credentials and settings.'
  },
  {
    icon: Link,
    title: 'Connect',
    description: 'Link your existing tools and services with pre-built authentication flows.'
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Activate your workflow and start automating tasks immediately.'
  }
];

export function Steps() {
  return (
    <section id="steps" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your automation running in four simple steps. Choose from 100+ workspaces across 12 categories. No complex setup or coding required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}