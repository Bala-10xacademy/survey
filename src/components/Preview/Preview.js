import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Preview.css";
import PrevQues from "./PrevQues";
import Sidebar from "../SurveyList/Sidebar";
import Navigation from "../SurveyList/Navigation";
const REACT_APP_API_ENDPOINT='http://localhost:5001'

function Preview() {
  const navigate = useNavigate()

  const email = localStorage.getItem('email')
  const surveyName= localStorage.getItem('surveyName')

  const [themeData, setThemeData] = useState({});

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/theme`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, surveyName }),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error('No user Found Please Register First');
        } else {
          throw new Error('Login failed');
        }
      })
      .then(data => {
        console.log(data)
        const token = data;
        setThemeData(data);
      })
      .catch(error => {
        console.log('Login failed:', error);
      });
  }, []);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem('surveyName');
    navigate('/surveyitems')
  };
  const handleClose = (e) => {
    e.preventDefault();
    navigate('/createQues')
  }
  let arr = [
    {question:'Do you feel comfortable asking for help when you’re stuck?',
    options:["true" , "false"]
},{question:'Do you trust your manager to listen',
options:["truef,dbfddkgjdfgkjdgkj" , "false" ,'untrue']
},{question:'Are you familiar with the company goals?',
options:["true" , "false" ]
},{question:'Are you familiar with the company goals?',
options:["true" , "false" ]
},{question:'Are you familiar with the company goals?',
options:["true" , "false" ]
}
  ];
  return (
    <>
    <Navigation/>
        <div className="frame">
    <Sidebar/>
    <div className="container">
      <div className="top-part">
        <span className="left-part">&#8592; Preview </span>
        <span>
            <button type="submit" className="save close" onClick={handleClose}>
            close preview
          </button>
          <button type="submit" className="save" onClick={handleSubmit}>
            save
          </button>
          <span className="myBtn"></span>
        </span>
      </div>
      <div className="pre">
      {
        arr.map((ques , index)=>(
            <PrevQues key={index} ques={ques} index={index} themeData={themeData}/>
        ))
      }
      </div>
    </div>
    </div>
    </>
  );
}
export default Preview;
