import { useState, useEffect } from 'react'
import { fetchZaboData } from '../api/fetch'
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
      description: ""
    }
  )

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchZaboData()
      setZaboData(data)
    }
    fetchData();
  }, [])

  return (
    <div className="zabo-ads" style={ style }>
      {
        option === 'banner' ?
        <ZaboAdsBanner width={ width } height={ height } zaboData={ zaboData } /> :
        <ZaboAdsBox width={ width } zaboData={ zaboData } />
      }
    </div>
  )
}

export default ZaboAds;