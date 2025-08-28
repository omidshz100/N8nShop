import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Operations Manager',
    company: 'TechStart Inc.',
    content: 'The HubSpot sync workspace saved us weeks of development time. It works flawlessly and the documentation is excellent.',
    rating: 5
  },
  {
    name: 'Mike Rodriguez',
    role: 'E-commerce Director',
    company: 'ShopFlow',
    content: 'Our Slack notifications for Shopify orders have been game-changing. Customer support was incredibly helpful during setup.',
    rating: 5
  },
  {
    name: 'Jennifer Park',
    role: 'DevOps Engineer',
    company: 'DataCorp',
    content: 'The PostgreSQL backup workflow gives us peace of mind. Automated, reliable, and well-documented. Highly recommend!',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of businesses that have streamlined their operations with our n8n workspaces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}