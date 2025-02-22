import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetchUserProfile } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { removeAuthToken } from "@/lib/storage";

const Home = () => {
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });

  const logout = () => {
    removeAuthToken();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="h-screen space-y-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome, {user?.username}!</h1>
      <Button
        onClick={logout}
        size="lg"
        variant="outline"
      >
        Logout
      </Button>
    </div>
  );
};

export default Home;
