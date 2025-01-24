import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import ContactUsCard from "./contact-us-card";
import { ContactUs } from "@/types/contact-us";

const FeedbackPage: React.FC = () => {
  const [contactUs, setContactUs] = useState<ContactUs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<ContactUs[]>("/contacts/all"); // Update URL accordingly
        setContactUs(response.data);
      } catch (err) {
        setError("Failed to fetch contact us.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4">
      {contactUs.map((contact) => (
        <ContactUsCard key={contact.id} {...contact} />
      ))}
    </div>
  );
};

export default FeedbackPage;
