/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortraitProvider } from './context/PortraitContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { YouTubeSection } from './components/YouTubeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { PhotoUploaderModal } from './components/PhotoUploaderModal';
import { BackendConsoleModal } from './components/BackendConsoleModal';

export default function App() {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isBackendModalOpen, setIsBackendModalOpen] = useState(false);

  return (
    <PortraitProvider>
      <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Navigation Bar */}
        <Navbar
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
          onOpenBackendModal={() => setIsBackendModalOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero onOpenPhotoModal={() => setIsPhotoModalOpen(true)} />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <YouTubeSection />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Quick Action Widgets */}
        <FloatingActions />

        {/* Photo Uploader / Identity Customization Modal */}
        <PhotoUploaderModal
          isOpen={isPhotoModalOpen}
          onClose={() => setIsPhotoModalOpen(false)}
        />

        {/* Backend API & Server Console Modal */}
        <BackendConsoleModal
          isOpen={isBackendModalOpen}
          onClose={() => setIsBackendModalOpen(false)}
        />
      </div>
    </PortraitProvider>
  );
}
