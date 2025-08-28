export type Product = {
  id: string;
  title: string;
  price: number;
  currency: 'USD';
  short: string;
  features: string[];
  image: string;
  stripeUrl: string;
  category: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  setupTime: string;
  popular?: boolean;
  featured?: boolean;
};

export const categories = [
  'All',
  'CRM & Sales',
  'E-commerce',
  'Database & Analytics',
  'Marketing',
  'Communication',
  'Project Management',
  'Finance & Accounting',
  'HR & Recruitment',
  'Social Media',
  'DevOps & Monitoring',
  'Content Management'
];

export const products: Product[] = [
  // CRM & Sales
  {
    id: 'hubspot-sheets-sync',
    title: 'HubSpot → Google Sheets Sync',
    price: 79,
    currency: 'USD',
    short: 'Sync contacts with dedupe & error alerts.',
    features: [
      'Bi-directional contact synchronization',
      'Automatic duplicate detection and merging',
      'Real-time error notifications via email',
      'Custom field mapping configuration',
      'Scheduled sync intervals (hourly/daily/weekly)',
      'Detailed sync logs and reporting'
    ],
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-hubspot-link',
    category: 'CRM & Sales',
    tags: ['hubspot', 'google-sheets', 'crm', 'sync'],
    difficulty: 'Intermediate',
    setupTime: '30 minutes',
    popular: true,
    featured: true
  },
  {
    id: 'salesforce-slack-alerts',
    title: 'Salesforce Deal Alerts to Slack',
    price: 89,
    currency: 'USD',
    short: 'Instant notifications for high-value deals.',
    features: [
      'Real-time deal stage notifications',
      'Customizable alert thresholds',
      'Rich Slack message formatting',
      'Deal owner tagging',
      'Pipeline health monitoring',
      'Weekly summary reports'
    ],
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-salesforce-link',
    category: 'CRM & Sales',
    tags: ['salesforce', 'slack', 'deals', 'alerts'],
    difficulty: 'Intermediate',
    setupTime: '45 minutes'
  },
  {
    id: 'pipedrive-email-automation',
    title: 'Pipedrive Email Follow-up Automation',
    price: 69,
    currency: 'USD',
    short: 'Automated email sequences based on deal stages.',
    features: [
      'Stage-based email triggers',
      'Personalized email templates',
      'Follow-up scheduling',
      'Email tracking and analytics',
      'A/B testing capabilities',
      'Unsubscribe management'
    ],
    image: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-pipedrive-link',
    category: 'CRM & Sales',
    tags: ['pipedrive', 'email', 'automation', 'follow-up'],
    difficulty: 'Beginner',
    setupTime: '20 minutes'
  },

  // E-commerce
  {
    id: 'shopify-slack-notifier',
    title: 'Shopify Order Notifier to Slack',
    price: 69,
    currency: 'USD',
    short: 'Real-time order pings + retries.',
    features: [
      'Instant order notifications to Slack channels',
      'Customizable message templates',
      'Retry mechanism for failed notifications',
      'Order status update tracking',
      'Multi-channel routing based on order value',
      'Customer information masking for privacy'
    ],
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-shopify-link',
    category: 'E-commerce',
    tags: ['shopify', 'slack', 'orders', 'notifications'],
    difficulty: 'Beginner',
    setupTime: '15 minutes',
    popular: true
  },
  {
    id: 'woocommerce-inventory-sync',
    title: 'WooCommerce Inventory Sync',
    price: 79,
    currency: 'USD',
    short: 'Multi-store inventory synchronization.',
    features: [
      'Real-time inventory updates',
      'Multi-store synchronization',
      'Low stock alerts',
      'Bulk inventory management',
      'SKU mapping and validation',
      'Inventory history tracking'
    ],
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-woocommerce-link',
    category: 'E-commerce',
    tags: ['woocommerce', 'inventory', 'sync', 'multi-store'],
    difficulty: 'Intermediate',
    setupTime: '40 minutes'
  },
  {
    id: 'amazon-price-monitor',
    title: 'Amazon Price Monitoring',
    price: 59,
    currency: 'USD',
    short: 'Track competitor prices and adjust automatically.',
    features: [
      'Automated price tracking',
      'Competitor analysis',
      'Price adjustment rules',
      'Email and Slack alerts',
      'Historical price data',
      'Profit margin protection'
    ],
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-amazon-link',
    category: 'E-commerce',
    tags: ['amazon', 'pricing', 'monitoring', 'competition'],
    difficulty: 'Advanced',
    setupTime: '60 minutes'
  },

  // Database & Analytics
  {
    id: 'postgres-backup-monitor',
    title: 'PostgreSQL Backup & Health Monitor',
    price: 59,
    currency: 'USD',
    short: 'Nightly backups, alerts, integrity checks.',
    features: [
      'Automated nightly database backups',
      'Database health monitoring and alerts',
      'Backup integrity verification',
      'Storage cleanup and retention policies',
      'Multi-database support',
      'Slack/email notifications for issues'
    ],
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-postgres-link',
    category: 'Database & Analytics',
    tags: ['postgresql', 'backup', 'monitoring', 'database'],
    difficulty: 'Advanced',
    setupTime: '45 minutes',
    featured: true
  },
  {
    id: 'mysql-performance-tracker',
    title: 'MySQL Performance Tracker',
    price: 49,
    currency: 'USD',
    short: 'Monitor query performance and optimize automatically.',
    features: [
      'Query performance monitoring',
      'Slow query detection',
      'Performance trend analysis',
      'Automated optimization suggestions',
      'Resource usage tracking',
      'Custom alerting rules'
    ],
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-mysql-link',
    category: 'Database & Analytics',
    tags: ['mysql', 'performance', 'optimization', 'monitoring'],
    difficulty: 'Advanced',
    setupTime: '50 minutes'
  },
  {
    id: 'google-analytics-reports',
    title: 'Google Analytics Auto Reports',
    price: 39,
    currency: 'USD',
    short: 'Automated weekly reports to email and Slack.',
    features: [
      'Automated report generation',
      'Customizable metrics and dimensions',
      'Multi-format delivery (email, Slack, PDF)',
      'Scheduled reporting intervals',
      'Data visualization charts',
      'Anomaly detection alerts'
    ],
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-analytics-link',
    category: 'Database & Analytics',
    tags: ['google-analytics', 'reports', 'automation', 'insights'],
    difficulty: 'Beginner',
    setupTime: '25 minutes'
  },

  // Marketing
  {
    id: 'mailchimp-lead-sync',
    title: 'Mailchimp Lead Sync from Forms',
    price: 45,
    currency: 'USD',
    short: 'Auto-sync leads from multiple form sources.',
    features: [
      'Multi-source lead collection',
      'Automatic list segmentation',
      'Duplicate prevention',
      'Tag-based organization',
      'Welcome email triggers',
      'Lead scoring integration'
    ],
    image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-mailchimp-link',
    category: 'Marketing',
    tags: ['mailchimp', 'leads', 'forms', 'email-marketing'],
    difficulty: 'Beginner',
    setupTime: '20 minutes',
    popular: true
  },
  {
    id: 'facebook-ads-optimizer',
    title: 'Facebook Ads Performance Optimizer',
    price: 89,
    currency: 'USD',
    short: 'Auto-pause underperforming ads and scale winners.',
    features: [
      'Performance-based ad management',
      'Automated budget allocation',
      'ROI optimization rules',
      'A/B testing automation',
      'Bid adjustment algorithms',
      'Performance reporting dashboard'
    ],
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-facebook-ads-link',
    category: 'Marketing',
    tags: ['facebook-ads', 'optimization', 'automation', 'roi'],
    difficulty: 'Advanced',
    setupTime: '75 minutes'
  },
  {
    id: 'content-calendar-automation',
    title: 'Social Media Content Calendar',
    price: 55,
    currency: 'USD',
    short: 'Auto-schedule content across multiple platforms.',
    features: [
      'Multi-platform scheduling',
      'Content calendar management',
      'Hashtag optimization',
      'Image resizing automation',
      'Engagement tracking',
      'Content performance analytics'
    ],
    image: 'https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-content-calendar-link',
    category: 'Marketing',
    tags: ['social-media', 'scheduling', 'content', 'automation'],
    difficulty: 'Intermediate',
    setupTime: '35 minutes'
  },

  // Communication
  {
    id: 'slack-ticket-system',
    title: 'Slack Support Ticket System',
    price: 65,
    currency: 'USD',
    short: 'Convert Slack messages to support tickets.',
    features: [
      'Message-to-ticket conversion',
      'Priority assignment automation',
      'SLA tracking and alerts',
      'Agent assignment rules',
      'Customer notification system',
      'Ticket analytics dashboard'
    ],
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-slack-tickets-link',
    category: 'Communication',
    tags: ['slack', 'support', 'tickets', 'customer-service'],
    difficulty: 'Intermediate',
    setupTime: '40 minutes'
  },
  {
    id: 'teams-meeting-automation',
    title: 'Microsoft Teams Meeting Automation',
    price: 49,
    currency: 'USD',
    short: 'Auto-create meetings from calendar events.',
    features: [
      'Calendar integration',
      'Automated meeting creation',
      'Attendee management',
      'Meeting link distribution',
      'Reminder notifications',
      'Meeting analytics tracking'
    ],
    image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-teams-link',
    category: 'Communication',
    tags: ['microsoft-teams', 'meetings', 'calendar', 'automation'],
    difficulty: 'Beginner',
    setupTime: '25 minutes'
  },

  // Project Management
  {
    id: 'jira-slack-integration',
    title: 'Jira to Slack Project Updates',
    price: 59,
    currency: 'USD',
    short: 'Real-time project updates in Slack channels.',
    features: [
      'Real-time issue notifications',
      'Custom field mapping',
      'Sprint progress updates',
      'Burndown chart automation',
      'Team performance metrics',
      'Escalation workflows'
    ],
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-jira-link',
    category: 'Project Management',
    tags: ['jira', 'slack', 'project-management', 'agile'],
    difficulty: 'Intermediate',
    setupTime: '35 minutes'
  },
  {
    id: 'trello-time-tracking',
    title: 'Trello Time Tracking Automation',
    price: 39,
    currency: 'USD',
    short: 'Automatic time tracking for Trello cards.',
    features: [
      'Automated time logging',
      'Card activity tracking',
      'Team productivity reports',
      'Billable hours calculation',
      'Project cost estimation',
      'Client reporting automation'
    ],
    image: 'https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-trello-link',
    category: 'Project Management',
    tags: ['trello', 'time-tracking', 'productivity', 'billing'],
    difficulty: 'Beginner',
    setupTime: '20 minutes'
  },

  // Finance & Accounting
  {
    id: 'quickbooks-expense-automation',
    title: 'QuickBooks Expense Automation',
    price: 75,
    currency: 'USD',
    short: 'Auto-categorize and import expenses.',
    features: [
      'Receipt scanning and processing',
      'Automatic expense categorization',
      'Vendor matching and creation',
      'Tax code assignment',
      'Approval workflow automation',
      'Monthly reconciliation reports'
    ],
    image: 'https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-quickbooks-link',
    category: 'Finance & Accounting',
    tags: ['quickbooks', 'expenses', 'accounting', 'automation'],
    difficulty: 'Intermediate',
    setupTime: '45 minutes'
  },
  {
    id: 'stripe-revenue-tracking',
    title: 'Stripe Revenue Analytics',
    price: 55,
    currency: 'USD',
    short: 'Advanced revenue tracking and forecasting.',
    features: [
      'Revenue trend analysis',
      'Customer lifetime value calculation',
      'Churn rate monitoring',
      'MRR/ARR tracking',
      'Payment failure analysis',
      'Financial forecasting models'
    ],
    image: 'https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-stripe-analytics-link',
    category: 'Finance & Accounting',
    tags: ['stripe', 'revenue', 'analytics', 'forecasting'],
    difficulty: 'Advanced',
    setupTime: '50 minutes'
  },

  // HR & Recruitment
  {
    id: 'linkedin-candidate-tracker',
    title: 'LinkedIn Candidate Tracker',
    price: 69,
    currency: 'USD',
    short: 'Track and manage recruitment pipeline.',
    features: [
      'Candidate profile extraction',
      'Application status tracking',
      'Interview scheduling automation',
      'Recruiter performance metrics',
      'Candidate communication templates',
      'Hiring pipeline analytics'
    ],
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-linkedin-link',
    category: 'HR & Recruitment',
    tags: ['linkedin', 'recruitment', 'candidates', 'hr'],
    difficulty: 'Intermediate',
    setupTime: '40 minutes'
  },
  {
    id: 'employee-onboarding-automation',
    title: 'Employee Onboarding Automation',
    price: 59,
    currency: 'USD',
    short: 'Streamline new hire onboarding process.',
    features: [
      'Automated welcome sequences',
      'Document collection workflows',
      'IT provisioning automation',
      'Training schedule management',
      'Progress tracking dashboards',
      'Feedback collection systems'
    ],
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-onboarding-link',
    category: 'HR & Recruitment',
    tags: ['onboarding', 'hr', 'employees', 'automation'],
    difficulty: 'Beginner',
    setupTime: '30 minutes'
  },

  // Social Media
  {
    id: 'instagram-engagement-tracker',
    title: 'Instagram Engagement Analytics',
    price: 45,
    currency: 'USD',
    short: 'Track engagement and optimize posting times.',
    features: [
      'Engagement rate analysis',
      'Optimal posting time detection',
      'Hashtag performance tracking',
      'Competitor analysis',
      'Growth trend monitoring',
      'Content performance insights'
    ],
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-instagram-link',
    category: 'Social Media',
    tags: ['instagram', 'engagement', 'analytics', 'social-media'],
    difficulty: 'Beginner',
    setupTime: '25 minutes'
  },
  {
    id: 'twitter-sentiment-monitor',
    title: 'Twitter Brand Sentiment Monitor',
    price: 65,
    currency: 'USD',
    short: 'Monitor brand mentions and sentiment analysis.',
    features: [
      'Real-time mention tracking',
      'Sentiment analysis automation',
      'Influencer identification',
      'Crisis alert system',
      'Competitor monitoring',
      'Engagement opportunity detection'
    ],
    image: 'https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-twitter-link',
    category: 'Social Media',
    tags: ['twitter', 'sentiment', 'monitoring', 'brand'],
    difficulty: 'Intermediate',
    setupTime: '35 minutes'
  },

  // DevOps & Monitoring
  {
    id: 'server-health-monitor',
    title: 'Server Health Monitoring Suite',
    price: 79,
    currency: 'USD',
    short: 'Comprehensive server monitoring and alerting.',
    features: [
      'Multi-server monitoring',
      'Resource usage tracking',
      'Uptime monitoring',
      'Performance threshold alerts',
      'Log analysis automation',
      'Incident response workflows'
    ],
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-server-monitor-link',
    category: 'DevOps & Monitoring',
    tags: ['server', 'monitoring', 'devops', 'alerts'],
    difficulty: 'Advanced',
    setupTime: '60 minutes'
  },
  {
    id: 'github-deployment-tracker',
    title: 'GitHub Deployment Tracker',
    price: 49,
    currency: 'USD',
    short: 'Track deployments and notify teams.',
    features: [
      'Deployment status tracking',
      'Team notification automation',
      'Rollback detection',
      'Performance impact analysis',
      'Release notes generation',
      'Deployment frequency metrics'
    ],
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-github-link',
    category: 'DevOps & Monitoring',
    tags: ['github', 'deployment', 'ci-cd', 'devops'],
    difficulty: 'Intermediate',
    setupTime: '35 minutes'
  },

  // Content Management
  {
    id: 'wordpress-backup-automation',
    title: 'WordPress Backup Automation',
    price: 35,
    currency: 'USD',
    short: 'Automated WordPress site backups.',
    features: [
      'Scheduled backup automation',
      'Multi-site support',
      'Cloud storage integration',
      'Backup verification',
      'One-click restore functionality',
      'Backup health monitoring'
    ],
    image: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-wordpress-link',
    category: 'Content Management',
    tags: ['wordpress', 'backup', 'automation', 'cms'],
    difficulty: 'Beginner',
    setupTime: '20 minutes'
  },
  {
    id: 'content-seo-optimizer',
    title: 'Content SEO Optimization',
    price: 59,
    currency: 'USD',
    short: 'Automated SEO analysis and optimization.',
    features: [
      'Keyword density analysis',
      'Meta tag optimization',
      'Content readability scoring',
      'Internal linking suggestions',
      'Image alt-text generation',
      'SEO performance tracking'
    ],
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    stripeUrl: 'https://buy.stripe.com/your-seo-link',
    category: 'Content Management',
    tags: ['seo', 'content', 'optimization', 'marketing'],
    difficulty: 'Intermediate',
    setupTime: '40 minutes'
  }
];

// Helper functions for filtering and searching
export function getProductsByCategory(category: string): Product[] {
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.title.toLowerCase().includes(lowercaseQuery) ||
    product.short.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function getPopularProducts(): Product[] {
  return products.filter(product => product.popular);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getProductsByDifficulty(difficulty: string): Product[] {
  return products.filter(product => product.difficulty === difficulty);
}

export function getProductsByPriceRange(min: number, max: number): Product[] {
  return products.filter(product => product.price >= min && product.price <= max);
}