"use client";

import "swiper/css";
import "swiper/css/pagination";

// Import page sections
import FAQSection from "@/components/sections/FAQSection";
import CommunitySection from "@/components/sections/CommunitySection";
import WhatWeGiveSection from "@/components/sections/WhatWeGiveSection";
import BrowseLearningModulesSection from "@/components/sections/BrowseLearningModulesSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import HeroSection from "@/components/sections/HeroSection";
import HeaderLogoImage from "@/components/header-logo-image";
import MasterclassSection from "@/components/sections/MasterclassSection";
import BrowseArticlesSection from "@/components/sections/BrowseArticlesSection";

export default function Home() {
  return (
    <div>
      <section id="header">
        <HeaderLogoImage></HeaderLogoImage>
      </section>
      <section id="main-section">
        <div className="px-5 md:px-20 py-10">
          <div className="flex flex-col gap-12 md:gap-24">
            <HeroSection></HeroSection>
            <BrowseArticlesSection></BrowseArticlesSection>
            <MasterclassSection></MasterclassSection>
            <WhatWeDoSection></WhatWeDoSection>
            <BrowseLearningModulesSection></BrowseLearningModulesSection>
            <WhatWeGiveSection></WhatWeGiveSection>
            <CommunitySection></CommunitySection>
            <FAQSection></FAQSection>
          </div>
        </div>
      </section>
    </div>
  );
}
