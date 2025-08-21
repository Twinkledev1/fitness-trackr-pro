import { useState } from "react";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

/** Form to add sets to a routine */
export default function SetForm({ routineId }) {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [count, setCount] = useState("");

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useQuery("/activities", "activities");

  const {
    mutate: addSet,
    loading,
    error,
  } = useMutation("POST", `/routines/${routineId}/activities`, [
    `routine-${routineId}-sets`,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedActivity || !count) return;

    addSet({
      activityId: parseInt(selectedActivity),
      count: parseInt(count),
    });

    // Reset form
    setSelectedActivity("");
    setCount("");
  };

  if (activitiesLoading) return <p>Loading activities...</p>;
  if (activitiesError) return <p>Error loading activities: {activitiesError}</p>;

  return (
    <>
      <h3>Add a Set</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Activity
          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            required
          >
            <option value="">Select an activity</option>
            {activities?.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Reps
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min="1"
            required
          />
        </label>
        <button disabled={loading || !selectedActivity || !count}>
          {loading ? "Adding..." : "Add Set"}
        </button>
        {error && <o>Error: {error}</o>}
      </form>
    </>
  );
}