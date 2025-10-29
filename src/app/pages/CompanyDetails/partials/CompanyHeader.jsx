import React, { useState } from "react";
import { Box, Typography, Button, Avatar, Chip } from "@mui/material";
import {
  Business,
  CalendarToday,
  Favorite,
  FavoriteBorder,
  LocationOn,
  People,
} from "@mui/icons-material";
import { srcAsset } from "../../../lib";
import { px } from "framer-motion";

export default function CompanyHeader({ company = {} }) {
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
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stats = [
    {
      icon: <CalendarToday sx={{ fontSize: 20, color: "primary.main" }} />,
      label: "Founded",
      value: formatFoundedDate(founded),
    },
    {
      icon: <People sx={{ fontSize: 20, color: "primary.main" }} />,
      label: "Employees",
      value: `${employees.toLocaleString()}+`,
    },
    {
      icon: <LocationOn sx={{ fontSize: 20, color: "primary.main" }} />,
      label: "Location",
      value: `${locationCount} countries`,
    },
    {
      icon: <Business sx={{ fontSize: 20, color: "primary.main" }} />,
      label: "Industry",
      value: industry,
    },
  ];

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Box className="bg-background-lightBlue px-10 xl:px-30 py-8">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
        }}
        className="bg-white p-8"
      >
        {/* Left Side - Company Info */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flex: 1 }}>
          <img
            src={srcAsset.nomadIcon}
            alt="Nomad Logo"
            className="md:w-30 md:h-30 w-14 h-14 object-contain"
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 0.5,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              {name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {location}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                •
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {industry}
              </Typography>
              {jobsCount > 0 && (
                <>
                  <Typography variant="body2" color="text.secondary">
                    •
                  </Typography>
                  <Chip
                    label={`${jobsCount} việc làm`}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 600, height: 24 }}
                  />
                </>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
              {stats.map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <div className="
                    bg-background-lightBlue 
                    rounded-full w-10 h-10 
                    flex items-center 
                    justify-center"
                  >
                    {stat.icon}
                  </div>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.875rem", mb: 0.25 }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "text.primary",
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
        <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Button
            variant={isFollowing ? "outlined" : "contained"}
            startIcon={isFollowing ? <Favorite /> : <FavoriteBorder />}
            onClick={handleFollowToggle}
            fullWidth={false}
            sx={{
              px: 3,
              textTransform: "none",
              fontWeight: 600,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {isFollowing ? "Đang theo dõi" : "Theo dõi công ty"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
