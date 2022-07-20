import React, { useState, useEffect } from "react";
import { data } from "../data/songdata";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CgPlayListAdd } from "react-icons/cg";
import { BsHeadphones } from "react-icons/bs";
import Queue from "./Queue";
import Alert from "../components/Alert";

export const favoriteList = [];
const getLocalStorage = () => {
  let list = localStorage.getItem("queue");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("queue")));
  } else {
    return [];
  }
};

function Home() {
  const dataCopy = [...data];
  const LIMIT = data.length;
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(6);
  let toShow = dataCopy.slice(start, end);
  const [showQueue, setShowQueue] = useState(false);
  const [queue, setQueue] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [defaultCategory, setDefaultCategory] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const classicSongs = dataCopy.filter((t) => t.Title.includes("ca"));
  const hipHopSongs = dataCopy.filter((t) => t.Title.includes("hi"));
  const jazzSongs = dataCopy.filter((t) => t.Title.includes("az"));

  const prevItems = () => {
    setStart((start) => {
      var newStart = start - 6;
      if (newStart < 0) {
        newStart = LIMIT - 7;
      }
      // console.log(`start is ${newStart}`);
      return checkNumber(newStart);
    });

    setEnd((end) => {
      var newEnd = end - 6;
      if (newEnd === 0) {
        newEnd = LIMIT - 1;
      }
      // console.log(`end is ${newEnd}`);
      return checkNumber(newEnd);
    });
  };

  const randomItems = () => {
    let [first, second] = generateTwoNumbers(LIMIT);

    if (first === start) {
      first = start + 6;
    }

    if (second === end) {
      second = end + 6;
    }
    setStart(checkNumber(first));
    setEnd(checkNumber(second));
  };

  const nextItems = () => {
    setStart((start) => {
      let newStart = start + 6;
      return checkNumber(newStart);
    });

    setEnd((end) => {
      let newEnd = end + 6;
      return checkNumber(newEnd);
    });
  };

  const generateTwoNumbers = (limit) => {
    var a = Math.floor(Math.random() * limit);
    var b = Math.floor(Math.random() * limit);

    while (b - a !== 6 && b < limit) {
      a = Math.floor(Math.random() * limit);
      b = Math.floor(Math.random() * limit);
    }

    return [a, b];
  };

  const checkNumber = (number) => {
    // if (number < 0) return LIMIT - 1;
    if (number > LIMIT - 1) return 0;

    return number;
  };

  //Handle add to cart
  const addToQueue = (song) => {
    if (queue.length <= 6) {
      setQueue((prev) => {
        const findProductInCart = prev.find(
          (item) => item.SongNumber === song.SongNumber
        );

        if (findProductInCart) {
          showAlert(true, "danger", `(${song.Title}) already in the Queue`);
          return prev.map((item) =>
            item.SongNumber === song.SongNumber ? { ...item } : item
          );
        }

        showAlert(true, "success", `(${song.Title}) added in the Queue`);
        return [...prev, { ...song }];
      });
    } else {
      showAlert(true, "danger", `The Queue is full! (limit of 7) `);
      return;
    }
  };

  // Handle remove from queue
  const removeFromQueue = (id) => {
    const newQueue = queue.filter((song) => song.SongNumber !== id);
    setQueue(newQueue);
  };

  const clearQueue = () => {
    queue.length === 1
      ? showAlert(true, "success", "All Song removed from Queue")
      : showAlert(true, "success", "All Songs removed from Queue");

    setQueue([]);
  };

  useEffect(() => {
    localStorage.setItem("queue", JSON.stringify(queue));
  }, [queue]);

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const filter = (type) => {
    if (type === "All") {
      setIsFiltering(true);
      setDefaultCategory("All");
      return;
    }
    setIsFiltering(false);
    if (type === "ca") {
      setDefaultCategory("classic");
    } else if (type === "hi") {
      setDefaultCategory("hip-hop");
    } else if (type === "az") {
      setDefaultCategory("jazz");
    }
  };

  return (
    <>
      <div className="filter-container">
        <button
          type="button"
          className={`${defaultCategory === "All" && "btn-act"}`}
          onClick={() => filter("All")}
        >
          All
        </button>
        <button
          type="button"
          className={`${defaultCategory === "classic" && "btn-act"}`}
          onClick={() => filter("ca")}
        >
          Classic
        </button>
        <button
          type="button"
          className={`${defaultCategory === "hip-hop" && "btn-act"}`}
          onClick={() => filter("hi")}
        >
          Hip-hop
        </button>
        <button
          type="button"
          className={`${defaultCategory === "jazz" && "btn-act"}`}
          onClick={() => filter("az")}
        >
          Jazz
        </button>
      </div>
      {alert.show && <Alert {...alert} removeAlert={showAlert} queue={queue} />}

      {isFiltering && defaultCategory === "All" ? (
        <section className="songlist">
          {toShow.map((song) => {
            return (
              <SpecificSong
                key={song.SongNumber}
                {...song}
                addToQueue={addToQueue}
              />
            );
          })}
        </section>
      ) : defaultCategory === "classic" ? (
        <section className="songlist">
          {classicSongs.map((song) => {
            return (
              <SpecificSong
                key={song.SongNumber}
                {...song}
                addToQueue={addToQueue}
              />
            );
          })}
        </section>
      ) : defaultCategory === "hip-hop" ? (
        <section className="songlist">
          {hipHopSongs.map((song) => {
            return (
              <SpecificSong
                key={song.SongNumber}
                {...song}
                addToQueue={addToQueue}
              />
            );
          })}
        </section>
      ) : defaultCategory === "jazz" ? (
        <section className="songlist">
          {jazzSongs.map((song) => {
            return (
              <SpecificSong
                key={song.SongNumber}
                {...song}
                addToQueue={addToQueue}
              />
            );
          })}
        </section>
      ) : (
        <p style={{ fontWeight: "bold" }}>Please select a filter.</p>
      )}

      {isFiltering && (
        <div className="arrows-container">
          <button className="btn-prev" onClick={prevItems}>
            <FaChevronLeft></FaChevronLeft>
          </button>
          <button className="btn-next" onClick={nextItems}>
            <FaChevronRight></FaChevronRight>
          </button>
        </div>
      )}
      {isFiltering && (
        <div className="btn-container">
          <button className="btn-surprise" onClick={randomItems}>
            Surprise Me
          </button>
        </div>
      )}

      <button className="btn-listen" onClick={() => setShowQueue(true)}>
        <BsHeadphones className="headphones-logo"></BsHeadphones>
        Listen <sup>{queue.length}</sup>
      </button>

      {showQueue && (
        <Queue
          queue={queue}
          clearQueue={clearQueue}
          removeFromQueue={removeFromQueue}
          setShowQueue={setShowQueue}
        />
      )}
    </>
  );
}

const SpecificSong = ({
  SongNumber,
  SongID,
  ArtistName,
  Title,
  Duration,
  addToQueue,
}) => {
  const fixDuration = (duration) => {
    var decimal = (duration - Math.floor(duration)).toFixed(2);
    if (decimal > 0.59) {
      return Math.ceil(duration).toString();
    }
    var stringNum = duration.toFixed(2).toString();
    stringNum = stringNum.replace(".", ":");
    return stringNum;
  };

  return (
    <article className="song">
      <h5>{(Title = Title.replace(/[^a-zA-Z ]/g, ""))}</h5>
      <span style={{ fontWeight: "bold" }}>
        {(Duration = fixDuration(Duration / 60))} mins
      </span>
      <div>
        <button
          className="add-song"
          onClick={() => addToQueue({ SongNumber, Title, Duration })}
        >
          <CgPlayListAdd />
        </button>
      </div>
    </article>
  );
};

export default Home;
