import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './createquestion.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../SurveyList/Sidebar';
import Theme from '../Theme/Theme';
import Navigation from '../SurveyList/Navigation';
const REACT_APP_API_ENDPOINT='http://localhost:5001'

const CreateQuestion = () => {
  const email = localStorage.getItem('email')
  const surveyId = localStorage.getItem('id')
  const navigate = useNavigate();
  const preview = (e) => {
    e.preventDefault();
    navigate('/preview');
  };

  const [questionText, setQuestionText] = useState('question 1');
  const [option, setOption] = useState(['option1' , 'option2' ,'option3']);
  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    const respond = fetchData(`${REACT_APP_API_ENDPOINT}/ques/${surveyId}`)
  },[])

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleAddQuestion = () => {
    console.log(surveyId, email, questionText, option);
    const newQues = {surveyId, email, questionText, option
    };
        const respond = fetchData(`${REACT_APP_API_ENDPOINT}/ques/${surveyId}`)
        // console.log(`${REACT_APP_API_ENDPOINT}/ques/${surveyId}`)

      
  };
  
  function fetchData(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.result);
        setQuestions(data.result);
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleOptionChange = (questionId, option) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, selectedOption: option };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    navigate('/surveyItems');
  };

  return (
    <> <Navigation/>
    <div className="frame">
      <Sidebar />
      <div className="next-page-container">
        <div className="header-container">
          <div className="back-arrow">
            <FontAwesomeIcon icon={faArrowLeft} />
            <h2>Create Questions</h2>
          </div>
          
          <div className="buttons-container">
            <button className="preview-button" onClick={preview}>
              Preview
            </button>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <Theme />
          </div>
        </div>
        <hr />

        {/* Render existing questions */}
        <div className="pre">
        {questions.map((question, index) => (
          <div key={question.id} className="question-container">
            <div className="question-wrapper">
              <span className="question-number">{`Q${index + 1}`}</span>
              <span className="question-text">{`Question ${index + 1}:`}</span>
              <div>
                <textarea
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionTextChange(e, question.id)
                  }
                  placeholder="Enter your question here"
                ></textarea>
              </div>
            </div>

            {question.option.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`question${question.id}`}
                    value={option}
                    checked={question.selectedOption === option}
                    onChange={() => handleOptionChange(question.id, option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}

        {/* Render new question input */}
        <div className="question-container">
          <div className="question-wrapper">
            <span className="question-number">{`Q${questions.length + 1}`}</span>
            <span className="question-text">{`Question ${questions.length + 1}:`}</span>
            <div>
              <textarea
                value={questionText}
                onChange={handleQuestionTextChange}
                placeholder="Enter your question here"
              ></textarea>
            </div>
          </div>
          {/* Add options for new question */}
          {['Option 1', 'Option 2', 'Option 3'].map((option) => (
            <div key={option}>
              <label>
                <input
                  type="radio"
                  name={`question${questions.length + 1}`}
                  value={option}
                  checked={false}
                  onChange={() => handleOptionChange(questions.length + 1, option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>

        {/* Add question button */}
        <div className="centered-container">
          <div>
            <button className="addbutton" onClick={handleAddQuestion}>
              Add Question
            </button>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default CreateQuestion;