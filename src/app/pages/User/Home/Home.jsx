import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection, CompanySection, CategorySection, JobSection, CTASection, HotJobTopCVSection } from "../../../components";
import useSearch from "../../../hooks/useSearch";

export default function Home() {
  const navigate = useNavigate();
  const { handleSearch } = useSearch();

  return (
    <>
      <HeroSection onSearch={handleSearch} />
      <JobSection />
      <HotJobTopCVSection />
      <CategorySection />
      <CompanySection />
      {/* <CTASection /> */}
    </>
  );
}
