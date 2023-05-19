import './App.css'
import ZaboAds from './components/ZaboAds'

function App() {
  return (
    <div className="App">
      <ZaboAds />
      <ZaboAds width='300px' />
      <ZaboAds width='200px' />
      <ZaboAds width='100px' />
    </div>
  )
}

export default App
