import React from "react";
import HeroSection from "../../components/sections/HeroSection";
import CompanySection from "../../components/sections/CompanySection";
import CategorySection from "../../components/sections/CategorySection";
import JobSection from "../../components/sections/JobSection";
import CTASection from "../../components/sections/CTASection";

export default function Home() {
  const handleSearch = (searchParams) => {
    console.log('Search params:', searchParams);
    // TODO: Implement search functionality
  };

  return (
    <>
      <HeroSection onSearch={handleSearch} />
      <CompanySection />
      <CategorySection />
      <JobSection />
      <CTASection />
    </>
  );
}
