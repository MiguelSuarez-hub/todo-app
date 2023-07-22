"use client";

import { ITasks } from "@/types/tasks";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";
import { useState, FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { deleteTask, editTask } from "@/api";

interface TaskProp {
  task: ITasks;
}

const Task: React.FC<TaskProp> = ({ task }) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState<boolean>(
    task.completed
  );
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [taskEdited, setTaskEdited] = useState<string>(task.text);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleEditTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTask({
      id: task.id,
      text: taskEdited,
      completed: task.completed
    });
    setTaskEdited("");
    setOpenEditModal(false);
    router.refresh();
  };

  const handleCompleteTask = () => {
    setIsCompleted(!isCompleted); 
  };

  const updateCompletedTask = async () => {
    await editTask({
      id: task.id,
      text: task.text,
      completed: isCompleted,
    });
  }

  const handleDeleteTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await deleteTask(task.id);
    setOpenDeleteModal(false);
    router.refresh();
  };

  return (
    
    <li
      key={task.id}
      className="w-full flex justify-around items-center mb-3 p-2 border border-white rounded-md"
    >
      <div className="w-2/12 flex items-center justify-start">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCompleteTask}
          className="checkbox"
        />
      </div>
      <p
        className={`text-sm sm:text-lg w-8/12 ${
          isCompleted ? "line-through" : ""
        }`}
      >
        {task.text}
      </p>
      <div className="flex justify-around w-2/12">
        <BiSolidEdit
          cursor="pointer"
          className="text-cyan-600 hover:scale-125"
          size={20}
          onClick={() => setOpenEditModal(true)}
        />
        <Modal openModal={openEditModal} setOpenModal={setOpenEditModal}>
          <form onSubmit={handleEditTask}>
            <h3 className="">Edit Task</h3>
            <div className="modal-action flex justify-around">
              <input
                value={taskEdited}
                onChange={(e) => setTaskEdited(e.target.value)}
                type="text"
                placeholder="Type task here"
                className="input w-full"
              />
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
          </form>
        </Modal>
        <MdDelete
          cursor="pointer"
          className="text-red-700 hover:scale-125"
          size={20}
          onClick={() => setOpenDeleteModal(true)}
        />
        <Modal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal}>
          <form onSubmit={handleDeleteTask}>
            <h3 className="">Delete task</h3>
            <div className="modal-action flex justify-around items-center">
              <p>Are you sure?</p>
              <button className="btn btn-error" type="submit">
                Delete
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </li>
  );
};

export default Task;
