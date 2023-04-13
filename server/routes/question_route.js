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
  }= require("../controller/question");


router.route("/").post(postQuestion).get(getQuestions);
router.route("/:id").get(getSingleQuestiion).delete(deleteQuestion)


router.route("/upload/answer").post(postAnswer).get(getAnswers);
router.route("/upload/answer/:id").delete(deleteAnswer)

/* 
upload - get , post
upload:id - get , put , delete 

upload_ans - get , post 
upload_ans/:id - get , put , delete
*/

module.exports = router;