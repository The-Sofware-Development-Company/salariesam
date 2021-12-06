import React from "react";
import { useTranslation } from "react-i18next";
import SDClogo from "../../assets/sdc-logo.svg";
import "./styles.scss";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <a href="https://sdc.am/" target="_blank" rel="noopener">
          <img src={SDClogo} alt="SDC logo" className="sdc-logo" />
        </a>
        <small className="fz14 fw600 c-black300">{t("powered-by")}</small>
      </div>
    </footer>
  );
};

export default Footer;
