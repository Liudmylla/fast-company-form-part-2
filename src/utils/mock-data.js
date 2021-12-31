import { useState, useEffect } from "react";
import httpService from "../app/services/http.service";
import professions from "../mock-data/professions.json";
import qualities from "../mock-data/qualities.json";
import users from "../mock-data/users.json";

const useMockData = () => {
  const statusConstants = {
    idle: "not started",
    pending: "in process",
    success: "ready",
    error: "Error occurred"
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConstants.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const sumCount = professions.length + qualities.length + users.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = () => {
    if (count && statusConstants.idle) setStatus(statusConstants.pending);
    const newProgress = Math.floor(count / sumCount * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) setStatus(statusConstants.success);
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  const initialize = async () => {
    try {
      for (const profession of professions) {
        await httpService.put(`profession/${profession._id}`, profession);
        incrementCount();
      }
      for (const quality of qualities) {
        await httpService.put(`quality/${quality._id}`, quality);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put(`user/${user._id}`, user);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConstants.error);
    }
  };

  return { error, initialize, progress, status };
};

export default useMockData;
