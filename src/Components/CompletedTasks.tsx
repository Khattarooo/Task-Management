import React, { useState } from "react";
import { Task } from "./ActiveTaks";

interface CompletedTasksProps {
  completedTasks: Task[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setActiveTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({
  completedTasks,
  setCompletedTasks,
  setActiveTasks,
}) => {
  const [backToActive, setBackToActive] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleDelete = (index: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (isConfirmed) {
      const updatedCompletedTasks = [...completedTasks];
      updatedCompletedTasks.splice(index, 1);
      setCompletedTasks(updatedCompletedTasks);
    }
  };

  const handleDeleteAll = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all active tasks?"
    );
    if (isConfirmed) {
      setCompletedTasks([]);
    }
  };

  const handleTaskToggle = (index: number) => {
    const toggledTask = completedTasks[index];
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);

    if (!toggledTask.active) {
      setBackToActive((prev) => [...prev, toggledTask]);
    }

    toggledTask.active = !toggledTask.active;
    setCompletedTasks(updatedCompletedTasks);
    setActiveTasks((prevActiveTasks) => [...prevActiveTasks, toggledTask]);
  };

  const handleMoveBackToActive = () => {
    setActiveTasks((prevActiveTasks) => [...prevActiveTasks, ...backToActive]);
    setBackToActive([]);
  };

  const tasksPerPage = 6;
  const totalPages = Math.ceil(completedTasks.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = completedTasks.slice(indexOfFirstTask, indexOfLastTask);

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
      <div className="mt-8 mb-4">
        {completedTasks.length === 0 ? (
          <>
            <h2 className="text-center text-2xl font-bold mb-4">
              Completed Tasks
            </h2>
            <div className="text-center text-gray-600">No Completed Tasks</div>
          </>
        ) : (
          <>
            <div className="flex items-center">
              <h2 className="text-center w-10/12 text-2xl font-bold mb-1 mr-2">
                Completed Tasks
              </h2>
              <span
                className="btn btn-danger w-full sm:w-20 mb-2 py-1 px-2 sm:text-xs"
                onClick={handleDeleteAll}
              >
                Delete All
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-1 py-2">Status</th>
                    <th className="px-1 py-2">Task Name</th>
                    <th className="px-1 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((task, index) => (
                    <tr key={index}>
                      <td className="px-1 py-2 sm:w-1/4">
                        <input
                          type="checkbox"
                          checked={!task.active}
                          onChange={() =>
                            handleTaskToggle(indexOfFirstTask + index)
                          }
                        />
                      </td>
                      <td className="px-1 py-2">{task.name}</td>
                      <td className="px-1 py-2">
                        <span
                          className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav className="mt-4" aria-label="Pagination">
                <ul className="flex justify-center">{renderPagination()}</ul>
              </nav>
            </div>
          </>
        )}
      </div>
      {backToActive.length > 0 && (
        <div className="mt-4">
          <span
            onClick={handleMoveBackToActive}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Move {backToActive.length} Task(s) Back to Active
          </span>
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;
