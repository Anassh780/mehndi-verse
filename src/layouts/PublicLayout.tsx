import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { MobileBottomNav } from '@/components/common/MobileBottomNav';
import { AIRecommendationModal } from '@/components/common/AIRecommendationModal';

export const PublicLayout: React.FC = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f1e6] text-[#1b1815] antialiased selection:bg-[#9c4221]/20 selection:text-[#9c4221]">
      
      {/* Top Editorial Navigation */}
      <Navbar onOpenAIQuiz={() => setAiModalOpen(true)} />

      {/* Main Page Outlet with Mobile Bottom Nav Clearance */}
      <main className="flex-1 pb-16 md:pb-0 bg-[#f7f1e6] text-[#1b1815]">
        <Outlet />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Mobile Bottom Navigation (Visible on Android & Mobile) */}
      <MobileBottomNav onOpenAIQuiz={() => setAiModalOpen(true)} />

      {/* Global AI Style Quiz Modal */}
      <AIRecommendationModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />

    </div>
  );
};

export default PublicLayout;
