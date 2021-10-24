import React from "react";

export const NavButton = ({ icon, title, url }) => {
  return (
    <button className="nav-bar-button">
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
}