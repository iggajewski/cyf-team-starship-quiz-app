import React, { useState, useEffect } from "react";
import Header from "../GeneralPages/Header";
import Button from "../GeneralPages/Button";
import { Link } from "react-router-dom";
import Footer from "../GeneralPages/Footer";
import StudentStyle from "./StudentStyle";

const StudentWelcome=(props)=>{

	const studentEmail = props.location.state.studentEmail;
	const studentName = props.location.state.studentName;
	const [studentId, setStudentId] = useState(0);

	useEffect(() =>{
		fetch(`http://localhost:3100/api/students/${studentEmail}`)
			.then((data) => data.json())
			.then((jsonData) => setStudentId(jsonData[0].id))
			.catch((e) => console.log(e));
	}, [studentEmail]);


	return (
		<div>
			<Header />
			<StudentStyle />
			<div className="student-welcome-div">
				<h1>You are logged in as: {studentName}</h1>
				<div className="student-buttons">
					<Link className="student-link" to = {{
						pathname:"/studentpage",
						state: { studentId, studentName },
					}}>
						<Button buttontext = 'Click to continue to Student Page' />
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default StudentWelcome;