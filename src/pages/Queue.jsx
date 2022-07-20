import React, { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
// import Draggable from 'react-draggable';

const Queue = ({ queue, clearQueue, removeFromQueue, setShowQueue }) => {
  const [showPlay, setShowPlay] = useState(null);
  const queueRef = useRef();

  const handleCloseQueue = () => {
    queueRef.current.classList.remove("animate-fade-in");
    queueRef.current.classList.add("animate-fade-out");
    setTimeout(() => {
      setShowQueue(false);
    }, 150);
  };

  const play = (title) => {
    if (showPlay === title) {
      setShowPlay(null);
      return;
    }
    setShowPlay(title);
  };

  return (
    <div className="main" onClick={() => handleCloseQueue()}>
      <div
        className="main-bar"
        ref={queueRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="queue-cart">
          Queue{" "}
          <sup>
            {" "}
            <button
              className="btn-closequeue"
              onClick={() => setShowQueue(false)}
            >
              X
            </button>
          </sup>
        </h3>
        <div className="under-queue">
          {queue.map(
            (item) => (
              <div className="new-song" key={item.SongNumber}>
                <p style={{ color: "white", fontWeight: "bold" }}>
                  {item.Title}
                </p>
                <h3>{item.Duration} mins</h3>

                <div className="btn-container">
                  <button
                    className="btn-closequeue"
                    onClick={() => removeFromQueue(item.SongNumber)}
                  >
                    <FaTrash />
                  </button>
                  <button className="btn-closequeue">
                    {" "}
                    <AiFillHeart className="heart" />{" "}
                  </button>
                  <button
                    className="btn-closequeue"
                    onClick={() => play(item.Title)}
                  >
                    {showPlay === item.Title ? (
                      <AiFillPauseCircle />
                    ) : (
                      <AiFillPlayCircle />
                    )}
                  </button>
                </div>
              </div>
            )
            // console.log(item)
          )}
          {queue.length > 0 ? (
            <button className="btn-closequeue" onClick={() => clearQueue()}>
              Clear All
            </button>
          ) : (
            <p style={{ fontWeight: "bold" }}>Add Songs...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queue;
