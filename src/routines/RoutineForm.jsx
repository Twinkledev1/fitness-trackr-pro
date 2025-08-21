import useMutation from "../api/useMutation";

/** Users can create new routines with a name and goal. */
export default function RoutineForm() {
  const {
    mutate: createRoutine,
    loading,
    error,
  } = useMutation("POST", "/routines", ["routines"]);

  const handleSubmit = (formData) => {
    const name = formData.get("name");
    const goal = formData.get("goal");
    createRoutine({ name, goal });
  };

  return (
    <>
      <h2>Create a New Routine</h2>
      <form action={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Goal
          <textarea name="goal" required />
        </label>
        <button disabled={loading}>
          {loading ? "Creating..." : "Create Routine"}
        </button>
        {error && <o>Error: {error}</o>}
      </form>
    </>
  );
}