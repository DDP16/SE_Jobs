import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection, CompanySection, CategorySection, JobSection, CTASection, HotJobTopCVSection } from "../../../components";

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = useCallback(({ keyword, location }) => {
    const params = new URLSearchParams();
    const titleValue = keyword?.trim();
    const locationValue = location?.trim();

    if (titleValue) {
      params.set("title", titleValue);
    }

    if (locationValue) {
      params.set("location", locationValue);
    }

    navigate({
      pathname: "/find-jobs",
      search: params.toString() ? `?${params.toString()}` : "",
    });
  }, [navigate]);

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
