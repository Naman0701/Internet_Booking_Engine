import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { ProgressInterface } from "../../interface/DataInterface";
import { useAppSelector } from "../../redux/hooks";
import { currentProgress } from "../../redux/slice/checkerSlice";
import "./ProgressChecker.scss";

const ProgressChecker: FC = () => {
  const progress: number = useAppSelector(currentProgress);
  const {t}=useTranslation();
  const stages: ProgressInterface[] = [
    {
      progressId: 1,
      name: "Choose Room",
    },
    {
      progressId: 2,
      name: "Choose Add On",
    },
    {
      progressId: 3,
      name: "Checkout",
    },
  ];
  return (
    <span className="room-result-page__checker">
      {stages.map((progressStage: ProgressInterface,index) => {
        return (
          <span className="room-result-page__checker__step-section" key={index}>
            {progressStage.progressId <= progress ? (
              <button
                className={
                  progressStage.progressId < progress
                    ? "room-result-page__checker__step-section__step__select"
                    : "room-result-page__checker__step-section__step__active"
                }
              >
                &#x2713;
              </button>
            ) : (
              <button
                className={`room-result-page__checker__step-section__step`}
              ></button>
            )}

            <span className="room-result-page__checker__step-section__label">
              {progressStage.progressId}.{t(`${progressStage.name}`)}
            </span>
          <span className={progressStage.progressId<progress?"room-result-page__checker__seperator__active":"room-result-page__checker__seperator"}></span>

          </span>
        );
      })}
    </span>
  );
};

export default ProgressChecker;
