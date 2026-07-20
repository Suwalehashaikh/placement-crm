import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Loader from "../components/common/Loader";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

// ================= Layout =================
const MainLayout = lazy(() => import("../layouts/MainLayout"));

// ================= Auth =================
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const VerifyOtp = lazy(() => import("../pages/auth/VerifyOtp"));

// ================= Dashboard =================
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

// ================= Students =================
const StudentsList = lazy(() => import("../pages/students/StudentsList"));
const StudentDetails = lazy(() => import("../pages/students/StudentDetails"));
const EditStudent = lazy(() => import("../pages/students/EditStudent"));
const CreateStudent = lazy(() => import("../pages/students/CreateStudent"));

// ================= Courses =================
const CoursesList = lazy(() => import("../pages/courses/CoursesList"));
const CreateCourse = lazy(() => import("../pages/courses/CreateCourse"));
const EditCourse = lazy(() => import("../pages/courses/EditCourse"));
const CourseDetails = lazy(() => import("../pages/courses/CourseDetails"));

// ================= Resumes =================
const ResumesList = lazy(() => import("../pages/resume/ResumesList"));
const CreateResume = lazy(() => import("../pages/resume/CreateResume"));
const EditResume = lazy(() => import("../pages/resume/EditResume"));
const ResumeDetails = lazy(() => import("../pages/resume/ResumeDetails"));

// ================= Alumni =================
const AlumniList = lazy(() => import("../pages/alumni/AlumniList"));
const CreateAlumni = lazy(() => import("../pages/alumni/CreateAlumni"));
const EditAlumni = lazy(() => import("../pages/alumni/EditAlumni"));
const AlumniDetails = lazy(() => import("../pages/alumni/AlumniDetails"));

// ================= Placements =================
const PlacementsList = lazy(() => import("../pages/placements/PlacementList"));
const CreatePlacement = lazy(() => import("../pages/placements/CreatePlacement"));
const EditPlacement = lazy(() => import("../pages/placements/EditPlacement"));
const PlacementDetails = lazy(() => import("../pages/placements/PlacementDetails"));

// ================= Profile =================
const Profile = lazy(() => import("../pages/profile/Profile"));



const AppRoutes = () => {
  return (
    <Suspense
  fallback={
    <Loader text="Loading..." />
  }
>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/otp-verify"
          element={
            <PublicRoute>
              <VerifyOtp />
            </PublicRoute>
          }
        />

        {/* Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ================= STUDENTS ================= */}

          <Route
            path="/students"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <StudentsList />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/students/create"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <CreateStudent />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/students/:id"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <StudentDetails />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/students/edit/:id"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <EditStudent />
              </RoleProtectedRoute>
            }
          />

          {/* ================= COURSES ================= */}

          <Route
            path="/courses"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <CoursesList />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/courses/create"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <CreateCourse />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/courses/:id"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <CourseDetails />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/courses/edit/:id"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <EditCourse />
              </RoleProtectedRoute>
            }
          />

          {/* ================= RESUMES ================= */}

          <Route
            path="/resumes"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <ResumesList />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/resumes/create"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <CreateResume />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/resumes/:id"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <ResumeDetails />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/resumes/edit/:id"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <EditResume />
              </RoleProtectedRoute>
            }
          />

          {/* ================= ALUMNI ================= */}

          <Route
            path="/alumni"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <AlumniList />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/alumni/create"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <CreateAlumni />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/alumni/:id"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <AlumniDetails />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/alumni/edit/:id"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "counseller"]}>
                <EditAlumni />
              </RoleProtectedRoute>
            }
          />

          {/* ================= PLACEMENTS ================= */}

          <Route
            path="/placements"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "hr"]}>
                <PlacementsList />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/placements/create"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "hr"]}>
                <CreatePlacement />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/placements/:id"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "hr"]}>
                <PlacementDetails />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/placements/edit/:id"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "hr"]}>
                <EditPlacement />
              </RoleProtectedRoute>
            }
          />

          {/* ================= PROFILE ================= */}

          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen text-3xl font-bold">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;