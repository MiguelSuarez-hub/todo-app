'use client'

import { ITask } from "@/types/tasks";
import { RiEditBoxLine, RiDeleteBinLine } from 'react-icons/ri'
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [completeTask, setCompleteTask] = useState(false);
  
  
  const handleEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
      completed: task.completed
    });
    setTaskToEdit('');
    setModalEditOpen(false);
    router.refresh();
  }

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setModalDeleteOpen(false);
    router.refresh();
  }

  const handleCompleteTask = async () => {
    const updateCompleteTask = !task.completed;
    console.log(updateCompleteTask);
    
    await editTodo({
      id: task.id,
      text: taskToEdit,
      completed: updateCompleteTask
    });
    router.refresh();
  }

  const toggle = (value: boolean) => {
    return !value
  }

  return (
    <tr key={task.text + task.id}>
      <td>
        <input type="checkbox" checked={task.completed} className="checkbox checkbox-info" onChange={handleCompleteTask}/>
      </td>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-3">
        <RiEditBoxLine onClick={()=>setModalEditOpen(true)} cursor='pointer' className="text-green-700" size={20} />
        <Modal modalOpen={modalEditOpen} setModalOpen={setModalEditOpen}>
          <form onSubmit={handleEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input type="text" placeholder="Type here" className="input input-bordered w-full" value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)}/>
              <button type="submit" className="btn">Edit</button>
            </div>
          </form>
        </Modal>
        <RiDeleteBinLine onClick={()=>setModalDeleteOpen(true)} cursor='pointer' className="text-red-500" size={20} />
        <Modal modalOpen={modalDeleteOpen} setModalOpen={setModalDeleteOpen}>
          <h3 className="text-lg">Are you sure that you want to delete this task?</h3>
          <div className="modal-action">
            <button className="btn btn-error" onClick={()=>handleDeleteTodo(task.id)}>Yes</button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Task;