import { useState } from 'react'
import { hello, goodbye } from 'my-library'

function App() {
  const [name, setName] = useState('World')
  const [greeting, setGreeting] = useState('')

  const handleGreet = () => {
    setGreeting(hello(name))
  }

  const handleGoodbye = () => {
    setGreeting(goodbye(name))
  }

  return (
    <div>
      <h1>My Library Docs</h1>
      <div>
        <label>
          Name: 
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div style={{ margin: '1rem 0' }}>
        <button onClick={handleGreet}>Greet</button>
        <button onClick={handleGoodbye} style={{ marginLeft: '0.5rem' }}>Say Goodbye</button>
      </div>
      {greeting && <p data-testid="greeting-result">{greeting}</p>}
    </div>
  )
}

export default App
