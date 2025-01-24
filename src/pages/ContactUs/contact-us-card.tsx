import React from "react";
import { Card } from "@/components/ui/card";
import { ContactUs } from "@/types/contact-us";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactUsCard: React.FC<ContactUs> = ({
  id,
  name,
  email,
  contactNumber,
  subject,
  message,
}) => {
  return (
    <Card className=" w-full p-4 border rounded-lg shadow-md ">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm ">Contact Number: {contactNumber}</p>
      <p className="text-sm ">Email: {email}</p>
      <p className="text-sm ">Subject: {subject}</p>

      <div className="mt-4">
        <p className="text-sm font-medium">message:</p>
        <p className="text-sm  dark:text-gray-400 mt-1 line-clamp-3">
          {message}
        </p>
      </div>
    </Card>
  );
};

export default ContactUsCard;
