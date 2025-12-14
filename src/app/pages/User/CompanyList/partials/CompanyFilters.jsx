import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  RadioGroup,
  Radio
} from '@mui/material';
import {
  ExpandMore,
  FilterList,
  Clear
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyTypes } from '../../../../modules/services/companyTypeService';

export default function CompanyFilters({
  clearFilter,
  filter,
  setFilter,
  activeFiltersCount = 0
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [expandedPanels, setExpandedPanels] = useState(['industry', 'size', 'location']);
  const company_types = useSelector(state => state.companyTypes.companyTypes || []);

  useEffect(() => {
    if (company_types.length === 0) {
      dispatch(getCompanyTypes());
    }
  }, [dispatch, company_types.length]);

  const companySizes = [
    { name: t("companyList.filters.sizes.small"), value: "1:50" },
    { name: t("companyList.filters.sizes.medium"), value: "50:200" },
    { name: t("companyList.filters.sizes.large"), value: "200:5000" },
    { name: t("companyList.filters.sizes.xlarge"), value: "500:1000" },
    { name: t("companyList.filters.sizes.xxlarge"), value: "1000:10000000" },
  ];

  // const locations = [
  //     'USA',
  //     'Remote',
  //     'France',
  //     'UK',
  //     'Germany',
  //     'Canada',
  //     'Singapore',
  //     'Vietnam'
  // ];

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpandedPanels(prev =>
      isExpanded
        ? [...prev, panel]
        : prev.filter(p => p !== panel)
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        position: "sticky",
        top: 16,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterList color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t("companyList.filters.title")}
          </Typography>
          {activeFiltersCount > 0 && <Chip label={activeFiltersCount} size="small" color="primary" sx={{ height: 20, minWidth: 20 }} />}
        </Box>
        {activeFiltersCount > 0 && (
          <Button size="small" startIcon={<Clear />} onClick={clearFilter} sx={{ textTransform: "none" }}>
            {t("companyList.filters.clear")}
          </Button>
        )}
      </Box>

      <Divider />

      {/* Industry Filter */}
      <Accordion expanded={expandedPanels.includes("industry")} onChange={handlePanelChange("industry")} elevation={0} disableGutters>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontWeight: 600 }}>{t("companyList.filters.companyType")}</Typography>
          {[].length > 0 && <Chip label={[].length} size="small" color="primary" sx={{ ml: 1, height: 20 }} />}
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          {company_types.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              {t("companyList.filters.noCompanyTypesFound")}
            </Typography>
          ) : (
            <FormGroup>
              {company_types.map((company_type) => (
                <FormControlLabel
                  key={company_type.id}
                  control={
                    <Checkbox
                      checked={(filter?.company_type_ids || []).includes(company_type.id)}
                      onChange={() => {
                        setFilter((prev) => {
                          const current = prev.company_type_ids || [];
                          const exists = current.includes(company_type.id);

                          return {
                            ...prev,
                            company_type_ids: exists ? current.filter((id) => id !== company_type.id) : [...current, company_type.id],
                          };
                        });
                      }}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">{company_type.name}</Typography>}
                />
              ))}
            </FormGroup>
          )}
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Company Size Filter */}
      <Accordion expanded={expandedPanels.includes("size")} onChange={handlePanelChange("size")} elevation={0} disableGutters>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontWeight: 600 }}>{t("companyList.filters.companySize")}</Typography>
          {[].length > 0 && <Chip label={[].length} size="small" color="primary" sx={{ ml: 1, height: 20 }} />}
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <RadioGroup onChange={(e) => setFilter((filter) => ({ ...filter, employee_count: e?.target?.value }))}>
            {companySizes.map((size) => (
              <FormControlLabel
                key={size.value}
                value={size.value}
                control={<Radio size="small" />}
                label={<Typography variant="body2">{size.name}</Typography>}
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Location Filter */}
      {/* <Accordion expanded={expandedPanels.includes("location")} onChange={handlePanelChange("location")} elevation={0} disableGutters>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography sx={{ fontWeight: 600 }}>Location</Typography>
            {[].length > 0 && <Chip label={[].length} size="small" color="primary" sx={{ ml: 1, height: 20 }} />}
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <FormGroup>
              {locations.map((location) => (
                <FormControlLabel
                  key={location}
                  control={<Checkbox checked={[].includes(location)} onChange={() => {}} size="small" />}
                  label={<Typography variant="body2">{location}</Typography>}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion> */}
    </Paper>
  );
}

