import React from "react";
import { useTranslation } from "react-i18next";
import SDClogo from "../../assets/sdc-logo.svg";
import "./styles.scss";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <img src={SDClogo} alt="SDC logo" className="sdc-logo" />
        <small className="fz14 fw600 c-black300">{t("powered-by")}</small>
      </div>
    </footer>
  );
};

export default Footer;
