import './ZaboAdsBanner.css';

const ZaboAdsBanner = ({ width, height, zaboData, fetchData }) => {
  return (
    <div
      className="zabo-ads-banner"
      style={{
        width,
        height,
        backgroundColor: zaboData.background_color,
        color: zaboData.text_color,
        borderColor: zaboData.text_color
      }}
    >
      <div className="zabo-ads-banner__title">
        <h3 className="zabo-ads-banner__title--inner">
          { zaboData.title }
        </h3>
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
  )
}

export default ZaboAdsBanner;