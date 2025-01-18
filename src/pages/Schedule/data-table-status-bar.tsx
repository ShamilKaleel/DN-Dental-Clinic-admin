import React, { useEffect, useState } from "react";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, SquarePen, Trash2, Copy } from "lucide-react";
import { useSchedules } from "@/hooks/useSchedule";
import { useToast } from "@/hooks/use-toast";

import { CreateSchedule } from "@/types/schedule";
type StatusBarProps = {
  status: "AVAILABLE" | "UNAVAILABLE" | "CANCELLED" | "FULL" | "FINISHED";
  cardId: string;
};

const StatusBar: React.FC<StatusBarProps> = ({ status, cardId }) => {
  const [newStatus, setNewStatus] = React.useState<string>(status);

  const { toast } = useToast();
  const { updateScheduleStatus } = useSchedules();
  // Define styles or messages for each status
  const statusStyles: { [key: string]: string } = {
    FULL: "text-yellow-900 bg-yellow-200 border-yellow-600",
    AVAILABLE: "text-purple-900 bg-purple-300 border-purple-500",
    CANCELLED: "text-gray-900 bg-gray-300 border-gray-500",
    UNAVAILABLE: "text-red-900 bg-red-200 border-red-500",
    FINISHED: "text-green-900 bg-green-200 border-green-500",
  };

  const handleStatusChange = async (newStatus: string) => {
    setNewStatus(newStatus);
    try {
      await updateScheduleStatus(cardId, newStatus);
      toast({
        title: "Status updated",
        description: `Status updated to ${newStatus}`,
      });
    } catch (error: any) {
      console.log(error.response);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.details?.error || "Something went wrong",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={` w-[85px] h-6 text-center   border font-semibold rounded-lg text-xs ${statusStyles[status]}`}
          >
            {status}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base  ">
            <button
              onClick={() => {
                handleStatusChange("AVAILABLE");
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 "
            >
              AVAILABLE
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base  ">
            <button
              onClick={() => {
                handleStatusChange("unavailable");
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 "
            >
              UNAVAILABLE
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base ">
            <button
              onClick={() => {
                handleStatusChange("ACTIVE");
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 "
            >
              ACTIVE
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base ">
            <button
              onClick={() => {
                handleStatusChange("FULL");
              }}
              className="w-full justify-start flex  rounded-md p-2 transition-all duration-75 "
            >
              FULL
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base ">
            <button
              onClick={() => {
                handleStatusChange("CANCELLED");
              }}
              className="w-full justify-start flex  rounded-md p-2 transition-all duration-75 "
            >
              CANCELLED
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base ">
            <button
              onClick={() => {
                handleStatusChange("FINISHED");
              }}
              className="w-full justify-start flex  rounded-md p-2 transition-all duration-75 "
            >
              FINISHED
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default StatusBar;
