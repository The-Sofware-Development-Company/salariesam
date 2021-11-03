import React, { useEffect, useState } from "react";
import Papaparse from "papaparse"
import searchIcon from "../../assets/search-icon.svg"
import downloadIcon from "../../assets/download-icon.svg"
import './styles.scss'
import About from "../About/About";

const titles = ["date", "company", "position", "salary", "years of experience"]

  // const [rows, setRows] = useState([])
  // useEffect(() => {
  //   fetch("./data.csv")
  //     .then(res => res.text())
  //     .then(csv => {
  //       const json = Papaparse.parse(csv)
  //       json.data.shift()
  //       console.log("json.data", json.data)
  //       setRows(json.data)
  //     })
  // }, [])

const Main = () => {

    const [rows, setRows] = useState({});
    const [sortType, setSortType] = useState();

    useEffect(() => {
        fetch('./data.csv')
        .then(res => res.text())
        .then(csv => {
            const json = Papaparse.parse(csv)
            setRows(transformData(json.data))
        })
    }, [])

    const transformData = (payload) => {
        const headers = payload[0];
        const [first, ...data] = payload;

        const transformedData = data.map((item, index) => {
        let obj = {};
        item.forEach((i, idx) => {
            obj[headers[idx]] = i;
        })
        return obj;
        });

        return transformedData;
    }

    const sortTable = (arg) => {
        if (arg == "dateUp") {
        rows.sort((a, b) => new Date(b["Date"]) - new Date(a["Date"]));
        }
        else if (arg == "dateDown") {
        rows.sort((a, b) => new Date(a["Date"]) - new Date(b["Date"]));
        }
        else if (arg == "companyUp") {
        rows.sort((a, b) => a["Company"] > b["Company"] ? 1 : -1);
        }
        else if (arg == "companyDown") {
        rows.sort((a, b) => b["Company"] > a["Company"] ? 1 : -1);
        }
        else if (arg == "positionUp") {
        rows.sort((a, b) => a["Position"] > b["Position"] ? 1 : -1);
        }
        else if (arg == "positionDown") {
        rows.sort((a, b) => b["Position"] > a["Position"] ? 1 : -1);
        }
        else if (arg == "salaryUp") {
        rows.sort((a, b) => {
            if (a["Salary"] !== undefined && b["Salary"] !== undefined) {
            return +a["Salary"].split(',').join('') > +b["Salary"].split(',').join('') ? 1 : -1
            }
        });
        }
        else if (arg == "salaryDown") {
        rows.sort((a, b) => {
            if (a["Salary"] !== undefined && b["Salary"] !== undefined) {
            return +b["Salary"].split(',').join('') > +a["Salary"].split(',').join('') ? 1 : -1
            }
        });
        }
        else if (arg == "expUp") {
        rows.sort((a, b) => {
            if (a["Years of experience"] !== undefined && b["Years of experience"] !== undefined) {
            return +a["Years of experience"].split(',').join('') > +b["Years of experience"].split(',').join('') ? 1 : -1
            }
        });
        }
        else if (arg == "expDown") {
        rows.sort((a, b) => {
            if (a["Years of experience"] !== undefined && b["Years of experience"] !== undefined) {
            return +b["Years of experience"].split(',').join('') > +a["Years of experience"].split(',').join('') ? 1 : -1
            }
        });
        }

        setRows((prev) => [...prev, rows]);
    }


    return (
        <main>
            
            <About/>
            <div className="container">
                <div className="form-btn-wrapper mt30">
                    <a href="https://docs.google.com/forms/d/1M4ztN09EvaminyLIDH4rOgtnr0lW-AHEYXiThbpAZa0/viewform?edit_requested=true" className="btn dark">Submit my report</a>
                    <form action="">
                    <label htmlFor="search" hidden>Search</label>
                    <div className="input-wrapper">
                        <img className="search-icon" src={searchIcon} alt="Search"/>
                        <input className="search-input" type="text" placeholder="Search"/>
                    </div>
                    </form>
                </div>
            </div>
            
            {
            rows.length > 0 ?
                <main>
                    <div className="container">

                        <div className="row">
                        <div
                            className="col col-label"
                            onClick={() => {
                            setSortType(sortType == "dateUp" ? "dateDown" : "dateUp");
                            sortTable(sortType == "dateUp" ? "dateDown" : "dateUp");
                            }}
                        >
                            Date

                            <span className="col-icon-container">
                            <img
                                // src={TopArrowInactive}
                                className={sortType == "dateUp" ? "active" : ""}
                            />
                            <img
                                // src={DownArrowInactive}
                                className={sortType == "dateDown" ? "active" : ""}
                            />
                            </span>
                        </div>

                        <div
                            className="col col-label"
                            onClick={() => {
                            setSortType(sortType == "companyUp" ? "companyDown" : "companyUp");
                            sortTable(sortType == "companyUp" ? "companyDown" : "companyUp");
                            }}
                        >
                            {/* {JSON.stringify(rows[0][1])} */}
                            Company

                            <span className="col-icon-container">
                            <img
                                // src={TopArrowInactive}
                                className={sortType == "companyUp" ? "active" : ""}
                            />
                            <img
                                // src={DownArrowInactive}
                                className={sortType == "companyDown" ? "active" : ""}
                            />
                            </span>
                        </div>

                        <div
                            className="col col-label"
                            onClick={() => {
                            setSortType(sortType == "positionUp" ? "positionDown" : "positionUp");
                            sortTable(sortType == "positionUp" ? "positionDown" : "positionUp");
                            }}
                        >
                            {/* {JSON.stringify(rows[0][2])} */}
                            Position

                            <span className="col-icon-container">
                            <img
                                // src={TopArrowInactive}
                                className={sortType == "positionUp" ? "active" : ""}
                            />
                            <img
                                // src={DownArrowInactive}
                                className={sortType == "positionDown" ? "active" : ""}
                            />
                            </span>
                        </div>

                        <div
                            className="col col-label"
                            onClick={() => {
                            setSortType(sortType == "salaryUp" ? "salaryDown" : "salaryUp");
                            sortTable(sortType == "salaryUp" ? "salaryDown" : "salaryUp");
                            }}
                        >
                            {/* {JSON.stringify(rows[0][3])} */}
                            Salary

                            <span className="col-icon-container">
                            <img
                                // src={TopArrowInactive}
                                className={sortType == "salaryUp" ? "active" : ""}
                            />
                            <img
                                // src={DownArrowInactive}
                                className={sortType == "salaryDown" ? "active" : ""}
                            />
                            </span>
                        </div>

                        <div
                            className="col col-label"
                            onClick={() => {
                            setSortType(sortType == "expUp" ? "expDown" : "expUp");
                            sortTable(sortType == "expUp" ? "expDown" : "expUp");
                            }}
                        >
                            {/* {JSON.stringify(rows[0][4])} */}
                            Years of experience

                            <span className="col-icon-container">
                            <img
                                // src={TopArrowInactive}
                                className={sortType == "expUp" ? "active" : ""}
                            />
                            <img
                                // src={DownArrowInactive}
                                className={sortType == "expDown" ? "active" : ""}
                            />
                            </span>
                        </div>
                        </div>

                        {rows.map((item, idx) => {
                        return (
                            <div key={idx} className={`row  ${idx}`}>
                            <div className="col date">{item["Date"]}</div>
                            <div className="col company">{item["Company"] == "" ? '""' : item["Company"]}</div>
                            <div className="col position">{item["Position"]}</div>
                            <div className="col salary">{item["Salary"]}</div>
                            <div className="col experience">{item["Years of experience"] == "" ? '""' : item["Years of experience"]}</div>
                            </div>
                        )
                        })}
                    </div>
                </main>
                : null
            }
            <div className="container">
            <div className="mobile-items-container">
                {/* {rows.map((row, idx) => {
                return (
                    <div key={idx} className={`item-mobile  ${idx}`}>
                    {row.map((item, itemIdx) => {
                        return (
                        <div className="line-wrap fz14 c-black">
                            <div className="col">{titles[itemIdx]}</div>
                            <div className="col">{item === "" ? "-" : item}</div>
                        </div>
                        )
                    })}
                    </div>
                )
                })} */}
            </div>
            <a href="" className="btn white" download>
                <img src={downloadIcon} alt="Download"  className="icon"/>
                Download in .CSV</a>
            </div>
        </main>
    )
}

export default Main 