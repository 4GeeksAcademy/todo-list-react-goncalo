import React from "react";
import ToRoman from "./ToRoman";

const Document = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index}>
            <ToRoman number={index} />
          </div>
        ))}
      </div>
      <div className="col-md-6">
        {[6, 7, 8, 9, 10].map((index) => (
          <div key={index}>
            <ToRoman number={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Document;
