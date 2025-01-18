import React from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CardProps {
  name: string;
  rating: number;
  email: string;
  date: string;
  comment: string;
}

const FeedbackCard: React.FC<CardProps> = ({
  name,
  rating,
  email,
  date,
  comment,
}) => {
  return (
    <Card className=" w-full p-4 border rounded-lg shadow-md ">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm ">Rating: {rating}</p>
      <p className="text-sm ">Email: {email}</p>
      <p className="text-sm ">Date: {date}</p>
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
          {comment}
        </p>
      </div>
    </Card>
  );
};

const App: React.FC = () => {
  const cards = [
    {
      name: "Dr. Ashfaq Riyalsden",
      rating: 4.5,
      email: "michaelfarys@yahoo.com",
      date: "2025-01-25",
      comment:
        "Dr. Ashfaq Riyalsden is an amazing doctor. Dr. Riyalsden has always provided great care.",
    },
    {
      name: "Dr. Sarah Thompson",
      rating: 4.7,
      email: "sarah.thompson@gmail.com",
      date: "2025-01-20",
      comment:
        "Dr. Thompson is very knowledgeable and ensures her patients feel comfortable during every visit.",
    },
    {
      name: "Dr. John Doe",
      rating: 4.3,
      email: "john.doe@example.com",
      date: "2025-01-18",
      comment:
        "Dr. Doe is kind and thorough. He takes the time to explain things clearly.",
    },
    {
      name: "Dr. Emily Carter",
      rating: 4.8,
      email: "emily.carter@healthcare.com",
      date: "2025-01-22",
      comment:
        "Dr. Carter is an excellent listener and provides personalized care to each patient.",
    },
    {
      name: "Dr. Michael Johnson",
      rating: 4.6,
      email: "michael.johnson@medmail.com",
      date: "2025-01-24",
      comment:
        "Dr. Johnson is always attentive and ensures every concern is addressed.",
    },
    {
      name: "Dr. Olivia Brown",
      rating: 4.9,
      email: "olivia.brown@clinicmail.com",
      date: "2025-01-19",
      comment:
        "Dr. Brown is fantastic! She makes sure her patients receive the best care possible.",
    },
    {
      name: "Dr. Daniel Garcia",
      rating: 4.4,
      email: "daniel.garcia@hospital.com",
      date: "2025-01-21",
      comment:
        "Dr. Garcia has a great bedside manner and is very thorough with his treatment plans.",
    },
    {
      name: "Dr. Sophia Lee",
      rating: 4.7,
      email: "sophia.lee@medical.org",
      date: "2025-01-17",
      comment:
        "Dr. Lee is very professional and her friendly approach puts patients at ease.",
    },
    {
      name: "Dr. James Wilson",
      rating: 4.2,
      email: "james.wilson@caremail.com",
      date: "2025-01-23",
      comment:
        "Dr. Wilson is very attentive and answers all questions with patience.",
    },
    {
      name: "Dr. Abigail Taylor",
      rating: 4.5,
      email: "abigail.taylor@health.org",
      date: "2025-01-16",
      comment:
        "Dr. Taylor goes above and beyond to make sure her patients feel valued and heard.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4">
      {cards.map((card, index) => (
        <FeedbackCard key={index} {...card} />
      ))}
    </div>
  );
};

export default App;
