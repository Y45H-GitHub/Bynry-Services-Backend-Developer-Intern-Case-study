import React from 'react';

function KnowledgeBasePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6">Knowledge Base</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="card p-6">
          <h3 className="mb-4">Getting Started</h3>
          <p className="text-neutral-600">Learn the basics of our service and how to get started with your first request.</p>
        </div>
        <div className="card p-6">
          <h3 className="mb-4">FAQs</h3>
          <p className="text-neutral-600">Find answers to commonly asked questions about our services and platform.</p>
        </div>
        <div className="card p-6">
          <h3 className="mb-4">Tutorials</h3>
          <p className="text-neutral-600">Step-by-step guides to help you make the most of our services.</p>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBasePage;