import { useEffect, useState } from "react";
import "./styles/main.scss"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Papaparse from "papaparse"
import searchIcon from "./assets/search-icon.svg"
import downloadIcon from "./assets/download-icon.svg"

const titles = ["date", "company", "position", "salary", "years of experience"]

function App() {
  const [rows, setRows] = useState([])
  useEffect(() => {
    fetch("./data.csv")
      .then(res => res.text())
      .then(csv => {
        const json = Papaparse.parse(csv)
        json.data.shift()
        console.log("json.data", json.data)
        setRows(json.data)
      })
  }, [])

  return (
    <div className="App">
      <Header/>
      <main>
        <div className="container">
          <p className="fz16 lh18 c-black300">The tool allows to see general trends of salaries on Armenian IT market.</p>
          <p className="fz16 lh18 c-black300">Salaries are after taxes in Armenian Drams.</p>
          <p className="fz16 lh18 c-black300">The reported data is being translated to English and reviewed to exclude spam.</p>
          <p className="fz16 lh18 c-black300">If a person reported “350” salary, we make an assumption that it means 350 thousand AMD. </p>
          <p className="fz16 lh18 c-black300">You might request the data you submitted to be removed. To do it drop me an email to rafael[at]rahar[dot]net.</p>
          <p className="fz16 lh18 c-black300">Data is licensed under Open Data Commons Attribution License (ODC-By) v1, and available for download here.</p>
          
          <p className="fz16 lh18 c-black300 mt30">How this work:</p>
          <ol className="ol">
            <li className="li fz16 lh18 c-black300">You click on "Submit my report" button on the left;</li>
            <li className="li fz16 lh18 c-black300">You fill-in a simple form and submit the data. That"s it. No authentication or personal data needed.</li>
          </ol>
          
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
        <div className="container">
          <div className="mobile-items-container">
            {rows.map((row, idx) => {
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
            })}
          </div>
          <a href="" className="btn white" download>
            <img src={downloadIcon} alt="Download"  className="icon"/>
            Download in .CSV</a>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
