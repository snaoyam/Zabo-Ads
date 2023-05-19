import { useState, useEffect } from 'react'
import { fetchZaboData } from '../api/fetch'
import './ZaboAds.css'

const ZaboAds = () => {
  const [ zaboData, setZaboData ] = useState(
    {
      poster: "",
      background_color: "",
      text_color: "",
      author: "",
      author_img: "",
      title: "",
      description: ""
    }
  )
  const [ isHorizontal, setIsHorizontal ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchZaboData()
      setZaboData(data)
    }
    fetchData();
  }, [])

  useEffect(() => {
    const img = new Image()
    img.src = zaboData.poster
    img.onload = () => {
      if (img.width >= img.height) {
        setIsHorizontal(true)
      } else {
        setIsHorizontal(false)
      }
    }
  }, [ zaboData ])

  return (
    <div className="zabo-ads">
      <div
        className="zabo-ads__container"
        style={{
          backgroundColor: zaboData.background_color,
          color: zaboData.text_color,
          borderColor: zaboData.text_color
        }}
      >
        <div className="zabo-ads__content">
          <img
            className="zabo-ads__content__image"
            src={ zaboData.poster }
            style={
              isHorizontal ?
              { filter: "blur(3px)" } :
              {}
            }
            alt="Zabo Poster"
          />
          <div className={isHorizontal ?
            "zabo-ads__content__text--horizontal" :
            "zabo-ads__content__text"
          }>
            <div className="zabo-ads__content__title">
              <h3> { zaboData.title } </h3>
            </div>
            <div className="zabo-ads__content__description">
              <p> { zaboData.description } </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZaboAds;