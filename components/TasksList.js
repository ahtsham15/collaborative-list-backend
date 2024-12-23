import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '@/features/tasksSlice';

const TasksList = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  // Extract the task data properly
  const taskList = tasks?.data || []; // Access 'data' if it's available

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks(user.token)); // Fetch tasks with the user's token
    }
  }, [dispatch, user]);

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Error: {error?.message || 'Something went wrong'}
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tasks List</h2>
      {taskList.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Created By</th>
              <th className="border p-2">Shared With</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task) => (
              <tr key={task.id}>
                <td className="border p-2">{task.id}</td>
                <td className="border p-2">{task.name}</td>
                <td className="border p-2">{task.description}</td>
                <td className="border p-2">
                  {new Date(task.created_at).toLocaleString()}
                </td>
                <td className="border p-2">{task.created_by}</td>
                <td className="border p-2">
                  {task.shared_with?.join(', ') || 'No one'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TasksList;
