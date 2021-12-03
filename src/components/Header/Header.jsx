import React, { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import logo from "../../assets/logo.svg";
import "./styles.scss";
import en_us from "../../resources/en-us.json";
import hy_am from "../../resources/hy-am.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        ...en_us,
      },
    },
    am: {
      translation: {
        ...hy_am,
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const Header = () => {
  const [language, setLanguage] = useState("am");
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <div className="texts">
            <h1 className="fz36 fw400 title">{t("title")}</h1>
            <h2 className="fz18 fw600 subtitle">
              {t("help-us-to-support-our-community")}
            </h2>
          </div>
        </div>
        <button className="fz16 fw600 c-black400 change-lang">English</button>
      </div>
    </header>
  );
};

export default Header;
