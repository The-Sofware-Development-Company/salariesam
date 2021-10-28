import { useEffect, useState } from 'react';
import './styles/main.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Papaparse from 'papaparse'

function App() {
  const [rows, setRows] = useState([])
  useEffect(() => {
    fetch('./data.csv')
      .then(res => res.text())
      .then(csv => {
        const json = Papaparse.parse(csv)
        setRows(json.data)
      })
  }, [])

  return (
    <div className="App">
      <Header/>
      <main>
        <div className="container">
          {rows.map((row, idx) => {
            return (
              <div key={idx} className={`row  ${idx}`}>
                <div className="col date">{JSON.stringify(row[0])}</div>
                <div className="col company">{JSON.stringify(row[1])}</div>
                <div className="col position">{JSON.stringify(row[2])}</div>
                <div className="col salary">{JSON.stringify(row[3])}</div>
                <div className="col experience">{JSON.stringify(row[4])}</div>
              </div>
            )
          })}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
