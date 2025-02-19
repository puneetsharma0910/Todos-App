import { useState } from 'react'
import Navbar from './components/navbar'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <div className="container">
      <div className="bg-red-600">i am red</div>
     </div>
    </>
  )
}

export default App
