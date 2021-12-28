import React, { memo } from "react";
import s from "./WelcomeHeader.module.scss";

export const WelcomeHeader = memo(() => {
  return (
    <div className={s["welcom-header-block"]}>
      <div className={s["welcom-header-block__icon"]}>
        <svg width="119" height="119" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M95 0H5C2.23858 0 0 2.23858 0 5V95C0 97.7614 2.23858 100 5 100H95C97.7614 100 100 97.7614 100 95V5C100 2.23858 97.7614 0 95 0Z" fill="#FF9B5F"/>
          <path d="M114 68H73C70.2386 68 68 70.2386 68 73V114C68 116.761 70.2386 119 73 119H114C116.761 119 119 116.761 119 114V73C119 70.2386 116.761 68 114 68Z" fill="#FF9B5F"/>
        </svg>
      </div>
      <div className={s["welcom-header-block__title"]}>
        <h1>
          Мои расходы
        </h1>
      </div>
    </div>
  );
});