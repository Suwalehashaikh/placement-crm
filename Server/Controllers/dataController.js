import Course from "../Models/courseSchema.js";
import Student from "../Models/studentSchema.js";
import Resume from "../Models/resumeSchema.js";
import Placement from "../Models/placementSchema.js";
import Alumni from "../Models/alumniSchema.js";
import { Employee } from "../Models/employeeSchema.js";

import { success } from "../Utils/success.js";
import { customError } from "../Utils/customError.js";

// ================= COURSES =================

// create course
const createCourse = async (req, res) => {
   
  const course = await Course.create({
    ...req.body,
    createdBy: req.user.userId,
  });

  return success(
    res,
    201,
    "Course created successfully",
    course
  );
};
// get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ courseName: 1 })
      .limit(9);

    return success(
      res,
      200,
      "Courses fetched successfully",
      courses
    );
  } catch (error) {
    throw new customError(
      500,
      "Failed to fetch courses"
    );
  }
};

// get course by id
const getCourseById = async (req, res) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    throw new customError(404, "Course not found");
  }

  return success(
    res,
    200,
    "Course fetched successfully",
    course
  );
};

// update course
const updateCourse = async (req, res) => {
  const { id } = req.params;

  const updatedCourse =
    await Course.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!updatedCourse) {
    throw new customError(404, "Course not found");
  }

  return success(
    res,
    200,
    "Course updated successfully",
    updatedCourse
  );
};

// delete course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  const course =
    await Course.findByIdAndDelete(id);

  if (!course) {
    throw new customError(404, "Course not found");
  }

  return success(
    res,
    200,
    "Course deleted successfully",
    course
  );
};

// ================= STUDENTS =================

// create student
const createStudent = async (req, res) => {
  const student = await Student.create({
    ...req.body,
    createdBy: req.user.userId, // from auth middleware
  });

  return success(
    res,
    201,
    "Student created successfully",
    student
  );
};

// get all students
const getAllStudents = async (req, res) => {
  const students = await Student.find()
    .sort({ name: 1 })
    .limit(9);

  return success(
    res,
    200,
    "Students fetched successfully",
    students
  );
};

// get student by id
const getStudentById = async (req, res) => {
  const { id } = req.params;

  const student = await Student.findById(id);

  if (!student) {
    throw new customError(404, "Student not found");
  }

  return success(
    res,
    200,
    "Student fetched successfully",
    student
  );
};

// update student
const updateStudent = async (req, res) => {
  const { id } = req.params;

  const updatedStudent =
    await Student.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!updatedStudent) {
    throw new customError(404, "Student not found");
  }

  return success(
    res,
    200,
    "Student updated successfully",
    updatedStudent
  );
};

// delete student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  const student =
    await Student.findById(id);

  if (!student) {
    throw new customError(404, "Student not found");
  }

  await Student.findByIdAndDelete(id);

  return success(
    res,
    200,
    "Student deleted successfully",
    { id }
  );
};

// ================= EMPLOYEES =================

// get all employees
const getAllEmployees = async (req, res) => {
  const employees = await Employee.find()
    .select("-password -otp")
    .sort({ createdAt: -1 });

  return success(
    res,
    200,
    "Employees fetched successfully",
    employees
  );
};

// get employee by id
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  const employee =
    await Employee.findById(id)
      .select("-password -otp");

  if (!employee) {
    throw new customError(
      404,
      "Employee not found"
    );
  }

  return success(
    res,
    200,
    "Employee fetched successfully",
    employee
  );
};

// ================= RESUMES =================

// create resume
const createResume = async (req, res) => {
  const resume = await Resume.create({
    ...req.body,
    createdBy: req.user.userId,
  });

  return success(
    res,
    201,
    "Resume created successfully",
    resume
  );
};

// get all resumes
const getAllResumes = async (req, res) => {
  const resumes = await Resume.find()
    .populate("student", "name email")
    .sort({ createdAt: -1 });

  return success(
    res,
    200,
    "Resumes fetched successfully",
    resumes
  );
};

// get resume by id
const getResumeById = async (req, res) => {
  const { id } = req.params;

  const resume = await Resume.findById(id)
    .populate("student", "name email");

  if (!resume) {
    throw new customError(404, "Resume not found");
  }

  return success(
    res,
    200,
    "Resume fetched successfully",
    resume
  );
};

// update resume
const updateResume = async (req, res) => {
  const { id } = req.params;

  const updatedResume =
    await Resume.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!updatedResume) {
    throw new customError(404, "Resume not found");
  }

  return success(
    res,
    200,
    "Resume updated successfully",
    updatedResume
  );
};

// delete resume
const deleteResume = async (req, res) => {
  const { id } = req.params;

  const resume =
    await Resume.findByIdAndDelete(id);

  if (!resume) {
    throw new customError(404, "Resume not found");
  }

  return success(
    res,
    200,
    "Resume deleted successfully",
    { id }
  );
};

// ================= PLACEMENTS =================

// ================= PLACEMENTS =================

// CREATE
const createPlacement = async (req, res) => {
  const placement =
    await Placement.create(req.body);

  return success(
    res,
    201,
    "Placement created successfully",
    placement
  );
};

