import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Route from './routes'
import { MainPage } from './counter-color'
import { PalletsPage } from './palletsPage'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <div className='bg-white text-black dark:bg-black dark:text-white h-screen'>
      <Route path='/'>
        <MainPage />
      </Route>
      <Route path='/pallets'>
        <PalletsPage />
      </Route>
    </div>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
