import './index.css'

const TabItems = props => {
  console.log(props)

  const {tabDetails, isActive, onChangeActiveTab} = props

  const {optionId, displayText} = tabDetails

  console.log(optionId)

  const changeActiveTab = () => {
    onChangeActiveTab(optionId)
  }

  const activeClassName = isActive ? 'active-tab' : 'inactive-tab'
  return (
    <li className="tab-button">
      <button
        className={activeClassName}
        type="button"
        onClick={changeActiveTab}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItems
