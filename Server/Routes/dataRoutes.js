import { Router } from "express";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { authCheck } from "../Middleware/authCheck.middleware.js";
import { authorizedRoles } from "../Middleware/authorizedRoles.js";
import { upload } from "../Utils/cloudinary.js";
import {
   
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,

  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,

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

   getAllAlumni,
  createAlumni,
    getAlumniById,
    updateAlumni,
    deleteAlumni,

  getAllEmployees,
  getEmployeeById,

  getDashboardData,
  deleteStudent
} from "../Controllers/dataController.js";

const dataRouter = Router();

/* student */
dataRouter.post(
  "/students",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(createStudent)
); 

dataRouter.get(
  "/students",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(getAllStudents)
);

dataRouter.get(
  "/students/:id",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(getStudentById)
);

dataRouter.put(
  "/students/:id",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(updateStudent)
);

dataRouter.delete(
  "/students/:id",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(deleteStudent)
);

/* courses  */
dataRouter.post(
  "/courses",
  authCheck,
  authorizedRoles("admin"),
  upload.single("courseImg"),
  asyncHandler(createCourse)
);

dataRouter.get(
  "/courses",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(getAllCourses)
);

dataRouter.get(
  "/courses/:id",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(getCourseById)
);

dataRouter.put(
  "/courses/:id",
  authCheck,
  authorizedRoles("admin"),
  asyncHandler(updateCourse)
);

dataRouter.delete(
  "/courses/:id",
  authCheck,
  authorizedRoles("admin"),
  asyncHandler(deleteCourse)
);

dataRouter.get(
  "/employees",
  authCheck,
  authorizedRoles("admin", "hr"),
  asyncHandler(getAllEmployees)
);

dataRouter.get(
  "/employees/:id",
  authCheck,
  authorizedRoles("admin", "hr"),
  asyncHandler(getEmployeeById)
);

/* RESUMES */

dataRouter.post(
  "/resumes",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(createResume)
);

dataRouter.get(
  "/resumes",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(getAllResumes)
);

dataRouter.get(
  "/resumes/:id",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(getResumeById)
);

dataRouter.put(
  "/resumes/:id",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(updateResume)
);

dataRouter.delete(
  "/resumes/:id",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(deleteResume)
);
/* PLACEMENTS */

dataRouter.post(
  "/placements",
  authCheck,
  authorizedRoles("admin", "hr"),
  asyncHandler(createPlacement)
);

dataRouter.get(
  "/placements",
  authCheck,
  authorizedRoles("admin", "hr"),
  asyncHandler(getAllPlacements)
);

dataRouter.get(
  "/placements/:id",
  authCheck,
  authorizedRoles("admin", "hr"),
  asyncHandler(getPlacementById)
);

dataRouter.put(
  "/placements/:id",
  authCheck,
  authorizedRoles("admin", "hr"),
  asyncHandler(updatePlacement)
);

dataRouter.delete(
  "/placements/:id",
  authCheck,
  authorizedRoles("admin"),
  asyncHandler(deletePlacement)
);

// Alumni
dataRouter.post(
  "/alumni",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(createAlumni)
);

dataRouter.get(
  "/alumni",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(getAllAlumni)
);

dataRouter.get(
  "/alumni/:id",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(getAlumniById)
);

dataRouter.put(
  "/alumni/:id",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(updateAlumni)
);

dataRouter.delete(
  "/alumni/:id",
  authCheck,
  authorizedRoles("admin"),
  asyncHandler(deleteAlumni)
);

dataRouter.get(
  "/dashboard",
  authCheck,
  authorizedRoles("admin", "hr", "counseller"),
  asyncHandler(getDashboardData)
);

export default dataRouter;