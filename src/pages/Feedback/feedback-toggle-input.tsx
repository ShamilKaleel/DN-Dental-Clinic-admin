import { useFeedback } from "@/hooks/useFeedback";
import { useToast } from "@/hooks/use-toast";
interface ToggleSwitchProps {
  feedbackID: string;
  checked: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ feedbackID, checked }) => {
  const { toggleShowOnWebsite } = useFeedback();
  const { toast } = useToast();

  const handleToggle = async () => {
    try {
      await toggleShowOnWebsite(feedbackID);
      toast({
        title: "Feedback visibility toggled",
        description: "Feedback visibility toggled successfully",
      });
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          error.response?.data?.details?.error || "An error occurred",
        variant: "destructive",
      });
      console.error("Failed to toggle feedback visibility", error);
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onClick={handleToggle}
      />
      <div
        className={`group peer rounded-full duration-300 w-16 h-8 ring-2 ${
          checked ? "ring-green-500" : "ring-red-500"
        }`}
      >
        <div
          className={`absolute top-1 left-1 h-6 w-6 rounded-full duration-300 flex justify-center items-center ${
            checked ? "bg-green-500 translate-x-8" : "bg-red-500"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
