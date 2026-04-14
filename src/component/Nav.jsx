import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Badge, Menu, MenuItem, IconButton } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { GrLanguage } from 'react-icons/gr';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTranslation } from "react-i18next";
import useAuthStor from "../Stor/UseAuthStor";
import useAuth from "../hook/useAuth";

export default function Navbar({ toggleMode, currentMode }) { // ✅ استقبلنا toggleMode و currentMode
  const token = useAuthStor((state) => state.token);
  const setToken = useAuthStor((state) => state.setToken);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleCloseMenu();
  };

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          KnowledgeShop
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">{t('Home')}</Button>

          {token ? (
            <>
              <Button color="inherit" component={RouterLink} to="/caret" sx={{ mx: 1 }}>
                <Badge badgeContent={data?.items?.length || 0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </Button>
              <Button color="inherit" onClick={handleLogout} sx={{ ml: 2, border: '1px solid white' }}>
                {t("Logout")}
              </Button>
              <Button component={RouterLink} to="/profile" color="inherit" sx={{ ml: 2, border: '1px solid white' }}>
                {t("Profile")}
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">{t('Login')}</Button>
              <Button color="inherit" component={RouterLink} to="/register" sx={{ ml: 1 }}>{t("Register")}</Button>
            </>
          )}

          {/* زر اللغة */}
          <Button
            color="inherit"
            onClick={handleOpenMenu}
            startIcon={<GrLanguage />}
            sx={{ ml: 2, textTransform: 'none' }}
          >
            Language
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            PaperProps={{ sx: { width: 150, marginTop: '10px' } }}
          >
            <MenuItem onClick={() => changeLanguage('ar')} sx={{ justifyContent: 'flex-end' }}>العربية (AR)</MenuItem>
            <MenuItem onClick={() => changeLanguage('en')}>English (EN)</MenuItem>
          </Menu>

          {/* ✅ زر Dark / Light Mode */}
          <IconButton onClick={toggleMode} color="inherit" sx={{ ml: 1 }}>
            {currentMode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}