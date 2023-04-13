const Student = require("../models/Student");
const Question = require("../models/Question");
const Teacher = require("../models/Teacher");
const { StatusCodes } = require("http-status-codes");
const customError = require("../error/customError");
const Answer = require("../models/Answer");

// -------------------------- Questions ---------------------------------

const postQuestion = async (req, res) => {
  const { title, body, departmentName } = req.body;
  const findUser = req.data;
  if (findUser.role === "student") {
    //...
    // console.log("inside if");

    const user = await Student.findOne({ email: findUser.email });
    // console.log(user);

    const question = await Question.create({
      title,
      body,
      uploadBy_name: findUser.name,
      uploadBy_id: findUser._id,
      departmentName: user.departmentName,
    });
    // console.log(question);

    res.status(StatusCodes.CREATED).json({ question });
  } else if (findUser.role === "teacher") {
    const user = await Teacher.findOne({ email: findUser.email });
    const question = Question.create({
      title,
      body,
      uploadBy_name: findUser.name,
      uploadby_id: findUser.id,
      departmentName: user.departmentName,
    });
    res.status(StatusCodes.CREATED).json({ question });
    //....
  } else if (findUser.role === "admin") {
    const question = Question.create({
      title,
      body,
      uploadBy_name: findUser.name,
      uploadby_id: findUser.id,
      departmentName: departmentName,
    });
    res.status(StatusCodes.CREATED).json({ question });
  } else {
    throw new customError("Something Went Wrong", StatusCodes.BAD_REQUEST);
  }
};

const getQuestions = async (req, res) => {
  const findUser = req.data;
  if (findUser.role === "student") {
    const user = await Student.findOne({ email: findUser.email });
    const questions = await Question.find({
      departmentName: user.departmentName,
    });
    res.status(StatusCodes.OK).json({ questions, length: questions.length });
  } else if (findUser.role === "teacher") {
    const user = await Teacher.findOne({ email: findUser.email });
    const questions = await Question.find({
      departmentName: user.departmentName,
    });
    res.status(StatusCodes.OK).json({ questions, length: questions.length });
  } else if (findUser.role === "admin") {
    const questions = await Question.find({});
    res.status(StatusCodes.OK).json({ questions, length: questions.length });
  } else {
    throw new customError("Something Went Wrong", StatusCodes.BAD_REQUEST);
  }
};

const getSingleQuestiion = async (req, res) => {
  const questionId = req.params.id;
  const question = await Question.findOne({ _id: questionId });
  if (question) {
    res.status(StatusCodes.OK).json(question);
  } else {
    throw new customError(
      "no question found with id " + questionId,
      StatusCodes.NOT_FOUND
    );
  }
};

const deleteQuestion = async (req, res) => {
  const questionId = req.params.id;
  const findUser = req.data;
  const question = await Question.findById(questionId);
  console.log("find user id "+findUser._id + "and question uploadBy_id is " + question.uploadBy_id);
  
  if (!question.uploadBy_id.equals(findUser._id)) {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }
  if (!question) {
    throw new customError(
      "no question found with id " + questionId,
      StatusCodes.NOT_FOUND
    );
  }
  question.remove();
  res.status(StatusCodes.OK).json({ msg: "Question deleted successfully" });
};

//-------------------- Answer --------------------------------

const postAnswer = async (req, res) => {
  const { answer, questionId } = req.body;
  const findUser = req.data;
  const findQuestion = await Question.findById(questionId);
  if (!findQuestion) {
    throw new customError(
      "no question found by id " + questionId,
      StatusCodes.NOT_FOUND
    );
  }
  const data = await Answer.create({
    answer,
    question_id: questionId,
    uploadBy_id: findUser._id,
    uploadBy_name: findUser.name,
  });
  res.status(StatusCodes.CREATED).json(data);
};

const getAnswers = async (req, res) => {
const questionId =req.query.id;
  console.log(questionId);
  
  const findQuestion = await Question.findById(questionId);
  if (!findQuestion) {
    throw new customError(
      "no question found by id " + questionId,
      StatusCodes.NOT_FOUND
    );
  }
  const data = await Answer.find({ question_id: questionId });
  res.status(StatusCodes.OK).json({ data, length: data.length });
};

const deleteAnswer = async (req, res) => {
  const answerId = req.params.id;
  const findUser = req.data;
  const findAnswer = await Answer.findById(answerId);
  if (!findAnswer) {
    throw new customError(
      "no answer found by id " + answerId,
      StatusCodes.NOT_FOUND
    );
  }

  if (!findAnswer.uploadBy_id.equals(findUser._id)) {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }
  findAnswer.remove();
  res.status(StatusCodes.OK).json({ msg: "Answer delted successfully" });
};

const upVote = async (req, res)=>{
  const answerId =req.query.id;
  const findUser = req.data;
  const findAnswer = await Answer.findById(answerId);
  if (!findAnswer) {
    throw new customError(
      "no answer found by id " + answerId,
      StatusCodes.NOT_FOUND
    );
  }

  if (!findAnswer.uploadBy_id.equals(findUser._id)) {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }

  // upvote logic here

}
  
const downvote = async (req, res)=>{
  const answerId =req.query.id;
  const findUser = req.data;
  const findAnswer = await Answer.findById(answerId);
  if (!findAnswer) {
    throw new customError(
      "no answer found by id " + answerId,
      StatusCodes.NOT_FOUND
    );
  }

  if (!findAnswer.uploadBy_id.equals(findUser._id)) {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }

  // down vote logic here


}





module.exports = {
  postQuestion,
  getQuestions,
  getSingleQuestiion,
  deleteQuestion,
  postAnswer,
  getAnswers,
  deleteAnswer,
};
