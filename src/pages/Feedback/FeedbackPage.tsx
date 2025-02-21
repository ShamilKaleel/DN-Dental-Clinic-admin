import React, { useEffect, useState } from "react";
import FeedbackCard from "./feedback-card";

import { useFeedback } from "@/hooks/useFeedback";

const FeedbackPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { feedbackState, fetchFeedbacks } = useFeedback();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await fetchFeedbacks(); // Update URL accordingly
      } catch (err) {
        setError("Failed to fetch feedbacks.");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading && feedbackState.feedbacks.length === 0) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (feedbackState.feedbacks.length === 0)
    return <p>No feedback available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4">
      {feedbackState.feedbacks.map((feedback) => (
        <FeedbackCard key={feedback.id} {...feedback} />
      ))}
    </div>
  );
};

export default FeedbackPage;
