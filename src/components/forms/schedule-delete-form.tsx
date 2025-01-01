import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSchedules } from "@/hooks/useSchedule"; // Assumes you have this hook
import { useToast } from "@/hooks/use-toast";
interface ScheduleDeleteFormProps {
  cardId: string;
  setIsOpen: (isOpen: boolean) => void;
}

const ScheduleDeleteForm: React.FC<ScheduleDeleteFormProps> = ({
  cardId,
  setIsOpen,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteSchedule } = useSchedules(); // Custom hook for managing schedules
  const { toast } = useToast();
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSchedule(parseInt(cardId, 10));

      setIsOpen(false); // Close dialog after successful deletion

      toast({
        title: "Schedule deleted",
        description: "Schedule deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting schedule:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: `${error.response?.data?.error || "An error occurred"}`,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-2">
        <Button
          variant="ghost"
          onClick={() => setIsOpen(false)}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default ScheduleDeleteForm;
