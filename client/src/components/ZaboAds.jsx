import { useState, useEffect } from 'react'
import { fetchZaboData } from '../api/fetch'
import './ZaboAds.css'

const ZaboAds = () => {
  const [ zaboData, setZaboData ] = useState(
    {
      "poster": "https://sparcs-kaist-zabo-prod.s3.ap-northeast-2.amazonaws.com/zabo/zabo-136421683085229471",
      "background_color": "#643671",
      "text_color": "#ffffff",
      "author": "SPARCS",
      "author_img": "https://sparcs-kaist-zabo-prod.s3.ap-northeast-2.amazonaws.com/profile/group-1583234938504",
      "title": "Taxi: Kaist를 위한 택시 승차 공유 서비스",
      "description": "택시 탑승 인증 이벤트 및 인스타그램 공유 이벤트 진행 중!"
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
    <div className="zabo-ads">
      <div
        className="zabo-ads__container"
        style={{
          backgroundColor: zaboData.background_color,
          color: zaboData.text_color
        }}
      >
        <div className="zabo-ads__content">
          <img
            className="zabo-ads__content__image"
            src={ zaboData.poster }
            alt="Zabo Poster"
          />
          <div className="zabo-ads__content__title">
            <h3>
              { zaboData.title }
            </h3>
          </div>
          <div className="zabo-ads__content__description">
            <p>
              { zaboData.description }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZaboAds;