const Student = require("../models/Student");
const Question = require("../models/Question");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const customError = require("../error/customError");
const Answer = require("../models/Answer");

// -------------------------- Questions ---------------------------------

const postQuestion = async (req, res) => {
  const { title, body } = req.body;
  const userData = req.data;
  // console.log(userData.role);

  let question = {};

  if (userData.role === "student") {
    //...
    const user = await Student.findOne({ email: userData.email }).populate(
      "course",
      "name, department"
    );

    // console.log(user);

    question = await Question.create({
      title,
      body,
      uploadBy: userData._id,
      department: user.course.department,
    });
    // console.log(question);
  } else if (userData.role === "teacher") {
    const user = await Teacher.findOne({ email: userData.email });
    question = Question.create({
      title,
      body,
      uploadBy: userData._id,
      department: user.department,
    });

    //....
  } else if (userData.role === "admin") {
    question = await Question.create({
      title,
      body,
      uploadBy: userData._id,
    });
  } else {
    throw new customError("Something Went Wrong", StatusCodes.BAD_REQUEST);
  }

  res.status(StatusCodes.CREATED).json({ question });
};

//  -------------------- get all question -------------------------------------

const getQuestions = async (req, res) => {
  const userData = req.data;
  // console.log(userData);

  const adminUsers = await User.find({ role: "admin" }, "_id"); // retrieve ids of admin users
  let adminUserIds = adminUsers.map((user) => user._id); // get array of admin user ids
  // console.log(adminUserIds);

  let questions = {};

  if (userData.role === "teacher") {
    const user = await Teacher.findOne({ email: userData.email })
    if (!user) {
      throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
    }
    // console.log(user.course.department)
    questions = await Question.find({
      $or: [
        // { uploadBy: { $in: adminUserIds } },
        { depeartment: user.department },
      ],
    })
      .populate("uploadBy", "-password")
      .sort({ _id: -1 }); 
     console.log(questions)
  }
  //  if user is student
  else if (userData.role === "student") {
    const user = await Student.findOne({ email: userData.email }).populate("course", "name, department");
    if (!user) {
      throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
    }
    // console.log(user);

    questions = await Question.find({
      $or: [
        { department: user.course.department },
        { uploadBy: { $in: adminUserIds } },
      ],
    })
      .populate("uploadBy", "-password")
      .sort({ _id: -1 });
  }
  //  if user is admin
  else if (userData.role === "admin") {
    questions = await Question.find({})
      .populate("uploadBy", " -password ")
      .sort({ _id: -1 });
  } else {
    throw new customError("User type not exits", StatusCodes.UNAUTHORIZED);
  }

  res.status(StatusCodes.OK).json({ questions, length: questions.length });
};

//  ------------------- get single question ------------------------------------

const getSingleQuestiion = async (req, res) => {
  const questionId = req.params.id;
  const question = await Question.findOne({ _id: questionId }).populate(
    "uploadBy",
    "-password"
  );
  if (question) {
    res.status(StatusCodes.OK).json(question);
  } else {
    throw new customError(
      "no question found with id " + questionId,
      StatusCodes.NOT_FOUND
    );
  }
};

// ----------------------- delete question ------------------------------------

const deleteQuestion = async (req, res) => {
  const questionId = req.params.id;
  const userData = req.data;
  const question = await Question.findById(questionId);

  if (!question) {
    throw new customError(
      "no question found with id " + questionId,
      StatusCodes.NOT_FOUND
    );
  }

  if (!question.uploadBy.equals(userData._id)) {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }

  question.remove();
  res.status(StatusCodes.OK).json({ msg: "Question deleted successfully" });
};

//-------------------- Answer --------------------------------

const postAnswer = async (req, res) => {
  const { answer, questionId } = req.body;
  const userData = req.data;
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
    uploadBy: userData._id,
  });
  res.status(StatusCodes.CREATED).json(data);
};

const getAnswers = async (req, res) => {
  const questionId = req.query.id;

  const findQuestion = await Question.findById(questionId);
  if (!findQuestion) {
    throw new customError(
      "no question found by id " + questionId,
      StatusCodes.NOT_FOUND
    );
  }
  const data = await Answer.find({ question_id: questionId }).populate(
    "uploadBy",
    "-password"
  );
  res.status(StatusCodes.OK).json({ data, length: data.length });
};

const deleteAnswer = async (req, res) => {
  const answerId = req.params.id;
  const userData = req.data;
  const findAnswer = await Answer.findById(answerId);
  if (!findAnswer) {
    throw new customError(
      "no answer found by id " + answerId,
      StatusCodes.NOT_FOUND
    );
  }

  if (!findAnswer.uploadBy.equals(userData._id)) {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }
  findAnswer.remove();
  res.status(StatusCodes.OK).json({ msg: "Answer delted successfully" });
};

//  ------------------- my question -----------------------------------
const getMyQuestion = async (req, res) => {
  const userData = req.data;
  const questions = await Question.find({ uploadBy: userData._id })
    .populate("uploadBy", "-password")
    .sort({ _id: -1 });
  res.status(StatusCodes.OK).json({ questions, length: questions.length });
};

const vote = async (req, res) => {
  const answerId = req.query.id;
  const voteType = req.query.type;
  const userData = req.data;
  const findAnswer = await Answer.findById(answerId);
  if (!findAnswer) {
    throw new customError(
      "no answer found by id " + answerId,
      StatusCodes.NOT_FOUND
    );
  }
  if (voteType === "upvote") {
    // upvote logic here
    findAnswer.upVote += 1;
    findAnswer.save();
    res
      .status(StatusCodes.OK)
      .json({ status: true, msg: "Successfully upvote the answer" });
  } else if (voteType === "downvote") {
    // down vote logic here
    findAnswer.downVote += 1;
    findAnswer.save();
    res
      .status(StatusCodes.OK)
      .json({ status: true, msg: "Successfully DownVote the answer" });
  } else {
    throw new customError("type not exits", StatusCodes.NOT_FOUND);
  }
};

module.exports = {
  postQuestion,
  getQuestions,
  getSingleQuestiion,
  deleteQuestion,
  postAnswer,
  getAnswers,
  deleteAnswer,
  vote,
  getMyQuestion,
};
