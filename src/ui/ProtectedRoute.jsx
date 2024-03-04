import React, { useEffect } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const authToken = JSON.parse(localStorage.getItem("auth-token"));
  const token = Cookies.get("token");

  // 1. Load the authenticated user
  const { currentUserLoading: isLoading, currentUser: user } = useCurrentUser();

  // 2. If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!token && !user && !isLoading) {
      navigate("/login");
    }
  }, [user, navigate, isLoading, token]);

  // 3. While loading, show a loading spinner
  if (isLoading) {
    return (
      <div className="flex h-screen animate-pulse items-center justify-center bg-[#121212] text-gray-50">
        Loading...
      </div>
    );
  }

  if (!token) {
    navigate("/login");
  }

  // 4. If the user is authenticated, show the children
  if (token && user) {
    return children;
  }
};

export default ProtectedRoute;