// GET ALL
const getAllPlacements = async (req, res) => {
  const placements =
    await Placement.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

  return success(
    res,
    200,
    "Placements fetched successfully",
    placements
  );
};

// GET BY ID
const getPlacementById = async (
  req,
  res
) => {
  const placement =
    await Placement.findById(
      req.params.id
    ).populate(
      "student",
      "name email"
    );

  if (!placement) {
    throw new customError(
      "Placement not found",
      404
    );
  }

  return success(
    res,
    200,
    "Placement fetched successfully",
    placement
  );
};

// UPDATE
const updatePlacement = async (
  req,
  res
) => {
  const placement =
    await Placement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

  if (!placement) {
    throw new customError(
      "Placement not found",
      404
    );
  }

  return success(
    res,
    200,
    "Placement updated successfully",
    placement
  );
};

// DELETE
const deletePlacement = async (
  req,
  res
) => {
  const placement =
    await Placement.findByIdAndDelete(
      req.params.id
    );

  if (!placement) {
    throw new customError(
      "Placement not found",
      404
    );
  }

  return success(
    res,
    200,
    "Placement deleted successfully"
  );
};

// ================= ALUMNI =================

// Create Alumni
const createAlumni = async (req, res) => {
  const alumni = await Alumni.create(req.body);

  return success(
    res,
    201,
    "Alumni created successfully",
    alumni
  );
};

// Get All Alumni
const getAllAlumni = async (req, res) => {
  const alumni = await Alumni.find()
    .populate("student", "name email phone")
    .sort({ createdAt: -1 });

  return success(
    res,
    200,
    "Alumni fetched successfully",
    alumni
  );
};

// Get Alumni By ID
const getAlumniById = async (req, res) => {
  const { id } = req.params;

  const alumni = await Alumni.findById(id)
    .populate("student", "name email phone");

  if (!alumni) {
    throw new customError(
      "Alumni not found",
      404
    );
  }

  return success(
    res,
    200,
    "Alumni fetched successfully",
    alumni
  );
};

// Update Alumni
const updateAlumni = async (req, res) => {
  const { id } = req.params;

  const alumni =
    await Alumni.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

  if (!alumni) {
    throw new customError(
      "Alumni not found",
      404
    );
  }

  return success(
    res,
    200,
    "Alumni updated successfully",
    alumni
  );
};

// Delete Alumni
const deleteAlumni = async (req, res) => {
  const { id } = req.params;

  const alumni =
    await Alumni.findByIdAndDelete(id);

  if (!alumni) {
    throw new customError(
      "Alumni not found",
      404
    );
  }

  return success(
    res,
    200,
    "Alumni deleted successfully",
    alumni
  );
};

// ================= DASHBOARD =================

const getDashboardData = async (
  req,
  res
) => {
  console.log("Dashboard API HIT");

  const [
    students,
    courses,
    resumes,
    placements,
    alumni,

    totalStudents,
    totalCourses,
    totalResumes,
    totalPlacements,
    totalAlumni,
  ] = await Promise.all([
    Student.find()
      .sort({ createdAt: -1 })
      .limit(5),

    Course.find()
      .sort({ createdAt: -1 })
      .limit(5),

    Resume.find()
      .sort({ createdAt: -1 })
      .limit(5),

    Placement.find()
      .sort({ createdAt: -1 })
      .limit(5),

    Alumni.find()
      .sort({ createdAt: -1 })
      .limit(5),

    Student.countDocuments(),
    Course.countDocuments(),
    Resume.countDocuments(),
    Placement.countDocuments(),
    Alumni.countDocuments(),
  ]);

  // =====================
  // Monthly Placements
  // =====================

  const monthlyPlacements =
    await Placement.aggregate([
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          placements: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const placementChartData =
    monthlyPlacements.map(
      (item) => ({
        month:
          monthNames[
            item._id - 1
          ],
        placements:
          item.placements,
      })
    );

  // =====================
  // Placement Status Chart
  // =====================

  const placementStatusData =
    await Placement.aggregate([
      {
        $group: {
          _id: "$status",
          value: {
            $sum: 1,
          },
        },
      },
    ]);

  const statusChartData =
    placementStatusData.map(
      (item) => ({
        name: item._id,
        value: item.value,
      })
    );

  return success(
    res,
    200,
    "Dashboard data fetched successfully",
    {
      stats: {
        totalStudents,
        totalCourses,
        totalResumes,
        totalPlacements,
        totalAlumni,
      },

      recent: {
        students,
        courses,
        resumes,
        placements,
        alumni,
      },

      charts: {
        placementChartData,
        statusChartData, // NEW
      },
    }
  );
};
export {
  createCourse,

  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,

  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,

  getAllEmployees,
  getEmployeeById,

  // resumes
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,

  createPlacement,
  getAllPlacements,
  getPlacementById,
  updatePlacement,
  deletePlacement,

  createAlumni,
  getAllAlumni,
  getAlumniById,
  updateAlumni,
  deleteAlumni,


  getDashboardData,
};