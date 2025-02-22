import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";

const FourZeroFour = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Card className="min-w-full sm:min-w-md mx-auto p-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl">
          Oops! Looks like you're lost.
        </h1>
        <p>
          The page you're looking for doesn't exist.
        </p>
        <Button
          onClick={() => navigate("/")}
          size="lg"
          variant="outline"
        >
          Go back home
        </Button>
      </Card>
    </div>
  );
};

export default FourZeroFour;
