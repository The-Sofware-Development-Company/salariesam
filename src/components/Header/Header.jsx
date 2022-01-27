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
    hy: {
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
  const [language, setLanguage] = useState("hy");
  const { t } = useTranslation();

  useEffect(() => {
    setLanguage(localStorage.getItem("lang") || "hy");
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <header className="header">
      <div className="h-container">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <div className="texts">
            <h1 className="fz28 fw400 title c-black300">{t("title")}</h1>
            <h2 className="fz18 fw600 subtitle c-black300">
              {t("help-us-to-support-our-community")}
            </h2>
          </div>
        </div>
        <button
          className={
            language === "hy"
              ? "mulish fz16 fw600 c-black400 change-lang"
              : "noto fz16 fw600 c-black400 change-lang"
          }
          onClick={() => {
            setLanguage((prev) => (prev === "en" ? "hy" : "en"));
          }}
        >
          {language === "hy" ? "En" : "Հայ"}
        </button>
      </div>
    </header>
  );
};

export default Header;
