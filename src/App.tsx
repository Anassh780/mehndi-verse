import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MehndiAuthProvider } from '@/context/MehndiAuthContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { BookingProvider } from '@/context/BookingContext';

// Layout
import { PublicLayout } from '@/layouts/PublicLayout';

// Public Pages
import { HomePage } from '@/pages/mehndi/HomePage';
import { ArtistsExplorePage } from '@/pages/mehndi/ArtistsExplorePage';
import { ArtistProfilePage } from '@/pages/mehndi/ArtistProfilePage';
import { BookingWizardPage } from '@/pages/mehndi/BookingWizardPage';
import { AboutPage } from '@/pages/mehndi/AboutPage';
import { ContactPage } from '@/pages/mehndi/ContactPage';
import { BlogPage, BlogPostPage } from '@/pages/mehndi/BlogPage';

// Dashboards & Auth
import { ArtistDashboardPage } from '@/pages/mehndi/ArtistDashboardPage';
import { CustomerDashboardPage } from '@/pages/mehndi/CustomerDashboardPage';
import { AuthPage } from '@/pages/mehndi/AuthPage';

// 404
import { NotFound } from '@/pages/NotFound';

export const App: React.FC = () => {
  return (
    <MehndiAuthProvider>
      <FavoritesProvider>
        <BookingProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Shell Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="artists" element={<ArtistsExplorePage />} />
                <Route path="artists/:id" element={<ArtistProfilePage />} />
                <Route path="book" element={<BookingWizardPage />} />
                <Route path="book/:artistId" element={<BookingWizardPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                
                {/* Dashboards inside Public Shell */}
                <Route path="artist-dashboard" element={<ArtistDashboardPage />} />
                <Route path="customer-dashboard" element={<CustomerDashboardPage />} />
                <Route path="dashboard" element={<Navigate to="/customer-dashboard" replace />} />
                
                {/* Auth Routes */}
                <Route path="login" element={<AuthPage />} />
                <Route path="signup" element={<AuthPage />} />
                <Route path="forgot-password" element={<AuthPage />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BookingProvider>
      </FavoritesProvider>
    </MehndiAuthProvider>
  );
};

export default App;
