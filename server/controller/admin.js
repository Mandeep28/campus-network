const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res)=>{
    const {userid} =  req.user;
    const {hidden } = req.body;
    if(hidden === "student") {
        const {name, email, rollNo, departmentName, semester, course, degreeType} = req.body;

        const findUser = await Student.findOne({email});
        if(findUser) {
            throw new customError("Email already exists", StatusCodes.BAD_REQUEST);
        }


        const user = await Student.create({
            name, 
            email, 
            rollNo, 
            departmentName, 
            semester,
            course, 
            degreeType,
            createdBy : userid
        });
     
        res.status(StatusCodes.CREATED).json(user)
    }
    else if(hidden === "teacher") {
        const {name, email, departmentName, } = req.body;

        const findUser = await Teacher.findOne({email});
        if(findUser) {
            throw new customError("Email already exists", StatusCodes.BAD_REQUEST);
        }


        const user = await Teacher.create({
            name, 
            email, 
            departmentName, 
            createdBy : userid
        });
     
        res.status(StatusCodes.CREATED).json(user)
    }
    else {
        throw new customError("Something Went Wrong", StatusCodes.BAD_REQUEST);
    }


}


const getAllUser  = async (req, res)=>{
    const type = req.query.type;
    const data = {};
    // if(type === "all") {

    // }
    if(type === "student") {
        data = await Student.find({});
    }
    if(type === "teacher") {
        data = await Teacher.find({});

    }
    res.status(StatusCodes.OK).json({data, length: data.length});
}

// --------------------------------- Student ----------------------------------

const getStudent = async (req, res)=>{
    const id = req.params.id;
    const student = await Student.findOne({_id : id});
    if(!student) {
        throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json({student});
    

}
const updateStudent = async (req, res)=>{
    const id = req.params.id;
    let student = await Student.findOne({_id : id});
    if(!student) {
        throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
    }
    student  = await Student.findOneAndUpdate({_id : id},req.body, {new : true, runValidators: true})
    res.status(StatusCodes.OK).json({msg: "Student update successfully", student});


    

}
const delteStudent = async (req, res)=>{
    const id = req.params.id;
    let student = await Student.findOne({_id : id});
    if(!student) {
        throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
    }
    student = await Student.findOneAndDelete({_id: id});
    res.status(StatusCodes.OK).json({msg: "student delete successsfully", student});

}

// ----------------------- Teacher -------------------------------------
const getTeacher = async (req, res)=>{
    const id = req.params.id;
    const teacher = await Teacher.findOne({_id : id});
    if(!teacher) {
        throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json({teacher});
    

}
const updateTeacher = async (req, res)=>{

    const id = req.params.id;
    let teacher = await Teacher.findOne({_id : id});
    if(!teacher) {
        throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
    }
    teacher  = await Student.findOneAndUpdate({_id : id},req.body, {new : true, runValidators: true})
    res.status(StatusCodes.OK).json({msg: "Teacher updated successfullly",teacher});


}
const deleteTeacher = async (req, res)=>{
    const id = req.params.id;
    let teacher = await Teacher.findOne({_id : id});
    if(!teacher) {
        throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
    }
    teacher = await Teacher.findOneAndDelete({_id : id});
    res.status(StatusCodes.OK).json({msg: "Teacher delete successfullly", teacher});
}

// ---------------------------------- Admin ---------------------------------------



module.exports = {createUser, getAllUser, getStudent,  updateStudent , delteStudent, getTeacher, updateTeacher, deleteTeacher}