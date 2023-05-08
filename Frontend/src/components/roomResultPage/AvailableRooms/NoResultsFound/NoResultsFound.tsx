import { useTranslation } from 'react-i18next';
import './NoResultsFound.scss';

const NoResultsFound = () => {
  const {t}=useTranslation();
  return (
    <div className="no-results-found">
      <span className="emoji">😢</span>
      <h2 className="title">{t("Sorry, No Results Found")}</h2>
      <p className="message">{t("We couldn't find any results for your search. Please try different search parameters.")}</p>
    </div>
  );
};

export default NoResultsFound;
