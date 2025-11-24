import React, { useState } from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import {
  Business,
  CalendarToday,
  Favorite,
  FavoriteBorder,
  LocationOn,
  People,
} from "@mui/icons-material";
import { srcAsset } from "../../../../lib";
import { useTranslation } from "react-i18next";

export default function CompanyHeader({ company = {} }) {
  const { t } = useTranslation();
  const [isFollowing, setIsFollowing] = useState(false);
  const {
    name = "Company Name",
    logo = "C",
    location = "Location",
    industry = "Industry",
    jobsCount = 0,
    founded = new Date("2011-07-31"),
    employees = 4000,
    locationCount = 20,
  } = company;

  const formatFoundedDate = (date) => {
    return date.toLocaleDateString(t("languageDate"), {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stats = [
    {
      icon: <CalendarToday sx={{ fontSize: 20, color: "primary.main" }} />,
      label: t("company.header.founded"),
      value: formatFoundedDate(founded),
    },
    {
      icon: <People sx={{ fontSize: 20, color: "primary.main" }} />,
      label: t("company.header.employees"),
      value: `${employees.toLocaleString()}+`,
    },
    {
      icon: <LocationOn sx={{ fontSize: 20, color: "primary.main" }} />,
      label: t("company.header.location"),
      value: t("company.header.locations", { count: locationCount }),
    },
    {
      icon: <Business sx={{ fontSize: 20, color: "primary.main" }} />,
      label: t("company.header.industry"),
      value: industry,
    },
  ];

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        py: { xs: 2, md: 3, lg: 4 }
      }}
      className="bg-background-lightBlue"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: 1.5, md: 0 },
          p: { xs: 2.5, sm: 3, md: 4, lg: 5 },
        }}
        className="bg-white"
      >
        {/* Left Side - Company Info */}
        <Box sx={{ display: "flex", gap: { xs: 1.5, md: 2 }, alignItems: "center", flex: 1, width: "100%" }}>
          <img
            src={srcAsset.nomadIcon}
            alt="Nomad Logo"
            className="w-14 h-14 sm:w-20 sm:h-20 md:w-26 md:h-26 object-contain shrink-0"
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: { xs: 0.25, md: 0.5 },
                fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
              }}
            >
              {name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5 },
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LocationOn sx={{ fontSize: { xs: 14, sm: 16 }, color: "text.secondary" }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {location}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                •
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                {industry}
              </Typography>
              {jobsCount > 0 && (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                    •
                  </Typography>
                  <Chip
                    label={t("company.header.jobs_count", { count: jobsCount })}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 600, height: { xs: 20, sm: 24 }, fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                  />
                </>
              )}
            </Box>

            {/* Stats - Desktop: flex row, Mobile: 2x2 grid */}
            <Box
              sx={{
                display: { xs: "grid", lg: "flex" },
                gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" },
                gap: { xs: 1.5, sm: 2, lg: 3 },
                mt: { xs: 1.5, md: 2 },
              }}
            >
              {stats.map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, lg: 1.5 },
                    minWidth: 0,
                  }}
                >
                  <div className="
                    bg-background-lightBlue 
                    rounded-full 
                    w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                    flex items-center 
                    justify-center
                    flex-shrink-0"
                  >
                    {React.cloneElement(stat.icon, {
                      sx: { fontSize: { xs: 16, sm: 18, lg: 20 }, color: "primary.main" }
                    })}
                  </div>
                  <Box sx={{ minWidth: 0, overflow: "hidden" }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.75rem", lg: "0.875rem" },
                        mb: 0.1,
                        whiteSpace: "nowrap"
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: "0.8rem", sm: "0.85rem", lg: "0.95rem" },
                        color: "text.primary",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Right Side - Follow Button */}
        <Box
          sx={{
            width: { xs: "100%", md: "auto" },
            mt: { xs: 0.5, md: 0 },
            ml: { md: 2 }
          }}
        >
          <Button
            variant={isFollowing ? "outlined" : "contained"}
            startIcon={isFollowing ? <Favorite /> : <FavoriteBorder />}
            onClick={handleFollowToggle}
            sx={{
              px: { xs: 2.5, sm: 3 },
              py: { xs: 1, sm: 1.25 },
              textTransform: "none",
              fontWeight: 600,
              width: { xs: "100%", md: "auto" },
              minWidth: { md: "160px" },
              fontSize: { xs: "0.875rem", sm: "1rem" }
            }}
          >
            {isFollowing ? t("company.header.following") : t("company.header.follow_company")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
