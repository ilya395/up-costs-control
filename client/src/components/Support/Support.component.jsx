import React from "react";
import { SupportFormContainer } from "../../forms";

const Support = props => {

  return (
    <>
      <h2>
        Поддержка
      </h2>
      <div className="support-container">
        <SupportFormContainer {...props} />
      </div>
    </>
  );
}

export default Support;