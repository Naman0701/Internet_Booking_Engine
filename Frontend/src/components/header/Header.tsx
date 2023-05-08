import React, { FC, useEffect, useState, useRef } from "react";
import "./Header.scss";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { HotelData } from "../../interface/DataInterface";
import Drawer from "@mui/material/Drawer";
import {
  fetchCurrencyFactor,
  selectedCurrency,
  setSelectedCurrencyFactor,
} from "../../redux/slice/currencyConverterSlice";
import { useTranslation } from "react-i18next";
import i18n from "../../utils/intl/i18";
import { currencyType } from "../../types/DataTypes";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { authUser, clearUser } from "../../redux/slice/userSlice";
import {
  fetchLandingPageConfig,
  landingPageConfigData,
} from "../../redux/slice/configurationsSlice";
import MenuIcon from "@mui/icons-material/Menu";
import ReactGA from "react-ga";
const Header: FC = () => {
  const { t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<string>(i18n.language);
  const isAuthenticated: boolean = useAppSelector(authUser).isAuthenticated;

  const languageRef = useRef<HTMLSelectElement>(null);
  const currencyRef = useRef<HTMLSelectElement>(null);

  const configurationData: HotelData = useAppSelector(landingPageConfigData);
  const currentCurrency: currencyType = useAppSelector(selectedCurrency);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [menuState, setMenuState] = useState<boolean>(false);

  const toggleDrawer = () => {
    setMenuState(!menuState);
  };
  useEffect(() => {
    dispatch(fetchCurrencyFactor());
    dispatch(fetchLandingPageConfig());
  }, [dispatch]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);
  const handleCurrenyChange = (): void => {
    setMenuState(false);
    if (currencyRef.current) {
      const selectedCurrency = currencyRef.current.value;
      dispatch(setSelectedCurrencyFactor(selectedCurrency));
    }
  };
  const handleLanguageChange = () => {
    setMenuState(false);
    if (languageRef.current) {
      const lang =
        languageRef.current.value || navigator.language.split("-")[0];
      setSelectedLang(lang);
      i18n.changeLanguage(lang);
    }
  };

  const handleLogin = () => {
    setMenuState(false);
    navigate("/login");
  };

  const handleLogout = () => {
    setMenuState(false);
    dispatch(clearUser());
    Auth.signOut();
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleMyBookings = () => {
    setMenuState(false);
    navigate("/my-bookings");
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLang);
  }, [selectedLang]);

  return (
    <header className="header">
      <span className="header__hotel-details">
        <img
          className="header__hotel-details__logo"
          src={configurationData.hotelLogo}
          alt="logo"
          onClick={handleLogoClick}
        />
        <span className="header__hotel-details__name">
          {t(`${configurationData.serviceName}`)}
        </span>
      </span>
      <span className="header__operations">
        {isAuthenticated && (
          <button
            className="header__operations__my-bookings"
            onClick={handleMyBookings}
          >
            {t("MY BOOKINGS")}
          </button>
        )}
        <div className="header__operations__language-div">
          <LanguageOutlinedIcon className="header__operations__language-div__globe" />
          <select
            onChange={handleLanguageChange}
            ref={languageRef}
            className="header__operations__language-div__select"
            value={selectedLang}
          >
            {configurationData.languageSupport.map((language: string) => (
              <option
                className="header__operations__language-div__select__option"
                key={language}
                value={language.toLowerCase()}
              >
                {language}
              </option>
            ))}
          </select>
        </div>
        <select
          onChange={handleCurrenyChange}
          ref={currencyRef}
          className="header__operations__currency"
          value={JSON.stringify(currentCurrency)}
        >
          {configurationData.currencySupport.map((currency: currencyType) => (
            <option
              className="header__operations__currency__option"
              key={currency.currencyName}
              value={JSON.stringify(currency)}
            >
              {currency.currencyIcon} {currency.currencyName}
            </option>
          ))}
        </select>

        {!isAuthenticated && (
          <button className="header__operations__login" onClick={handleLogin}>
            {t("Login")}
          </button>
        )}
        {isAuthenticated && (
          <button className="header__operations__login" onClick={handleLogout}>
            {t("Logout")}
          </button>
        )}
      </span>
      <div className="header__operations__mobile">
        <button className="menuButton" onClick={toggleDrawer}>
          <MenuIcon />
        </button>
        <Drawer anchor={"right"} open={menuState}>
          <button className="close__drawer" onClick={toggleDrawer}>
            X
          </button>
          {isAuthenticated && (
            <button
              className="header__operations__mobile__my-bookings"
              onClick={handleMyBookings}
            >
              {t("MY BOOKINGS")}
            </button>
          )}
          <div className="header__operations__mobile__language-div">
            <LanguageOutlinedIcon className="header__operations__mobile__language-div__globe" />
            <select
              onChange={handleLanguageChange}
              ref={languageRef}
              className="header__operations__mobile__language-div__select"
              value={selectedLang}
            >
              {configurationData.languageSupport.map((language: string) => (
                <option
                  className="header__operations__mobile__language-div__select__option"
                  key={language}
                  value={language.toLowerCase()}
                >
                  {language}
                </option>
              ))}
            </select>
          </div>
          <select
            onChange={handleCurrenyChange}
            ref={currencyRef}
            className="header__operations__mobile__currency"
            value={JSON.stringify(currentCurrency)}
          >
            {configurationData.currencySupport.map((currency: currencyType) => (
              <option
                className="header__operations__mobile__currency__option"
                key={currency.currencyName}
                value={JSON.stringify(currency)}
              >
                {currency.currencyIcon} {currency.currencyName}
              </option>
            ))}
          </select>

          {!isAuthenticated && (
            <button
              className="header__operations__mobile__login"
              onClick={handleLogin}
            >
              {t("Login")}
            </button>
          )}
          {isAuthenticated && (
            <button
              className="header__operations__mobile__login"
              onClick={handleLogout}
            >
              {t("Logout")}
            </button>
          )}
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
