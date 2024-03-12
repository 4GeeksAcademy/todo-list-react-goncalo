import React from "react";

const ToRoman = ({ number }) => {
    const toRoman = (num) => {
      const romanNumerals = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
      };
      let result = "";
      for (const key in romanNumerals) {
        while (num >= romanNumerals[key]) {
          result += key;
          num -= romanNumerals[key];
        }
      }
      return result;
    };
  
    return <>{toRoman(number)}</>;
  };
  
export default ToRoman