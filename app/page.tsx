import Image from 'next/image'
import AddTask from './components/AddTask'
import TodoList from './components/TodoList'
import { getAllTasks } from '@/api'

export default async function Home() {
  const tasks = await getAllTasks();
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 py-24 px-2">
      <h1 className='text-4xl font-bold'>TODO APP</h1>
      <AddTask/>      
      <TodoList tasks={tasks}/>
    </main>
  )
}
