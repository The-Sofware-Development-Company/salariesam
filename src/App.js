import { useEffect, useState } from 'react';
import './styles/main.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Papaparse from 'papaparse'

const titles = ['date', 'company', 'position', 'salary', 'years of experience']

function App() {
  const [rows, setRows] = useState([])
  useEffect(() => {
    fetch('./data.csv')
      .then(res => res.text())
      .then(csv => {
        const json = Papaparse.parse(csv)
        json.data.shift()
        console.log('json.data', json.data)
        setRows(json.data)
      })
  }, [])

  return (
    <div className="App">
      <Header/>
      <main>
        <div className="container">
          {rows.map((row, idx) => {
            // console.log('row', row.length)
            return (
              <div key={idx} className={`row  ${idx}`}>
                {row.map((item, itemIdx) => {
                  return (
                    <div className='d-flex'>
                      <div>{titles[itemIdx]}</div>
                      <div>{item}</div>
                    </div>
                  )
                })}
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
