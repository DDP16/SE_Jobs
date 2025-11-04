import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
  ListItemIcon
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.svg';


export default function Header() {
  const { i18n, t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  let navigate = useNavigate();

  // Check if user is logged in 
  const isLoggedIn = !!localStorage.getItem('auth_token');
  const userName = localStorage.getItem('user_name') || 'User';

  const handleLangChange = (_e, newLang) => {
    if (newLang) i18n.changeLanguage(newLang);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleProfileClick = () => {
    handleUserMenuClose();
    navigate('/profile/dashboard');
  };

  const handleLogout = () => {
    handleUserMenuClose();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    navigate('/');
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'white',
        color: 'text.primary',
        boxShadow: 1
      }}
    >
      <Toolbar sx={{
        minHeight: { xs: '56px', md: '64px' },
        px: { xs: 2, md: 3 },
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.location.assign('/')}>
          <img src={logo} alt="SE Jobs Logo" width={isMobile ? "40" : "60"} style={{ marginRight: '8px', marginLeft: '10px' }} />
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{
            flexGrow: 1,
            display: 'flex',
            gap: 2,
            ml: 4,
            // justifyContent: 'center'
          }}>
            <Button color="inherit" component={Link} to="/">{t('home')}</Button>
            <Button color="inherit" component={Link} to="/jobs">{t('jobs')}</Button>
            <Button color="inherit" component={Link} to="/companies">{t('companies')}</Button>
            <Button color="inherit">{t('contactUs')}</Button>
          </Box>
        )}

        {/* Desktop Actions */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button color="inherit">{t('forEmployers')}</Button>

            {isLoggedIn ? (
              <>
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{
                    border: '2px solid',
                    borderColor: 'primary.main',
                    p: 0.5
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'primary.main',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                  >
                    {userName.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 3,
                    sx: { mt: 1.5, minWidth: 200 }
                  }}
                >
                  <MenuItem onClick={handleProfileClick}>
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    Profile Dashboard
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/signin')}
                >
                  {t('login')}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/signup')}
                >
                  {t('register')}
                </Button>
              </>
            )}

            <ToggleButtonGroup
              exclusive
              size="small"
              value={i18n.language?.startsWith('vi') ? 'vi' : 'en'}
              onChange={handleLangChange}
              aria-label="Language switcher"
              sx={{
                '& .MuiToggleButton-root': {
                  border: 'none',
                  padding: '4px 8px',
                  minWidth: '32px',
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                    color: 'primary.main',
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ToggleButton value="en" aria-label="Switch to English">EN</ToggleButton>
              <ToggleButton value="vi" aria-label="Switch to Vietnamese">VI</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Mobile Menu Dropdown */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleMobileMenuClose}>
            <Button color="inherit" component={Link} to="/" sx={{ width: '100%', justifyContent: 'flex-start' }}>
              {t('home')}
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button color="inherit" component={Link} to="/jobs" sx={{ width: '100%', justifyContent: 'flex-start' }}>
              {t('jobs')}
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button color="inherit" component={Link} to="/companies" sx={{ width: '100%', justifyContent: 'flex-start' }}>
              {t('companies')}
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button color="inherit" sx={{ width: '100%', justifyContent: 'flex-start' }}>
              {t('contactUs')}
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button color="inherit" sx={{ width: '100%', justifyContent: 'flex-start' }}>
              {t('forEmployers')}
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button variant="outlined" sx={{ width: '100%', justifyContent: 'center' }}>
              {t('login')}
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button variant="contained" color="primary" sx={{ width: '100%', justifyContent: 'center' }}>
              {t('register')}
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
              <ToggleButtonGroup
                exclusive
                size="small"
                value={i18n.language?.startsWith('vi') ? 'vi' : 'en'}
                onChange={handleLangChange}
                aria-label="Language switcher"
                sx={{
                  '& .MuiToggleButton-root': {
                    border: 'none',
                    padding: '4px 8px',
                    minWidth: '32px',
                    '&.Mui-selected': {
                      backgroundColor: 'transparent',
                      color: 'primary.main',
                      fontWeight: 600,
                    },
                  },
                }}
              >
                <ToggleButton value="en" aria-label="Switch to English">EN</ToggleButton>
                <ToggleButton value="vi" aria-label="Switch to Vietnamese">VI</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}