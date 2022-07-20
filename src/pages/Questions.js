import React, { useState } from "react";
import { faqs } from "../components/Faqs";

const Questions = () => {
  const [clicked, setClicked] = useState(null);
  const handleToggle = (text) => {
    if (clicked === text) {
      return setClicked(null);
    }
    setClicked(text);
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="text-center">Help</h1>

      <ul className="accordion">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            faq={faq}
            handleToggle={handleToggle}
            active={clicked}
          />
        ))}
      </ul>
    </div>
  );
};

const AccordionItem = ({ faq, active, handleToggle }) => {
  const { question, answer } = faq;
  return (
    <li className={`accordion-item ${active === question ? "active" : ""}`}>
      <button className="button" onClick={() => handleToggle(question)}>
        {question}
        <span className="control">{active === question ? "—" : "+"}</span>
      </button>
      <div className={`answer-wrapper ${active === question ? "open" : ""}`}>
        <div className="answer">{answer}</div>
      </div>
    </li>
  );
};

export default Questions;
