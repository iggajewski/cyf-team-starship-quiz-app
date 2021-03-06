import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../GeneralPages/Button";


const QuizQuestion = ({ mentorEmail, quizName }) => {

	const [correctAnswer, setCorrectAnswer] = useState("");
	const [wrongAnswer1, setWrongAnswer1] = useState("");
	const [wrongAnswer2, setWrongAnswer2] = useState("");
	const [wrongAnswer3, setWrongAnswer3] = useState("");
	const [wrongAnswer4, setWrongAnswer4] = useState("");
	const [wrongAnswer5, setWrongAnswer5] = useState("");
	const [question, setQuestion] = useState("");
	const [quizId, setQuizId] = useState(0);

	useEffect(() => {
		fetch(`https://cyf-team-starship-quiz-app.herokuapp.com/api/quiz/${quizName}`)
			.then((data) => data.json())
			.then((jsonData) => setQuizId(jsonData[0].id))
			.catch((e) => console.log(e));
	}, [quizName]);

	function handleChange(e) {
		if (e.target.name === "question") {
			setQuestion(e.target.value);
		} if (e.target.name === "correctAnswer") {
			setCorrectAnswer(e.target.value);
		} if (e.target.name === "wrongAnswer1") {
			setWrongAnswer1(e.target.value);
		} if (e.target.name === "wrongAnswer2") {
			setWrongAnswer2(e.target.value);
		} if (e.target.name === "wrongAnswer3") {
			setWrongAnswer3(e.target.value);
		} if (e.target.name === "wrongAnswer4") {
			setWrongAnswer4(e.target.value);
		} if (e.target.name === "wrongAnswer5") {
			setWrongAnswer5(e.target.value);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();

		if(question === "" || correctAnswer === "" || wrongAnswer1 === "") {
			alert("Please fill out the required fills.");
		} else {
			fetch("https://cyf-team-starship-quiz-app.herokuapp.com/api/quiz", {
				method: "POST",
				body: JSON.stringify ({
					question: question,
					correct_answer: correctAnswer,
					wrong_answer_1: wrongAnswer1,
					wrong_answer_2: wrongAnswer2,
					wrong_answer_3: wrongAnswer3,
					wrong_answer_4: wrongAnswer4,
					wrong_answer_5: wrongAnswer5,
					quiz_id: quizId,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			alert("The question has been submitted.");
			setQuestion("");
			setCorrectAnswer("");
			setWrongAnswer1("");
			setWrongAnswer2("");
			setWrongAnswer3("");
			setWrongAnswer4("");
			setWrongAnswer5("");
		}
	}


	return (
		<div className="container">
			<h1 className="mentor-header">Create a question:</h1>
			<form className="question-form needs-validation" noValidate>
				<div className="question-input-area">
					<div className="question-box was-validated">
						<label htmlFor="question">Enter the question below:</label>
						<textarea
							className="form-control is-invalid"
							id="question"
							name="question"
							rows="8"
							cols="145"
							value={question}
							onChange={handleChange}
							placeholder="Please fill the question here !"
							required
						/>
					</div>

					<div className="answer-box was-validated">
						<label htmlFor="correctAnswer">Correct Answer</label>
						<input
							className="true-answer form-control is-invalid"
							type="text"
							name="correctAnswer"
							placeholder="Enter correct answer here"
							value={correctAnswer}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="answer-box was-validated">
						<label htmlFor="wrongAnswer1">Wrong Answer</label>
						<input
							className="false-answer form-control is-invalid"
							type="text"
							name="wrongAnswer1"
							placeholder="Enter wrong answer here"
							value={wrongAnswer1}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="answer-box">
						<label htmlFor="wrongAnswer2">Wrong Answer (optional) </label>
						<input
							className="false-answer form-control"
							type="text"
							name="wrongAnswer2"
							placeholder="Enter wrong answer here"
							value={wrongAnswer2}
							onChange={handleChange}
						/>
					</div>

					<div className="answer-box">
						<label htmlFor="wrongAnswer3">Wrong Answer (optional) </label>
						<input
							className="false-answer form-control"
							type="text"
							name="wrongAnswer3"
							placeholder="Enter wrong answer here"
							value={wrongAnswer3}
							onChange={handleChange}
						/>
					</div>

					<div className="answer-box">
						<label htmlFor="wrongAnswer4">Wrong Answer (optional) </label>
						<input
							className="false-answer form-control"
							type="text"
							name="wrongAnswer4"
							placeholder="Enter wrong answer here"
							value={wrongAnswer4}
							onChange={handleChange}
						/>
					</div>

					<div className="answer-box">
						<label htmlFor="wrongAnswer5">Wrong Answer (optional) </label>
						<input
							className="false-answer form-control"
							type="text"
							name="wrongAnswer5"
							placeholder="Enter wrong answer here"
							value={wrongAnswer5}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="question-submit-button">
					<button
						className="quiz-create-button btn-dark btn-lg"
						type="submit"
						onClick={handleSubmit}
					>
            			Submit the question
					</button>
				</div>

				<div className="mentor-buttons">
					<Link
						className="mentor-link"
						to={{
							pathname: "/quizsummary",
							state: { quizName, quizId, mentorEmail },
						}}
					>
						<Button buttontext="View quiz summary " />
					</Link>
				</div>
				<div className="mentor-buttons button-padding">
					<Link
						className="mentor-link"
						to={{
							pathname: "/mentorpage",
							state: { mentorEmail },
						}}
					>
						<Button buttontext="Go back to Mentor Page" />
					</Link>
				</div>
			</form>
		</div>
	);
};
export default QuizQuestion;