import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CurateModal = ({ close }: { close: () => void }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center transition-all duration-300 ease-in-out">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-0 bg-black/50" onClick={close} />
      <Card
        className="relative z-10 mx-4 w-full sm:w-xl p-6"
      >
        <h2 className="text-2xl font-bold">Lorem ipsum dolor</h2>

        <p>Lorem ipsum dolor sit amet, consectetur</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="organisation-name" className="text-sm font-semibold">
              Name of the organisation
            </label>
            <Input
              placeholder="Placeholder"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-number" className="text-sm font-semibold">Contact number</label>
            <Input
              placeholder="Placeholder"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">Email Id</label>
          <Input
            placeholder="Enter your email ID"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-semibold">
            Which category do you choose?
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Placeholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category1">Category 1</SelectItem>
              <SelectItem value="category2">Category 2</SelectItem>
              <SelectItem value="category4">Category 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          size="lg"
        >
          Submit
        </Button>

        <p className="text-sm">
          Submitting the form will accept the{" "}
          <button className="text-primary cursor-pointer">
            Terms & Conditions
          </button>
          {" "}and{" "}
          <button className="text-primary cursor-pointer">
            Privacy Policy
          </button>
        </p>

        <hr />

        <p className="text-sm">
          Already have credentials?{" "}
          <button className="text-primary cursor-pointer">
            Curator's Login
          </button>
        </p>

        <Button onClick={close} className="absolute top-2 right-2" variant="ghost" size="icon">
          <XIcon size={24} />
        </Button>
      </Card>
    </div>
  );
};

export default CurateModal;
