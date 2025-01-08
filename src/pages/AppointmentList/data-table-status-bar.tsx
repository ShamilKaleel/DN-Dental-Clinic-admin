import React from "react";

type StatusProps = {
  status: "PENDING" | "ACTIVE" | "CANCEL" | "ABSENT" | "FINISHED";
};

const StatusBar: React.FC<StatusProps> = ({ status }) => {
  // Define styles or messages for each status
  const statusStyles: { [key: string]: string } = {
    PENDING: "text-yellow-900 bg-yellow-200 border-yellow-600",
    ACTIVE: "text-purple-900 bg-purple-300 border-purple-500",
    CANCELLED: "text-gray-900 bg-gray-300 border-gray-500",
    ABSENT: "text-red-900 bg-red-200 border-red-500",
    FINISHED: "text-green-900 bg-green-200 border-green-500",
  };

  return (
    <div
      className={` w-[85px]  text-center  py-1 border font-semibold rounded-lg text-xs ${statusStyles[status]}`}
    >
      {status}
    </div>
  );
};

export default StatusBar;
