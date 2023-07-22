import { ITasks } from "@/types/tasks";
import Task from "./Task";

interface TodoListProps {
  tasks: ITasks[]
}
const TodoList: React.FC<TodoListProps> = ({tasks}) => {
  return (
    <ul className="w-[285px] sm:w-[450px] gap-5">
      {tasks.map(task => (
        <Task task={task}/>
      ))}
    </ul>
  );
};

export default TodoList;
