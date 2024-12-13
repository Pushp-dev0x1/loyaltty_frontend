import React, { useEffect } from "react";

const EmailCampaignCard = ({
  transitioning,
  title,
  themeColor,
  textColor,
  rewardtype,
  discountValue,
  bannerImage,
  logo,
  description,
  contactno,
  terms,
  expiry,
  main_url,
  discount,
}) => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div
      className={`edit-camp-card ${transitioning}`}
      style={{ color: "#000", backgroundColor: themeColor }}
    >
      <div className="card-header-email">
        <img alt="banner_image" className="banner_image" src={bannerImage} />
        {discount ? (
          <div
            className="discount-badge"
            style={{ backgroundColor: themeColor, color: textColor }}
          >
            <span className="discount-text">
              {discount}
              {rewardtype == "amount" ? "$" : "%"} OFF
            </span>
          </div>
        ) : null}
      </div>

      <div className="card-logo-div-creative">
        <img
          alt="Company Logo"
          className="card-logo-image"
          src={logo}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div>

      <div className="card-content">
        <h3 className="camptitle-emailtitle" style={{ color: textColor }}>
          {title}
        </h3>
        <p className="desc-emailtitle" style={{ color: textColor }}>
          {description}
        </p>
        <hr style={{ background: textColor }} />
        <h5>Expires on {expiry}</h5>
        {discountValue ? (
          <h5>`On minimum purchase of $${discountValue}`</h5>
        ) : null}

        <p className="terms-points-creative" style={{ color: textColor }}>
          {terms}
        </p>
        <p className="foot-creative">The campaign can be redeemed once.</p>
        <p className="foot-creative">
          Call <u>{contactno}</u> for more details
        </p>
      </div>
    </div>
  );
};

const styles = `
  .edit-camp-card {
    width: 300px;
    height: 500px;
    border-radius: 20px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .card-header {
    height: 220px;
    overflow: hidden;
    position: relative;
  }
  .banner_image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .discount-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 10px 15px;
    border-radius: 25px;
    font-weight: bold;
    font-size: 18px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .discount-badge:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  .discount-text {
    display: inline-block;
    transform: skew(-10deg);
  }
  .card-logo-div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: 170px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: 3px solid #fff;
    background-color: #fff;
  }
  .card-logo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  // .card-content {
  //   padding: 30px 20px;
  //   flex-grow: 1;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;
  // }
  .camptitle {
    font-size: 26px;
    margin-bottom: 15px;
    line-height: 1.3;
  }
  .desc {
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.5;
  }
  hr {
    margin: 20px 0;
    border: none;
    height: 1px;
  }
  h5 {
    font-size: 16px;
    margin-bottom: 2px;
  }
  .terms-points {
    font-size: 14px;
    margin-bottom: 10px;
    line-height: 1.6;
  }
  .foot {
    font-size: 14px;
    margin-top: 8px;
  }
  @media screen and (max-width: 768px) {
    .edit-camp-card {
      width: 90%;
      max-width: 320px;
      height: 520px;
    }
    .card-header {
      height: 200px;
    }
    .banner_image {
      object-position: center;
    }
    .discount-badge {
      font-size: 16px;
      padding: 8px 12px;
    }
    .card-logo-div {
      width: 90px;
      height: 90px;
      top: 155px;
      left: 15px;
    }
    .card-content {
      padding: 25px 15px;
    }
    .camptitle {
      font-size: 24px;
      line-height: 1.2;
      margin-bottom: 12px;
    }
    .desc {
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 15px;
    }
    h5 {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .terms-points {
      font-size: 12px;
      line-height: 1.4;
      margin-bottom: 15px;
    }
    .foot {
      font-size: 12px;
      margin-top: 6px;
    }
  }
`;

export default EmailCampaignCard;
