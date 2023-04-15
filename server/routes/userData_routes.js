const express = require("express");
const router = express.Router();
const {
  postQuestion,
  getQuestions,
  getSingleQuestiion,
  deleteQuestion,
  postAnswer,
  getAnswers,
  deleteAnswer,
} = require("../controller/question");

const { getAllNotices, getSingleNotice } = require("../controller/notice");
const {
  postNote,
  getSingleNote,
  getNotes,
  updateNote,
  deleteNote,
  postSubject,
  getSubject,
  deleteSubject,
  updateSubject,
}= require("../controller/notes");
const authTeacher = require("../middleware/authTeacher");

//  question in community
router.route("/community").post(postQuestion).get(getQuestions);
router.route("/community:id").get(getSingleQuestiion).delete(deleteQuestion);

//  answer of question in community
router.route("/community/answer").post(postAnswer).get(getAnswers);
router.route("/community/answer/:id").delete(deleteAnswer);

//  notices  for user (role : student or teacher)
router.get("/notice", getAllNotices);
router.get("/notice/:id", getSingleNotice);

//  notes (get routes) - for student , student , admin
router.get("/notes", getNotes);
router.get("/notes/:id", getSingleNote);

//  notes routes - for teacher only 
router.post("/notes", authTeacher, postNote);
router.route("/mynotes/:id").put(authTeacher, updateNote).delete(authTeacher, deleteNote);

// subject routes - (teacher can create , update , delete) , subject can get subject only 
router.route("/subject").post(authTeacher, postSubject).get(getSubject);
router.route("/subject/:id").put(authTeacher, updateSubject).delete(authTeacher, deleteSubject);




module.exports = router;
