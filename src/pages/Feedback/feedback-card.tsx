import React from "react";
import { Card } from "@/components/ui/card";
import { Feedback } from "@/types/feedback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FeedbackCard: React.FC<Feedback> = ({
  name,
  rating,
  email,
  comments,
}) => {
  return (
    <Card className=" w-full p-4 border rounded-lg shadow-md ">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm ">Rating: {rating}</p>
      <p className="text-sm ">Email: {email}</p>
      {/* <p className="text-sm ">Date: {date}</p> */}
      <div className="flex items-center gap-2 mt-2">
        <label className="text-sm  w-48">Show in Page:</label>
        <Select>
          <SelectTrigger className={` border rounded-md px-2 py-1 text-sm `}>
            <SelectValue placeholder="Show & Don't" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="show">Show</SelectItem>
            <SelectItem value="don't">Don't</SelectItem>
          </SelectContent>
        </Select>
        {/* <select className="border rounded-md px-2 py-1 text-sm">
          <option value="show">Show</option>
          <option value="don't">Don't</option>
        </select> */}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium">Comment:</p>
        <p className="text-sm  dark:text-gray-400 mt-1 line-clamp-3">
          {comments}
        </p>
      </div>
    </Card>
  );
};

export default FeedbackCard;
