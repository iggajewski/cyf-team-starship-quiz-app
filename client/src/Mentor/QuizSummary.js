import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MentorStyle from "./MentorStyle";
import Button from "../GeneralPages/Button";

const QuizSummary = (props) => {
  const mentorEmail = props.location.state.mentorEmail;
  const quizId = props.location.state.quizId;
  const quizName = props.location.state.quizName;

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3100/api/questions/${props.location.state.quizId}`) // Change to https://cyf-team-starship-quiz-app.herokuapp.com/api/questions/${e.target.value}
      .then((data) => data.json())
      .then((jsonData) => setQuizQuestions(jsonData))
      .catch((e) => console.log(e));
  }, [deleteId]);

  console.log(quizQuestions);

  function handleDelete(e) {
    console.log(e);
    console.log(deleteId);
    setDeleteId(e);
    fetch(`http://localhost:3100/api/questions/${e}`, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("The question has been deleted."); // look into using conformation box
  }

  function handleRedirect() {
    alert("The quiz has been updated and you are directed to the Mentor Page.");
  }

  return (
    <div className="container">
      <MentorStyle />
      <div className="quiz-summary-container">
        <h1 className="quiz-summary-title">Quiz summary</h1>
        {quizQuestions.map((q, index) => {
          return (
            <div className="question-summary">
              <h3 className="question-content-summary">
                {index + 1} {q.question}
              </h3>
              <ul>
                <li
                  key={"#" + index + q.correct_answer}
                  className="answer-summary correct-answer-summary"
                >
                  Correct answer: {q.correct_answer}
                </li>
                <li
                  key={"#" + index + q.wrong_answer_1}
                  className="answer-summary"
                >
                  Wrong answer 1: {q.wrong_answer_1}
                </li>
                <li
                  key={"#" + index + q.wrong_answer_2}
                  className="answer-summary"
                >
                  Wrong answer 2: {q.wrong_answer_2}
                </li>
                <li
                  key={"#" + index + q.wrong_answer_3}
                  className="answer-summary"
                >
                  Wrong answer 3: {q.wrong_answer_3}
                </li>
                <li
                  key={"#" + index + q.wrong_answer_4}
                  className="answer-summary"
                >
                  Wrong answer 4: {q.wrong_answer_4}
                </li>
                <li
                  key={"#" + index + q.wrong_answer_5}
                  className="answer-summary"
                >
                  Wrong answer 5: {q.wrong_answer_5}
                </li>
              </ul>

              <div className="summary-question-buttons">
                <Link
                  className="summary-edit-link"
                  to={{
                    pathname: "/quizedit",
                    state: { q, mentorEmail },
                  }}
                >
                  <button className="summary-edit-button btn-dark btn-sm">
                    Edit
                  </button>
                </Link>
                <button
                  className="summary-delete-button btn-danger btn-sm"
                  onClick={() => handleDelete(q.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="mentor-buttons button-padding">
          <Link
            className="summary-quiz-submit"
            to={{
              pathname: "/mentorpage",
              state: { mentorEmail },
            }}
          >
            <button className="btn btn-primary btn-lg" onClick={handleRedirect}>
              Add the quiz to the database
            </button>
          </Link>
          <Link
            className="mentor-link"
            to={{
              pathname: "/quizpage",
              state: { quizName, quizId, mentorEmail },
            }}
          >
            <Button buttontext="Add more questions" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizSummary;
