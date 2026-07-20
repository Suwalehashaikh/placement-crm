import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  loginUser,
  verifyOtp,
  getUserData,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] = useState(
    JSON.parse(
      localStorage.getItem("user")
    ) || null
  );

  const [accessToken, setAccessToken] =
    useState(
      localStorage.getItem(
        "accessToken"
      ) || null
    );

  const [userId, setUserId] = useState(
    localStorage.getItem("userId") ||
      null
  );

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // CHECK TOKEN EXPIRY
  // ==========================
  useEffect(() => {
    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (!token) return;

    try {
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const isExpired =
        payload.exp * 1000 <
        Date.now();

      if (isExpired) {
        console.log(
          "Token expired. Logging out..."
        );

        localStorage.clear();

        setUser(null);
        setUserId(null);
        setAccessToken(null);
      }
    } catch (error) {
      console.log(
        "Invalid token:",
        error
      );

      localStorage.clear();

      setUser(null);
      setUserId(null);
      setAccessToken(null);
    }
  }, []);

  // ==========================
  // FETCH USER
  // ==========================
  const fetchUser = async (
    id = userId
  ) => {
    if (!id) return;

    try {
      const res =
        await getUserData(id);

      console.log(
        "USER API RESPONSE:",
        res
      );

      const userData =
        res?.data?.data ||
        res?.data;

      setUser(userData);

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );
    } catch (err) {
      console.error(err);

      logout();
    }
  };

  // ==========================
  // LOGIN
  // ==========================
 const login = async (email, password) => {
  try {
    const res = await loginUser(email, password);

    console.log("LOGIN API:", res);

    if (res?.data?.accessToken) {
      localStorage.setItem(
        "accessToken",
        res.data.accessToken
      );

      localStorage.setItem(
        "userId",
        res.data.userId
      );

      setAccessToken(res.data.accessToken);
      setUserId(res.data.userId);

      await fetchUser(res.data.userId);

      return {
        success: true,
        verified: true,
      };
    }

    return {
      success: true,
      verified: false,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Login failed",
    };
  }
};

  // ==========================
  // OTP VERIFY
  // ==========================
  const verifyUserOtp = async (
  email,
  otp
) => {
  const res = await verifyOtp(
    email,
    otp
  );

  localStorage.setItem(
    "accessToken",
    res.data.accessToken
  );

  localStorage.setItem(
    "userId",
    res.data.userId
  );

  setAccessToken(
    res.data.accessToken
  );

  setUserId(
    res.data.userId
  );

  await fetchUser(
    res.data.userId
  );

  return res;
};

  // ==========================
  // LOAD USER ON REFRESH
  // ==========================
  useEffect(() => {
    if (
      userId &&
      accessToken &&
      !user
    ) {
      fetchUser();
    }
  }, [
    userId,
    accessToken,
    user,
  ]);

  // ==========================
  // LOGOUT
  // ==========================
  const logout = () => {
    localStorage.clear();

    setAccessToken(null);
    setUserId(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        userId,
        loading,

        login,
        verifyUserOtp,
        fetchUser,
        logout,

        isAuthenticated:
          !!accessToken &&
          !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () =>
  useContext(AuthContext);