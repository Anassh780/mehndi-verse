import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { MobileBottomNav } from '@/components/common/MobileBottomNav';
import { AIRecommendationModal } from '@/components/common/AIRecommendationModal';

export const PublicLayout: React.FC = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#07100D] text-[#1A2421] dark:text-[#F8F5EE] antialiased selection:bg-[#C59B27]/30 selection:text-[#064E3B]">
      
      {/* Top Navigation */}
      <Navbar onOpenAIQuiz={() => setAiModalOpen(true)} />

      {/* Main Page Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
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
