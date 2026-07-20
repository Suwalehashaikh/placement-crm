import Student from "../Models/studentSchema.js";
import { success } from "../Utils/success.js";
import { customError } from "../Utils/customError.js";

export const createStudent = async (req, res) => {
  const {
    name,
    gender,
    age,
    qualification,
    email,
    phone,
    address,
    course,
    batch,
    status,
  } = req.body;

  if (
    !name ||
    !gender ||
    !age ||
    !qualification ||
    !email ||
    !phone ||
    !address ||
    !course ||
    !batch
  ) {
    throw new customError(400, "All fields are required");
  }

  const studentExists = await Student.findOne({ email });

  if (studentExists) {
    throw new customError(
      400,
      "Student already exists"
    );
  }

  const student = await Student.create({
    name,
    gender,
    age,
    qualification,
    email,
    phone,
    address,
    course,
    batch,
    status,
    createdBy: req.user.userId,
  });

  success(
    res,
    201,
    "Student created successfully",
    student
  );
};