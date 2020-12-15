import { Router } from "express";
import { Connection } from "./db";
const router = new Router();


router.get("/", (_, res, next) => {

	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		res.json({ message: "Hello, world!" });
	});
});

router.get("/quiz", function (req, res, next) {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}
		pool
			.query("SELECT * FROM quiz")
			.then((result) => res.json(result.rows))
			.catch((e) => console.error(e));
	});
});

router.get("/questions/:id", function (req, res, next) {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}

		const id = req.params.id;

		pool
			.query("SELECT * FROM quiz_questions WHERE quiz_id = $1", [id])
			.then((result) => res.json(result.rows))
			.catch((e) => console.error(e));
	});
});


router.post("/quiz", function (req, res, next) {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}

		const question = req.body.question;
		const correctAnswer = req.body.correct_answer;
		const wrongAnswer1 = req.body.wrong_answer_1;
		const wrongAnswer2 = req.body.wrong_answer_2;
		const wrongAnswer3 = req.body.wrong_answer_3;
		const wrongAnswer4 = req.body.wrong_answer_4;
		const wrongAnswer5 = req.body.wrong_answer_5;
		const quizName = req.body.quiz_id;

		/* pool */

		/* 			.query("SELECT * FROM mentors WHERE mentor_email=$1", [mentorEmail])
  		.then((result) => {
      	if (result.rows.length > 0) {
        	return res
						.status(200).send(`There is a mentor  with that ${mentorEmail}`);
      	} else { */
		const query = "INSERT INTO quiz_questions (quiz_id, question, correct_answer, wrong_answer_1,"
			+ "wrong_answer_2, wrong_answer_3, wrong_answer_4, wrong_answer_5) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
		pool
			.query(query, [quizName, question, correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3, wrongAnswer4, wrongAnswer5])
			.then(() => res.send("Question added!"))
			.catch((e) => console.error(e));
	});
});


router.get("/studentresults", function (req, res, next) {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}
		pool
			.query("SELECT quiz.quiz_name, results.score FROM results INNER JOIN students ON students.id = results.student_id INNER JOIN quiz ON results.quiz_id = quiz.id")
			.then((result) => res.json(result.rows))
			.catch((e) => console.error(e));
	});
});

router.get("/mentorresults", function (req, res, next) {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}
		pool
			.query("SELECT quiz.quiz_name, students.student_name, results.score FROM results INNER JOIN students ON students.id = results.student_id INNER JOIN quiz ON results.quiz_id = quiz.id")
			.then((result) => res.json(result.rows))
			.catch((e) => console.error(e));
	});
});

router.post("/students", function (req, res, next) {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}

		const studentName = req.body.student_name;
  		const studentEmail = req.body.student_email;

		pool

			.query("SELECT * FROM students WHERE student_email=$1", [studentEmail])
  		.then((result) => {
      	if (result.rows.length > 0) {
        	return res
						.status(200).send(`There is a student  with that ${studentEmail}`);
      	} else {
					const query
         = "INSERT INTO students (student_name, student_email) VALUES ($1, $2)";
					pool
						.query(query, [studentName, studentEmail])
						.then(() => res.send("Student details added!"))
						.catch((e) => console.error(e));
      	}
			});
	});

});


router.post("/mentors", function (req, res, next) {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}
  		const mentorEmail = req.body.mentor_email;

		pool

			.query("SELECT * FROM mentors WHERE mentor_email=$1", [mentorEmail])
  		.then((result) => {
      	if (result.rows.length > 0) {
        	return res
						.status(200).send(`There is a mentor  with that ${mentorEmail}`);
      	} else {
					const query
         = "INSERT INTO mentors (mentor_email) VALUES ($1)";
					pool
						.query(query, [mentorEmail])
						.then(() => res.send("Mentor details added!"))
						.catch((e) => console.error(e));
      	}
			});
	});
});

export default router;
