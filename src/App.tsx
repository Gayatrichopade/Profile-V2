/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ParticleNetwork } from './components/ParticleNetwork';
import { CursorDataStream } from './components/CursorDataStream';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsStrip } from './components/StatsStrip';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { FeaturedProjects } from './components/FeaturedProjects';
import { TechnicalSkillset } from './components/TechnicalSkillset';
import { AboutPersonalDimensions } from './components/AboutPersonalDimensions';
import { PinnedRepositories } from './components/PinnedRepositories';
import { BenchmarkLab } from './components/BenchmarkLab';
import { AnimationMemeGenerator } from './components/AnimationMemeGenerator';
import { CyberRunnerGame } from './components/CyberRunnerGame';
import { VisitorTracker } from './components/VisitorTracker';
import { ContributionGraph } from './components/ContributionGraph';
import { RepoModal } from './components/RepoModal';
import { ContactModal } from './components/ContactModal';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { Repository } from './types/portfolio';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70; // offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] text-[#dee2f0] flex flex-col font-sans selection:bg-[#00d2ff]/20 selection:text-[#00d2ff] relative">
      
      {/* Background Interactive Data Science Particle Network */}
      <ParticleNetwork />

      {/* Subtle Data Science Cursor Stream Trail Effect */}
      <CursorDataStream />

      {/* Navigation Top Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        
        {/* 1. Hero Section with Floating Avatar, 3D Tilt, Quote Widget, & CTAs */}
        <HeroSection
          onScrollToRepos={() => handleNavigate('projects')}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 2. Animated Statistic Counters (Count up on load) */}
        <StatsStrip />

        {/* 3. Professional Experience (Interactive Animated Timeline) */}
        <ExperienceTimeline />

        {/* 4. Featured Projects & Case Studies (Interactive Card Grid with Hover Zoom) */}
        <FeaturedProjects />

        {/* 5. Technical Skillset (Categorized Interactive & Glowing Badges) */}
        <TechnicalSkillset />

        {/* 6. About Me & Personal Touch (Bento Grid: Foodie, Carrom, Data Storytelling, Code Execution) */}
        <AboutPersonalDimensions />

        {/* 7. Open Source & Pinned Repositories */}
        <PinnedRepositories
          onSelectRepo={(repo) => setSelectedRepo(repo)}
        />

        {/* 8. Interactive Model Benchmark & Telemetry Simulator */}
        <BenchmarkLab />

        {/* 9. Animation Meme Generator based on text (Data Science & Dev Humor Studio) */}
        <AnimationMemeGenerator />

        {/* 10. Interactive 60 FPS Cyber Kernel Arcade Game */}
        <CyberRunnerGame />

        {/* 11. Real-Time Visitor Telemetry & GitHub Traffic Logger */}
        <VisitorTracker />

        {/* 12. 52-Week Interactive GitHub Contribution Heat Map */}
        <ContributionGraph />

      </main>

      {/* Interactive Footer */}
      <Footer 
        onOpenContact={() => setIsContactOpen(true)} 
        onOpenResume={() => setIsResumeOpen(true)} 
      />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <RepoModal
        repo={selectedRepo}
        onClose={() => setSelectedRepo(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
