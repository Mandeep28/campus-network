const Student = require("../models/Student");
const Question = require("../models/Question");
const Teacher = require("../models/Teacher");
const { StatusCodes } = require("http-status-codes");
const customError = require("../error/customError");
const Answer = require("../models/Answer");

// -------------------------- Questions ---------------------------------

const postQuestion = async (req, res) => {
  const { title, body, departmentName } = req.body;
  const userData = req.data;
  if (userData.role === "student") {
    //...
    const user = await Student.findOne({ email: userData.email });
    // console.log(user);

    const question = await Question.create({
      title,
      body,
     uploadBy : {
      name: user.name,
      id: uesr._id
     },
     department: {
      name: user.department.name,
      id: user.department.id,
     }
    });
    // console.log(question);

    res.status(StatusCodes.CREATED).json({ question });
  } else if (userData.role === "teacher") {
    const user = await Teacher.findOne({ email: userData.email });
    const question = Question.create({
      title,
      body,
      uploadBy : {
        name: user.name,
        id: uesr._id
       },
       department: {
        name: user.department.name,
        id: user.department.id,
       }
    });
    res.status(StatusCodes.CREATED).json({ question });
    //....
  } else if (userData.role === "admin") {
    const question = Question.create({
      title,
      body,
      uploadBy : {
        name: userData.name,
        id: userData._id
       },
       department: {
        name: userData.department.name,
        id: userData.department.id,
       }
    });
    res.status(StatusCodes.CREATED).json({ question });
  } else {
    throw new customError("Something Went Wrong", StatusCodes.BAD_REQUEST);
  }
};

const getQuestions = async (req, res) => {
  const userData = req.data;
  console.log(userData);
  
  if (userData.role === "teacher" ) {
    const user = await Teacher.findOne({email: userData.email});
    if(!user) {
      throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
    }
    const questions = await Question.find({
      department: {
        id: user.department.id
      },
    });
    res.status(StatusCodes.OK).json({ questions, length: questions.length });
  }
  else if (userData.role === "student" ) {
    const user = await Student.findOne({email: userData.email});
    if(!user) {
      throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
    }
    const questions = await Question.find({
      department: {
        id: user.department.id
      },
    });
    res.status(StatusCodes.OK).json({ questions, length: questions.length });
  }
   else if (userData.role === "admin") {
    const questions = await Question.find({});
    res.status(StatusCodes.OK).json({ questions, length: questions.length });
  }
   else {
    throw new customError("User type not exits", StatusCodes.UNAUTHORIZED);
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
  const userData = req.data;
  const question = await Question.findById(questionId);
  

  if (!question) {
    throw new customError(
      "no question found with id " + questionId,
      StatusCodes.NOT_FOUND
    );
  }

  if (!question.uploadBy.id.equals(userData._id)) {
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
    uploadBy : {
      name: userData.name,
      id: userData._id
     },
  });
  res.status(StatusCodes.CREATED).json(data);
};

const getAnswers = async (req, res) => {
const questionId =req.query.id;
  
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
  const userData = req.data;
  const findAnswer = await Answer.findById(answerId);
  if (!findAnswer) {
    throw new customError(
      "no answer found by id " + answerId,
      StatusCodes.NOT_FOUND
    );
  }

  if (!findAnswer.uploadBy.id.equals(userData._id)) {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }
  findAnswer.remove();
  res.status(StatusCodes.OK).json({ msg: "Answer delted successfully" });
};

const vote = async (req, res)=>{
  const answerId =req.query.id;
  const voteType = req.query.type;
  const userData = req.data;
  const findAnswer = await Answer.findById(answerId);
  if (!findAnswer) {
    throw new customError(
      "no answer found by id " + answerId,
      StatusCodes.NOT_FOUND
    );
  }
  if(voteType === "upvote") {
    // upvote logic here
    findAnswer.upVote +=1;
    findAnswer.save();
    res.status(StatusCodes.OK).json({status: true, msg: "Successfully upvote the answer"});
  }
else if(voteType === "downvote") {
  // down vote logic here
  findAnswer.downVote +=1;
  findAnswer.save();
  res.status(StatusCodes.OK).json({status: true, msg: "Successfully DownVote the answer"});
}
else {
  throw new customError("type not exits", StatusCodes.NOT_FOUND);
}


}
 




module.exports = {
  postQuestion,
  getQuestions,
  getSingleQuestiion,
  deleteQuestion,
  postAnswer,
  getAnswers,
  deleteAnswer,
 vote
};
