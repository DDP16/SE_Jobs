import React from "react";
import { HeroSection, CompanySection, CategorySection, JobSection, CTASection, HotJobTopCVSection } from "../../../components";

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
      <HotJobTopCVSection />
      <JobSection />
      {/* <CTASection /> */}
    </>
  );
}
