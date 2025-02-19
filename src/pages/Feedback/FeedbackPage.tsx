import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import FeedbackCard from "./feedback-card";
import { Feedback } from "@/types/feedback";

const FeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<Feedback[]>("/feedback/all"); // Update URL accordingly
        setFeedbacks(response.data);
      } catch (err) {
        setError("Failed to fetch feedbacks.");
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
      {feedbacks.map((feedback) => (
        <FeedbackCard key={feedback.id} {...feedback} />
      ))}
    </div>
  );
};

export default FeedbackPage;
