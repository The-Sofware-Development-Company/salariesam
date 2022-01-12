import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="c-container">
      <p className="fz16 lh18 c-black300">{t("about-tool")}</p>
      <p className="fz16 lh18 c-black300">{t("about-salaries")}</p>
      <p className="fz16 lh18 c-black300">{t("about-reported-data")}</p>
      <p className="fz16 lh18 c-black300">{t("about-reported-salary")}</p>
      <p className="fz16 lh18 c-black300">{t("remove-data")}</p>
      <p className="fz16 lh18 c-black300">
        {t("license-first-part")}
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

      <p className="fz16 lh18 c-black300 mt30">{t("how-this-work")}</p>
      <ol className="ol">
        <li className="li fz16 lh18 c-black300">{t("click-on-submit")}</li>
        <li className="li fz16 lh18 c-black300">{t("fill-in-form")}</li>
      </ol>

      <p className="fz16 lh18 c-black300">{t("thats-it")}</p>
    </div>
  );
};

export default About;
