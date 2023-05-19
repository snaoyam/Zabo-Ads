import { useState, useEffect } from 'react'
import { fetchZaboData } from './api/fetch'
import ZaboAdsBox from './ZaboAdsBox'
import ZaboAdsBanner from './ZaboAdsBanner'
import './ZaboAds.css'

const ZaboAds = ({ width = '300px', height = '90px', style = {}, option = '' }) => {
  const [ zaboData, setZaboData ] = useState(
    {
      poster_img: "",
      background_color: "",
      text_color: "",
      author: "",
      author_img: "",
      title: "",
      description: "",
      url: ""
    }
  )

  const fetchData = async () => {
    const data = await fetchZaboData()
    setZaboData(data)
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <a href={ zaboData.url } target="_blank" rel="noreferrer">
    <div className="zabo-ads" style={ style }>
      {
        option === 'banner' ?
        <ZaboAdsBanner width={ width } height={ height } zaboData={ zaboData } fetchData={ fetchData } /> :
        <ZaboAdsBox width={ width } zaboData={ zaboData } fetchData={ fetchData } />
      }
    </div>
    </a>
  )
}

export default ZaboAds;