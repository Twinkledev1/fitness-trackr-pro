import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

/** Shows details for a single activity with delete functionality for logged-in users */
export default function ActivityDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${id}`, `activity-${id}`);

  const {
    mutate: deleteActivity,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation("DELETE", `/activities/${id}`, ["activities"]);

  const handleDelete = async () => {
    await deleteActivity();
    if (!deleteError) {
      navigate("/activities");
    }
  };

  if (loading || !activity) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <>
      <h1>{activity.name}</h1>
      <p><strong>Description:</strong> {activity.description}</p>
      <p><strong>Created by:</strong> {activity.creatorName}</p>
      
      {token && (
        <button onClick={handleDelete} disabled={deleteLoading}>
          {deleteLoading ? "Deleting..." : "Delete Activity"}
        </button>
      )}
      {deleteError && <output>Error: {deleteError}</output>}
    </>
  );
}