import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import SetForm from "./SetForm";
import SetList from "./SetList";

/** Shows details for a single routine with sets management */
export default function RoutineDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    data: routine,
    loading,
    error,
  } = useQuery(`/routines/${id}`, `routine-${id}`);

  const {
    mutate: deleteRoutine,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation("DELETE", `/routines/${id}`, ["routines"]);

  const handleDelete = async () => {
    await deleteRoutine();
    if (!deleteError) {
      navigate("/routines");
    }
  };

  if (loading || !routine) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <>
      <h1>{routine.name}</h1>
      <p><strong>Goal:</strong> {routine.goal}</p>
      <p><strong>Created by:</strong> {routine.creatorName}</p>

      {token && (
        <button onClick={handleDelete} disabled={deleteLoading}>
          {deleteLoading ? "Deleting..." : "Delete Routine"}
        </button>
      )}
      {deleteError && <o>Error: {deleteError}</o>}

      <SetList routineId={id} />
      {token && <SetForm routineId={id} />}
    </>
  );
}