import {Component} from 'react'

import {v4} from 'uuid'

import TabItems from './components/TabItems'

import TasksList from './components/TasksList'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {tasksList: [], activeOptionId: '', task: '', category: ''}

  onChangeTask = event => this.setState({task: event.target.value})

  onChangeCategory = event => this.setState({category: event.target.value})

  onAddTask = event => {
    const {task, category} = this.state

    event.preventDefault()

    const newTask = {
      id: v4(),
      task,
      category,
    }

    if (task !== '' && category !== '') {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
      }))

      this.setState({task: '', category: ''})
    }
  }

  getFilteredTasks = () => {
    const {activeOptionId, tasksList} = this.state

    const filteredTasks = tasksList.filter(
      eachTask => eachTask.category === activeOptionId,
    )

    if (filteredTasks.length !== 0) {
      return filteredTasks.map(eachTask => (
        <TasksList taskDetails={eachTask} key={eachTask.id} />
      ))
    }
    return <p className="no-tasks">No Tasks Added Yet</p>
  }

  getTasks = () => {
    const {tasksList} = this.state
    if (tasksList.length !== 0) {
      return tasksList.map(eachTask => (
        <TasksList taskDetails={eachTask} key={eachTask.id} />
      ))
    }
    return <p className="no-tasks">No Tasks Added Yet</p>
  }

  getTasksList = () => {
    const {activeOptionId} = this.state

    if (activeOptionId === '') {
      return this.getTasks()
    }
    return this.getFilteredTasks()
  }

  onChangeActiveTab = tabId => {
    console.log(tabId)
    this.setState({activeOptionId: tabId})
  }

  render() {
    const {tasksList, activeOptionId, task, category} = this.state
    console.log(activeOptionId)
    console.log(tasksList)
    return (
      <div className="bg-container">
        <div className="left-container">
          <h1 className="create-tasks-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.onAddTask}>
            <label htmlFor="task" className="label-text">
              Task
            </label>
            <input
              type="text"
              className="task-input"
              value={task}
              id="task"
              placeholder="Enter the task here"
              onChange={this.onChangeTask}
            />

            <label htmlFor="taskTag" className="label-text">
              Tags
            </label>
            <select
              id="taskTag"
              className="tags-input"
              value={category}
              onChange={this.onChangeCategory}
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-button">
              Add Task
            </button>
          </form>
        </div>
        <div className="right-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tabs-container">
            {tagsList.map(eachTab => (
              <TabItems
                tabDetails={eachTab}
                key={eachTab.optionId}
                isActive={activeOptionId === eachTab.optionId}
                onChangeActiveTab={this.onChangeActiveTab}
              />
            ))}
          </ul>
          <h1 className="tasks-heading">Tasks</h1>
          <ul className="tasks-container">{this.getTasksList()}</ul>
        </div>
      </div>
    )
  }
}

export default App
