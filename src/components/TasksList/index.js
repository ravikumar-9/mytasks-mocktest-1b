import './index.css'

const TasksList = props => {
  console.log(props)

  const {taskDetails} = props

  const {task, category} = taskDetails

  console.log(task)

  return (
    <li className="task-card">
      <p className="task">{task}</p>
      <p className="task-button-category" type="button">
        {category}
      </p>
    </li>
  )
}

export default TasksList
