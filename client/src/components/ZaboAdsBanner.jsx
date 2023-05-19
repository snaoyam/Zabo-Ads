import './ZaboAdsBanner.css';

const ZaboAdsBanner = ({ width, height, zaboData }) => {
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
        <h3> { zaboData.title } </h3>
      </div>
      <img
        className="zabo-ads-banner__logo"
        src={zaboData.text_color.toLowerCase() === "#ffffff" ?
          "/zabo_logo--white.svg" :
          "/zabo_logo.svg"
        }
        alt="Zabo"
      />
    </div>
  )
}

export default ZaboAdsBanner;