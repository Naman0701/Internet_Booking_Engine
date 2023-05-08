import { FC } from "react";
import "./Footer.scss";
import { useAppSelector } from "../../redux/hooks";
import { HotelData } from "../../interface/DataInterface";
import { useTranslation } from "react-i18next";
import { landingPageConfigData } from "../../redux/slice/configurationsSlice";

const Footer: FC = () => {
  const { t } = useTranslation();

  const configurationData: HotelData = useAppSelector(landingPageConfigData);

  return (
    <footer className="footer">
      <img
        src={configurationData.hotelLogo}
        className="footer__logo"
        alt="logo"
      />
      <span className="footer__text">
        <span className="footer__text__copyright">
          <span className="footer__text__copyright">&#169;</span>
          {configurationData.tenantName}.
        </span>
        {t("app.footer")}
      </span>
    </footer>
  );
};

export default Footer;
