"use client"

import { useState, FormEventHandler } from "react";
import Modal from "./Modal";
import { addTask } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>('');

  const handleSubmitNewTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTask({
      id: uuidv4(),
      text: newTask,
      completed: false
    });
    setNewTask('');
    setOpenModal(false);
    router.refresh();
  }
  
  return (
    <div>
      <button className="btn btn-primary w-[285px] sm:w-[450px]" onClick={() => setOpenModal(true)}>+ Add Task</button>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <form onSubmit={handleSubmitNewTask}>
          <h3 className="">Add New Task</h3>
          <div className="modal-action flex justify-around">
            <input value = {newTask} onChange={(e) => setNewTask(e.target.value)} type="text" placeholder="Type task here" className="input w-full" />
            <button className="btn btn-primary" type="submit">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
