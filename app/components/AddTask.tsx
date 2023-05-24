'use client'

import React, { FormEventHandler, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Modal from './Modal';
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskText, setNewTaskText] = useState<string>('');

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      await addTodo({
        id: uuidv4(),
        text: newTaskText,
        completed: false
      })
      setNewTaskText('');
      setModalOpen(false);
      router.refresh();
    }

  return (
    <div>
      <button onClick={()=>setModalOpen(true)} className="btn btn-primary w-full">
        Add new task
        <AiOutlinePlus className='ml-2' size={15}/>
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input type="text" placeholder="Type here" className="input input-bordered w-full" value={newTaskText} onChange={e => setNewTaskText(e.target.value)}/>
            <button type="submit" className="btn">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask;