import { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import TestController from './modules/test/test.controller'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" >ADJ-DEMO</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Inicio</h2>
        <hr />
        <button onClick={() => TestController.callToApi()} className="btn btn-success">Llama a mi Api</button>
      </div>
    </>
  )
}

export default App
