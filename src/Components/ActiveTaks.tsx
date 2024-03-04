import React, { useState } from "react";

export interface Task {
  name: string;
  active: boolean;
}

interface ActiveTasksProps {
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const ActiveTasks: React.FC<ActiveTasksProps> = ({ setCompletedTasks }) => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      const newTask: Task = {
        name: taskInput,
        active: false,
      };
      setTasks([newTask, ...tasks]);
      setTaskInput("");
    }
  };

  const handleTaskToggle = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    const checkedTask = tasks[index];
    setTasks(updatedTasks);
    setCompletedTasks((prevCompletedTasks) => [
      ...prevCompletedTasks,
      checkedTask,
    ]);
  };

  const handleDeleteTask = (index: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (isConfirmed) {
      const updatedTasks = [
        ...tasks.slice(0, index),
        ...tasks.slice(index + 1),
      ];
      setTasks(updatedTasks);
    }
  };
  const handleDeleteAll = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all active tasks?"
    );
    if (isConfirmed) {
      setTasks([]);
    }
  };
  const tasksPerPage = 6;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pagesToShow = 3;
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => i + startPage
    );

    return (
      <>
        <li
          className="mx-1 px-3 py-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer"
          onClick={() => paginate(Math.max(1, currentPage - 1))}
        >
          <button
            type="button"
            className=" focus:outline-none"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`mx-1 px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => paginate(page)}
          >
            <button type="button" className="focus:outline-none">
              {page}
            </button>
          </li>
        ))}
        <li
          className="mx-1 px-3 py-2 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
        >
          <button
            type="button"
            className="focus:outline-none"
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </li>
      </>
    );
  };

  return (
    <div className="mx-auto w-full flex-row justify-center">
      {tasks.length !== 0 ? (
        <div className="flex items-center">
          <h2 className="text-center w-11/12  text-2xl font-bold mb-1">
            Active Tasks
          </h2>

          <span
            className="btn btn-danger w-1/12 mb-2 py-1 px-2"
            onClick={handleDeleteAll}
          >
            Delete All
          </span>
        </div>
      ) : (
        <h2 className="text-center text-2xl font-bold mb-1">Active Tasks</h2>
      )}

      <div className="mt-2 mb-4 flex justify-between items-center">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter task"
          value={taskInput}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTask();
            }
          }}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm md:text-md lg:text-lg xl:text-lg rounded-md shadow-sm focus:outline-none"
          type="button"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="mt-4 text-center text-gray-600">No Active Tasks</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-1 py-2">Status</th>
                <th className="px-1 py-2">Task Name</th>
                <th className="px-1 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map(
                (task, index) =>
                  !task.active && (
                    <tr key={index}>
                      <td className="px-1 py-2 sm:w-1/4">
                        <input
                          type="checkbox"
                          checked={task.active}
                          onChange={() =>
                            handleTaskToggle(indexOfFirstTask + index)
                          }
                        />
                      </td>
                      <td className="px-1 py-2 sm:w-1/2">{task.name}</td>
                      <td className="px-1 py-2">
                        <span
                          className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                          onClick={() => handleDeleteTask(index)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
          <nav className="mt-4" aria-label="Pagination">
            <ul className="flex justify-center">{renderPagination()}</ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ActiveTasks;
