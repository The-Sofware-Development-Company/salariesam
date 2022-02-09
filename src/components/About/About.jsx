import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="c-container">
      <p className="fz14 lh18 c-black300 d-i-block">{t("about-tool")}</p>
      <p className="fz14 lh18 c-black300 d-i-block">
        <a
          href="https://opendatacommons.org/licenses/by/1-0/"
          target="_blank"
          className="mulish"
          rel="noreferrer"
        >
          Open Data Commons Attribution License (ODC-By) v1
        </a>
        {t("license-second-part")}
        <a href="/data.csv" download>
          {t("download-license")}
        </a>
      </p>

      <p className="fz14 lh18 c-black300 mt10">{t("how-this-work")}</p>
      <span className="li fz14 lh18 c-black300">
        <b>1.</b> {t("step1")}
      </span>
      <span className="li fz14 lh18 c-black300">
        <b>&nbsp; 2.</b> {t("step2")}
      </span>
    </div>
  );
};

export default About;
