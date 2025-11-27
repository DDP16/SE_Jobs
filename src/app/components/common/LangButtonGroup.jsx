import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LangButtonGroup() {
    const { i18n } = useTranslation();

    const handleLangChange = (_e, newLang) => {
        if (newLang) i18n.changeLanguage(newLang);
    };

    return (
        <ToggleButtonGroup
            exclusive
            size="small"
            value={i18n.language?.startsWith('vi') ? 'vi' : 'en'}
            onChange={handleLangChange}
            aria-label="Language switcher"
            sx={{
                '& .MuiToggleButton-root': {
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    minWidth: '32px',
                    '&.Mui-selected': {
                        backgroundColor: 'white',
                        color: 'primary.main',
                        fontWeight: 600,
                    },
                },
                gap: 1
            }}
        >
            <ToggleButton value="en" aria-label="Switch to English">English</ToggleButton>
            <ToggleButton value="vi" aria-label="Switch to Vietnamese">Tiếng Việt</ToggleButton>
        </ToggleButtonGroup>
    );
}