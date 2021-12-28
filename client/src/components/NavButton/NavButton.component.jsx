import React, { memo } from "react";

export const NavButton = memo(({ icon, title, url, callback }) => {

  const onClick = () => {
    return callback && callback()
  }

  return (
    <button
      className="nav-bar-button"
      onClick={onClick}
    >
      <div className="nav-bar-button__icon">
        {icon()}
      </div>
      <div className="nav-bar-button__title">
        <h4 className="simple-text_menu">
          {title}
        </h4>
      </div>
    </button>
  );
});