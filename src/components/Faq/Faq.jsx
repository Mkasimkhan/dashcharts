import React, { useState } from 'react';
import './Faq.css';
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";




const Faq = ({ faqsList }) => {
  const [activeFaqs, setActiveFaqs] = useState([]);

  const onToggleIsActive = (id) => {
    setActiveFaqs((prevActiveFaqs) =>
      prevActiveFaqs.includes(id)
        ? prevActiveFaqs.filter((faqId) => faqId !== id)
        : [...prevActiveFaqs, id]
    );
  };

  return (
    <div className="app-container">
      <div className="faqs-container">
        <h1 className="heading">FAQs</h1>
        <ul className="faqs-list">
          {faqsList.map((eachFaq) => {
            const isActive = activeFaqs.includes(eachFaq.id);
            return (
              <li key={eachFaq.id} className="faq-item">
                <div className="question-container">
                  <h1 className="question">{eachFaq.questionText}</h1>
                  <button
                    className="button"
                    type="button"
                    onClick={() => onToggleIsActive(eachFaq.id)}
                  >
                    {isActive ? <IoIosArrowDropup className='faqdropicon'/> : <IoIosArrowDropdown className='faqdropicon'/>}
                  </button>
                </div>
                {isActive && (
                  <>
                    <hr className="horizontal-line" />
                    <p className="answer">{eachFaq.answerText}</p>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Faq;
