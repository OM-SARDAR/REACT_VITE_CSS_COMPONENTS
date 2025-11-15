import React from "react";
import "./Banner.css";

import fake3d1 from "./FIles/images/can_2.png";
import fake3d2 from "./FIles/images/Contents.png";
import orange3 from "./FIles/images/orange_3.png";
import orange2 from "./FIles/images/orange_2.png";
import orange1 from "./FIles/images/orange_1.png";

import fake3d3 from "./FIles/images/can_2.png";
import fake3d4 from "./FIles/images/Contents_2.png";
import pineapple3 from "./FIles/images/pineapple_3.png";
import pineapple2 from "./FIles/images/pineapple_2.png";
import pineapple1 from "./FIles/images/pineapple_1.png";

function Banner() {
  return (
    <div className="fake-body">
      <div className="fake-center">
        <input type="checkbox" id="toggle" />

        <div className="fake-main">
          <div className="fake-layers">
            <div className="layer">
              <div className="fake-text">Orange</div>

              <div className="fake-container">
                <div className="can">
                  <img src={fake3d1} alt="" />
                </div>

                <div className="fake-wrapper">
                  <img src={fake3d2} alt="" />
                </div>
              </div>

              <div className="fruits">
                <img src={orange3} alt="" />
                <img src={orange2} alt="" />
                <img src={orange1} alt="" />
              </div>

              <label htmlFor="toggle" className="btn-text">
                Click to Slide
              </label>
            </div>

            <div className="layer">
              <div className="fake-text">Pineapple</div>

              <div className="fake-container">
                <div className="can">
                  <img src={fake3d3} alt="" />
                </div>

                <div className="fake-wrapper">
                  <img src={fake3d4} alt="" />
                </div>
              </div>

              <div className="fruits">
                <img src={pineapple3} alt="" />
                <img src={pineapple2} alt="" />
                <img src={pineapple1} alt="" />
              </div>

              <label htmlFor="toggle">Click to Slide</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
