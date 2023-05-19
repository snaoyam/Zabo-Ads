import './App.css'
import ZaboAds from './components/ZaboAds'

function App() {
  return (
    <div className="App">
      <ZaboAds />
      <ZaboAds width='300px' />
      <ZaboAds width='160px' />
      <ZaboAds width='250px' />
      <ZaboAds width='200px' />
      <ZaboAds width='300px' height='250px' />
      <ZaboAds width='336px' height='280px' />

      <br />

      <ZaboAds option='banner' />
      <ZaboAds option='banner' width='728px' height='90px' />
      <ZaboAds option='banner' width='970px' height='90px' />
      <ZaboAds option='banner' width='468px' height='90px' />
    </div>
  )
}

export default App
