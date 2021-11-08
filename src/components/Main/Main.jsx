import React, { useCallback, useEffect, useMemo, useState } from "react";
import Papaparse from "papaparse"
import searchIcon from "../../assets/search-icon.svg"
import downloadIcon from "../../assets/download-icon.svg"
import './styles.scss'
import About from "../About/About";
import SortArrows from "../SortArrows/SortArrows";

const titles = ["date", "company", "position", "salary", "years of experience"];
let copyOfRows = [];

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

    const [rows, setRows] = useState([]);
    const [sortType, setSortType] = useState();

    useEffect(() => {
        fetch('./data.csv')
            .then(res => res.text())
            .then(csv => {
                const json = Papaparse.parse(csv)
                setRows(transformData(json.data))
                copyOfRows = transformData(json.data)
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

    const sortTable = useMemo(() => {
        let result = [...rows];

        if (sortType === "dateUp") {
            result.sort((a, b) => new Date(b["Date"]) - new Date(a["Date"]));
        }
        else if (sortType === "dateDown") {
            result.sort((a, b) => new Date(a["Date"]) - new Date(b["Date"]));
        }
        else if (sortType === "companyUp") {
            result.sort((a, b) => a["Company"] > b["Company"] ? 1 : -1);
        }
        else if (sortType === "companyDown") {
            result.sort((a, b) => b["Company"] > a["Company"] ? 1 : -1);
        }
        else if (sortType === "positionUp") {
            result.sort((a, b) => a["Position"] > b["Position"] ? 1 : -1);
        }
        else if (sortType === "positionDown") {
            result.sort((a, b) => b["Position"] > a["Position"] ? 1 : -1);
        }
        else if (sortType === "salaryUp") {
            result.sort((a, b) => {
                if (a["Salary"] !== undefined && b["Salary"] !== undefined) {
                    return +a["Salary"].split(',').join('') > +b["Salary"].split(',').join('') ? 1 : -1
                }
            });
        }
        else if (sortType === "salaryDown") {
            result.sort((a, b) => {
                if (a["Salary"] !== undefined && b["Salary"] !== undefined) {
                    return +b["Salary"].split(',').join('') > +a["Salary"].split(',').join('') ? 1 : -1
                }
            });
        }
        else if (sortType === "expUp") {
            result.sort((a, b) => {
                if (a["Years of experience"] !== undefined && b["Years of experience"] !== undefined) {
                    return +a["Years of experience"].split(',').join('') > +b["Years of experience"].split(',').join('') ? 1 : -1
                }
            });
        }
        else if (sortType === "expDown") {
            result.sort((a, b) => {
                if (a["Years of experience"] !== undefined && b["Years of experience"] !== undefined) {
                    return +b["Years of experience"].split(',').join('') > +a["Years of experience"].split(',').join('') ? 1 : -1
                }
            });
        }

        return result;

        // setRows((prev) => [...prev, rows]);
    }, [rows, sortType]);

    const handleChange = useCallback((e) => {
        searching(e.target.value);
    }, []);

    const searching = (value) => {
        setRows(copyOfRows);

        if (value !== '') {
            setRows((prev) => prev.filter((item) => {
                return (
                    item['Date'].includes(value.toLowerCase()) || item['Company'].toLowerCase().includes(value.toLowerCase()) ||
                    item['Position'].toLowerCase().includes(value.toLowerCase()) || item['Salary'].includes(value.toLowerCase()) ||
                    item['Years of experience'].includes(value.toLowerCase())
                )
            }));
        }
    }

    return (
        <main>
            <About />
            <div className="container">
                <div className="form-btn-wrapper mt30">
                    <a href="https://docs.google.com/forms/d/1M4ztN09EvaminyLIDH4rOgtnr0lW-AHEYXiThbpAZa0/viewform?edit_requested=true" className="btn dark">Submit my report</a>
                    <form action="">
                        <label htmlFor="search" hidden>Search</label>
                        <div className="input-wrapper">
                            <img className="search-icon" src={searchIcon} alt="Search" />
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Search"
                                onChange={handleChange}
                            />
                            <p>Showing {rows.length} of {copyOfRows.length != 0 ? copyOfRows.length : rows.length} entries</p>
                        </div>
                    </form>
                </div>
            </div>

            {
                sortTable?.length > 0 ?
                    <main>
                        <div className="container">
                            <div className="table">
                                <div className="row table-header">

                                    <div className="col col-label">
                                        <button
                                            className={sortType === "dateUp" ? "sort-btn up" : sortType === "dateDown" ? "sort-btn down" : "sort-btn"}
                                            onClick={() => {
                                                setSortType(sortType === "dateUp" ? "dateDown" : "dateUp");
                                                // sortTable(sortType === "dateUp" ? "dateDown" : "dateUp");
                                            }}>
                                            Date
                                            <SortArrows />
                                        </button>
                                    </div>

                                    <div className="col col-label">
                                        <button
                                            className={sortType === "companyUp" ? "sort-btn up" : sortType === "companyDown" ? "sort-btn down" : "sort-btn"}
                                            onClick={() => {
                                                setSortType(sortType === "companyUp" ? "companyDown" : "companyUp");
                                                // sortTable(sortType === "companyUp" ? "companyDown" : "companyUp");
                                            }}>
                                            Company
                                            <SortArrows />
                                        </button>
                                    </div>

                                    <div className="col col-label">
                                        <button
                                            className={sortType === "positionUp" ? "sort-btn up" : sortType === "positionDown" ? "sort-btn down" : "sort-btn"}
                                            onClick={() => {
                                                setSortType(sortType === "positionUp" ? "positionDown" : "positionUp");
                                                // sortTable(sortType === "positionUp" ? "positionDown" : "positionUp");
                                            }}>
                                            Position
                                            <SortArrows />
                                        </button>
                                    </div>

                                    <div className="col col-label">
                                        <button
                                            className={sortType === "salaryUp" ? "sort-btn up" : sortType === "salaryDown" ? "sort-btn down" : "sort-btn"}
                                            onClick={() => {
                                                setSortType(sortType === "salaryUp" ? "salaryDown" : "salaryUp");
                                                // sortTable(sortType === "salaryUp" ? "salaryDown" : "salaryUp");
                                            }}>
                                            Salary
                                            <SortArrows />
                                        </button>
                                    </div>

                                    <div className="col col-label">
                                        <button
                                            className={sortType === "expUp" ? "sort-btn up" : sortType === "expDown" ? "sort-btn down" : "sort-btn"}
                                            onClick={() => {
                                                setSortType(sortType === "expUp" ? "expDown" : "expUp");
                                                // sortTable(sortType === "expUp" ? "expDown" : "expUp");
                                            }}>
                                            Years of experience
                                            <SortArrows />
                                        </button>
                                    </div>
                                </div>
                                {sortTable.map((item, idx) => {
                                    return (
                                        <div key={idx} className={`row  ${idx}`}>
                                            <div className="col date">{item["Date"]}</div>
                                            <div className="col company">{item["Company"] === "" ? '""' : item["Company"]}</div>
                                            <div className="col position">{item["Position"]}</div>
                                            <div className="col salary">{item["Salary"]}</div>
                                            <div className="col experience">{item["Years of experience"] === "" ? '""' : item["Years of experience"]}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </main>
                    : <p>No result</p>
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
                            <div className="col">{item ==== "" ? "-" : item}</div>
                        </div>
                        )
                    })}
                    </div>
                )
                })} */}
                </div>
                <a href="" className="btn white" download>
                    <img src={downloadIcon} alt="Download" className="icon" />
                    Download in .CSV</a>
            </div>
        </main>
    )
}

export default Main