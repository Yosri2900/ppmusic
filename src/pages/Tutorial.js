import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import discovering from "../discovering.png";
import listen from "../listen.png";
import seeicons from "../seeicons.png";

const Tutorial = () => {
  return (
    <>
      <div className="container">
        <h1 className="text-center fs-1">Welcome to ++Music!</h1>
        <div className="row">
          <div className="col-sm text-center">
            <p className="text-center">Discover Songs</p>
            <img
              src={discovering}
              alt={"discovering-img"}
              width={320}
              height={184}
              className="rounded"
            ></img>
          </div>
          <div className="col-sm text-center">
            <p className="text-center">Consult the Queue</p>
            <img
              src={listen}
              alt={"listen-img"}
              width={320}
              height={230}
              className="rounded"
            ></img>
          </div>
          <div className="col-sm text-center">
            <p className="text-center">Explore icons</p>
            <img
              src={seeicons}
              alt={"lookicons-img"}
              width={250}
              height={230}
              className="rounded"
            ></img>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <p className="text-center fs-1">Enjoy!</p>
      </div>
    </>
  );
};

export default Tutorial;
