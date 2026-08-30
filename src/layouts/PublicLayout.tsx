import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { MobileBottomNav } from '@/components/common/MobileBottomNav';
import { AIRecommendationModal } from '@/components/common/AIRecommendationModal';

export const PublicLayout: React.FC = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#141312] text-[#1C1A18] dark:text-[#F7F5F0] antialiased selection:bg-[#8E5A3C]/20 selection:text-[#8E5A3C]">
      
      {/* Top Editorial Navigation */}
      <Navbar onOpenAIQuiz={() => setAiModalOpen(true)} />

      {/* Main Page Outlet with Mobile Bottom Nav Clearance */}
      <main className="flex-1 pb-16 md:pb-0">
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
