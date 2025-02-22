import { fetchUserProfile } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });

  if (isLoading) return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div
        className="animate-spin duration-600 rounded-full h-10 w-10 border-4 border-b-transparent border-primary"
      />
    </div>
  );

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
