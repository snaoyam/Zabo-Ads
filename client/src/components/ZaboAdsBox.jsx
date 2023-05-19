import { useState, useEffect } from 'react';
import './ZaboAdsBox.css'

const ZaboAdsBox = ({ width, zaboData, fetchData }) => {
  const [ isHorizontal, setIsHorizontal ] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = zaboData.poster_img
    img.onload = () => {
      if (img.width >= img.height) {
        setIsHorizontal(true)
      } else {
        setIsHorizontal(false)
      }
    }
  }, [ zaboData ])

  return (
    <div
      className="zabo-ads__container"
      style={{
        width,
        backgroundColor: zaboData.background_color,
        color: zaboData.text_color,
        borderColor: zaboData.text_color
      }}
    >
      <div className="zabo-ads__content">
        <img
          className="zabo-ads__content__image"
          src={ zaboData.poster_img }
          style={{
            width: `calc(${width} - 20px)`,
            filter: isHorizontal ? "blur(3px)" : "",
          }}
          alt="Zabo Poster"
        />
        <div className={
          isHorizontal ?
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
        <img
          className="zabo-ads__logo"
          src={zaboData.text_color.toLowerCase() === "#ffffff" ?
            "/zabo_logo--white.svg" :
            "/zabo_logo.svg"
          }
          alt="Zabo"
        />
        <button
          className="zabo-ads__refresh"
          onClick={(e) => {
            e.preventDefault()
            fetchData()
          }}
          style={{
            color: zaboData.text_color,
          }}
        >
          {"↻"}
        </button>
      </div>
    </div>
  )
}

export default ZaboAdsBox;