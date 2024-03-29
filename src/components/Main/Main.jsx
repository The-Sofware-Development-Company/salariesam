import React, { useCallback, useEffect, useMemo, useState } from "react";
import Papaparse from "papaparse";
import searchIcon from "../../assets/search-icon.svg";
import downloadIcon from "../../assets/download-icon.svg";
import "./styles.scss";
import About from "../About/About";
import SortArrows from "../SortArrows/SortArrows";
import { useTranslation } from "react-i18next";
import MailChimp from "./MailChimp";

let copyOfRows = [];

const Main = () => {
  const [rows, setRows] = useState([]);
  const [sortType, setSortType] = useState("dateUp");
  const { t } = useTranslation();

  useEffect(() => {
    fetch("./data.csv")
      .then((res) => res.text())
      .then((csv) => {
        const json = Papaparse.parse(csv);
        setRows(transformData(json.data));
        copyOfRows = transformData(json.data);
      });
  }, []);

  const transformData = (payload) => {
    const headers = payload[0];
    const [, ...data] = payload;

    const transformedData = data.map((item, index) => {
      let obj = {};
      item.forEach((i, idx) => {
        obj[headers[idx]] = i;
      });
      return obj;
    });

    return transformedData;
  };

  const transformNumValues = (val) => {
    return +val.split(",").join("");
  };

  const transformTextFields = (val) => {
    return val.toLowerCase();
  };

  const transformDateValues = (val) => {
    return new Date(val["Date"]);
  };

  const sortDates = (array) => {
    if (sortType === "dateUp") {
      array.sort((a, b) => transformDateValues(b) - transformDateValues(a));
    } else {
      array.sort((a, b) => transformDateValues(a) - transformDateValues(b));
    }
  };

  const sortTextFields = (array, key) => {
    if (sortType === "companyUp" || sortType === "positionUp") {
      array.sort((a, b) =>
        transformTextFields(a[key]) > transformTextFields(b[key]) ? 1 : -1
      );
    } else {
      array.sort((a, b) =>
        transformTextFields(b[key]) > transformTextFields(a[key]) ? 1 : -1
      );
    }
  };

  const sortNumberFields = (array, key) => {
    if (sortType === "salaryUp" || sortType === "expUp") {
      array.sort((a, b) => {
        if (a[key] === "") {
          return -1;
        } else if (b[key] === "") {
          return 1;
        }
        return transformNumValues(a[key]) > transformNumValues(b[key]) ? 1 : -1;
      });
    } else {
      array.sort((a, b) => {
        if (a === "") {
          return -1;
        } else if (b === "") {
          return 1;
        }
        return transformNumValues(b[key]) > transformNumValues(a[key]) ? 1 : -1;
      });
    }
  };

  const sortTable = useMemo(() => {
    let result = [...rows];

    switch (sortType) {
      case "dateUp":
        sortDates(result);
        break;
      case "dateDown":
        sortDates(result);
        break;
      case "companyUp":
        sortTextFields(result, "Company");
        break;
      case "companyDown":
        sortTextFields(result, "Company");
        break;
      case "positionUp":
        sortTextFields(result, "Position");
        break;
      case "positionDown":
        sortTextFields(result, "Position");
        break;
      case "salaryUp":
        sortNumberFields(result, "Salary");
        break;
      case "salaryDown":
        sortNumberFields(result, "Salary");
        break;
      case "expUp":
        sortNumberFields(result, "Years of experience");
        break;
      case "expDown":
        sortNumberFields(result, "Years of experience");
        break;
      default:
        break;
    }

    return result;
  }, [rows, sortType]);

  const handleChange = useCallback((e) => {
    searching(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const searching = (value) => {
    setRows(copyOfRows);

    if (value !== "") {
      setRows((prev) =>
        prev.filter((item) => {
          return (
            item["Date"].includes(value.toLowerCase()) ||
            item["Company"].toLowerCase().includes(value.toLowerCase()) ||
            item["Position"].toLowerCase().includes(value.toLowerCase()) ||
            item["Salary"].includes(value.toLowerCase()) ||
            item["Years of experience"].includes(value.toLowerCase())
          );
        })
      );
    }
  };

  const makeWithZero = (dateString) =>
    parseInt(dateString) < 10 ? `0${dateString}` : dateString;

  const swapDayAndMonth = (dateTimeString) => {
    const [first, second, third] = dateTimeString.split("/");
    const newFirst = makeWithZero(second);
    const newSecond = makeWithZero(first);
    const newDate = [newFirst, newSecond, third].join("/");
    return newDate;
  };

  return (
    <main className={sortTable.length === 0 ? "no-result" : ""}>
      <About />
      <div className="c-container">
        <div className="form-btn-wrapper mt20">
          <a
            href="https://docs.google.com/forms/d/1M4ztN09EvaminyLIDH4rOgtnr0lW-AHEYXiThbpAZa0/viewform?edit_requested=true"
            className="btn dark"
            target="_blank"
            rel="noreferrer"
          >
            {t("submit-report")}
          </a>
          <form className="form" action="" onSubmit={handleSubmit}>
            <label htmlFor="search" hidden>
              {t("search")}
            </label>
            <div className="input-wrapper">
              <img className="search-icon" src={searchIcon} alt="Search" />
              <input
                className="search-input"
                type="text"
                placeholder={t("search")}
                onChange={handleChange}
              />
            </div>
            <p className="fz12 fw400 c-black300 search-result-text">
              {t("pagination", {
                num: rows.length,
                from: copyOfRows.length !== 0 ? copyOfRows.length : rows.length,
              })}
            </p>
          </form>
        </div>
      </div>

      {sortTable?.length > 0 ? (
        <div>
          <div className="c-container">
            <div className="table lg">
              <div className="row table-header">
                <div className="col col-label">
                  <button
                    className={
                      sortType === "dateUp"
                        ? "sort-btn up"
                        : sortType === "dateDown"
                        ? "sort-btn down"
                        : "sort-btn"
                    }
                    onClick={() => {
                      setSortType(
                        sortType === "dateUp" ? "dateDown" : "dateUp"
                      );
                    }}
                  >
                    {t("date")}
                    <SortArrows />
                  </button>
                </div>

                <div className="col col-label">
                  <button
                    className={
                      sortType === "companyUp"
                        ? "sort-btn up"
                        : sortType === "companyDown"
                        ? "sort-btn down"
                        : "sort-btn"
                    }
                    onClick={() => {
                      setSortType(
                        sortType === "companyUp" ? "companyDown" : "companyUp"
                      );
                    }}
                  >
                    {t("company")}
                    <SortArrows />
                  </button>
                </div>

                <div className="col col-label">
                  <button
                    className={
                      sortType === "positionUp"
                        ? "sort-btn up"
                        : sortType === "positionDown"
                        ? "sort-btn down"
                        : "sort-btn"
                    }
                    onClick={() => {
                      setSortType(
                        sortType === "positionUp"
                          ? "positionDown"
                          : "positionUp"
                      );
                    }}
                  >
                    {t("position")}
                    <SortArrows />
                  </button>
                </div>

                <div className="col col-label">
                  <button
                    className={
                      sortType === "salaryUp"
                        ? "sort-btn up"
                        : sortType === "salaryDown"
                        ? "sort-btn down"
                        : "sort-btn"
                    }
                    onClick={() => {
                      setSortType(
                        sortType === "salaryUp" ? "salaryDown" : "salaryUp"
                      );
                    }}
                  >
                    {t("salary")}
                    <SortArrows />
                  </button>
                </div>

                <div className="col col-label">
                  <button
                    className={
                      sortType === "expUp"
                        ? "sort-btn up"
                        : sortType === "expDown"
                        ? "sort-btn down"
                        : "sort-btn"
                    }
                    onClick={() => {
                      setSortType(sortType === "expUp" ? "expDown" : "expUp");
                    }}
                  >
                    {t("experience")}
                    <SortArrows />
                  </button>
                </div>
              </div>
              <div className="table-body mulish">
                {sortTable.map((item, idx) => {
                  return (
                    <div key={idx} className={`row  ${idx}`}>
                      <div className="col date mulish">
                        {swapDayAndMonth(item["Date"])}
                      </div>
                      <div className="col company">
                        {item["Company"] === "" ? "" : item["Company"]}
                      </div>
                      <div className="col position">{item["Position"]}</div>
                      <div className="col salary">{item["Salary"]}</div>
                      <div className="col experience">
                        {item["Years of experience"] === ""
                          ? ""
                          : item["Years of experience"]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="table-mobile">
              {sortTable.map((mobileItem, mobIdx) => {
                return (
                  <div className="row fz14 fw400 c-black400" idx={mobIdx}>
                    <div className="thead">
                      <div>{t("date")}</div>
                      <div>{t("company")}</div>
                      <div>{t("position")}</div>
                      <div>{t("salary")}</div>
                      <div>{t("experience")}</div>
                    </div>
                    <div className="tbody">
                      <div className="date">{mobileItem["Date"]}</div>
                      <div className="company">
                        {mobileItem["Company"] === ""
                          ? "-"
                          : mobileItem["Company"]}
                      </div>
                      <div className="position">{mobileItem["Position"]}</div>
                      <div className="salary">{mobileItem["Salary"]}</div>
                      <div className="experience">
                        {mobileItem["Years of experience"] === ""
                          ? "-"
                          : mobileItem["Years of experience"]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-result-container">{t("No result")}</div>
      )}
      <div className="c-container">
        <div className="btn-wrap">
          <a href="/data.csv" className="btn white" download>
            <img src={downloadIcon} alt="Download" className="icon" />
            {t("download")}
          </a>
        </div>
      </div>
      <div className="c-container">
        <MailChimp />
      </div>
    </main>
  );
};

export default Main;
