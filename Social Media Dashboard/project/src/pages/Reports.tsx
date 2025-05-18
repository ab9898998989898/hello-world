import React from 'react';
import { Download, FileText, Calendar, RefreshCw, ExternalLink } from 'lucide-react';

const reports = [
  {
    id: 1,
    name: 'Monthly Performance Summary',
    period: 'April 2025',
    created: 'Apr 30, 2025',
    pages: 12,
    size: '2.4 MB',
    type: 'PDF'
  },
  {
    id: 2,
    name: 'Audience Growth Analysis',
    period: 'Q1 2025',
    created: 'Apr 15, 2025',
    pages: 18,
    size: '3.8 MB',
    type: 'PDF'
  },
  {
    id: 3,
    name: 'Content Strategy Effectiveness',
    period: 'Q1 2025',
    created: 'Apr 10, 2025',
    pages: 15,
    size: '2.9 MB',
    type: 'PDF'
  },
  {
    id: 4,
    name: 'Competitor Benchmarking',
    period: 'Q1 2025',
    created: 'Apr 5, 2025',
    pages: 24,
    size: '4.1 MB',
    type: 'PDF'
  },
  {
    id: 5,
    name: 'Campaign ROI Report',
    period: 'Spring Campaign 2025',
    created: 'Apr 2, 2025',
    pages: 10,
    size: '1.8 MB',
    type: 'PDF'
  },
];

const reportTemplates = [
  {
    id: 1,
    name: 'Executive Summary',
    description: 'High-level overview of key metrics and results.',
    icon: '📊'
  },
  {
    id: 2,
    name: 'Platform Performance',
    description: 'Detailed metrics by social platform.',
    icon: '📱'
  },
  {
    id: 3,
    name: 'Content Analysis',
    description: 'Performance breakdown by content type and topic.',
    icon: '📝'
  },
  {
    id: 4,
    name: 'Audience Insights',
    description: 'Demographic data and audience growth trends.',
    icon: '👥'
  },
  {
    id: 5,
    name: 'Campaign Results',
    description: 'Campaign performance and ROI calculations.',
    icon: '🚀'
  },
  {
    id: 6,
    name: 'Custom Report',
    description: 'Build a custom report with selected metrics.',
    icon: '⚙️'
  },
];

const ReportCard = ({ report }: { report: typeof reports[0] }) => {
  return (
    <div className="card card-hover">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary-500/10 rounded-lg">
          <FileText size={24} className="text-primary-500" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium">{report.name}</h3>
          <p className="text-dark-400 text-sm mt-1">{report.period}</p>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div>
              <p className="text-xs text-dark-400">Created</p>
              <p className="text-sm">{report.created}</p>
            </div>
            <div>
              <p className="text-xs text-dark-400">Pages</p>
              <p className="text-sm">{report.pages}</p>
            </div>
            <div>
              <p className="text-xs text-dark-400">Size</p>
              <p className="text-sm">{report.size}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mt-5 pt-4 border-t border-dark-800">
        <button className="btn btn-primary flex-1">
          <Download size={16} />
          Download
        </button>
        <button className="p-2 rounded-lg border border-dark-700 hover:border-primary-600 hover:text-primary-400">
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};

const TemplateCard = ({ template }: { template: typeof reportTemplates[0] }) => {
  return (
    <div className="card card-hover">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-dark-800 rounded-lg text-2xl">
          {template.icon}
        </div>
        
        <div>
          <h3 className="font-medium">{template.name}</h3>
          <p className="text-dark-400 text-sm mt-1">{template.description}</p>
        </div>
      </div>
      
      <button className="btn btn-outline w-full mt-5">
        Generate Report
      </button>
    </div>
  );
};

const Reports: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl">Reports</h1>
          <p className="text-dark-400">Create and download analytics reports for your social media.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn btn-outline">
            <Calendar size={16} />
            Select Period
          </button>
          <button className="btn btn-primary">
            <RefreshCw size={16} />
            Generate Report
          </button>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Generated Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-2">Need Custom Reporting?</h2>
        <p className="text-dark-300 mb-4">
          Our team can create tailored reports that match your exact business needs and KPIs.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn btn-outline">Learn More</button>
          <button className="btn btn-secondary">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;