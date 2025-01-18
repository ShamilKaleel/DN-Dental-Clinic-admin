import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, SquarePen, Trash2, Copy } from "lucide-react";

type StatusProps = {
  status: "AVAILABLE" | "UNAVAILABLE" | "CANCELLED" | "FULL" | "FINISHED";
};

const StatusBar: React.FC<StatusProps> = ({ status }) => {
  // Define styles or messages for each status
  const statusStyles: { [key: string]: string } = {
    FULL: "text-yellow-900 bg-yellow-200 border-yellow-600",
    AVAILABLE: "text-purple-900 bg-purple-300 border-purple-500",
    CANCELLED: "text-gray-900 bg-gray-300 border-gray-500",
    UNAVAILABLE: "text-red-900 bg-red-200 border-red-500",
    FINISHED: "text-green-900 bg-green-200 border-green-500",
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={` w-[85px]  text-center  py-1 border font-semibold rounded-lg text-xs ${statusStyles[status]}`}
          >
            {status}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base  ">
            <button
              onClick={() => {}}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 "
            >
              <SquarePen className="h-4 w-4 mr-2" />
              Edit
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base  ">
            <button className="w-full justify-start flex rounded-md p-2 transition-all duration-75 ">
              <Copy className="h-4 w-4 mr-2" />
              Copy ID
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base ">
            <button
              onClick={() => {}}
              className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 "
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default StatusBar;
