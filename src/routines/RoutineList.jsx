import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/** Shows a list of routines. */
export default function RoutineList() {
  const {
    data: routines,
    loading,
    error,
  } = useQuery("/routines", "routines");

  if (loading || !routines) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {routines.map((routine) => (
        <li key={routine.id}>
          <Link to={`/routines/${routine.id}`}>
            <h3>{routine.name}</h3>
            <p>by {routine.creatorName}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}