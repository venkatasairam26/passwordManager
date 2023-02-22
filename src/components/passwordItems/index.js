import './index.css'

const PasswordItems = props => {
  const {listItems, passwordShown, onDeletePassword} = props
  const {id, password, userName, webSite} = listItems
  const firstLetter = webSite[0]

  const deletePasswordItem = () => {
    onDeletePassword(id)
  }

  return (
    <li className="list-item">
      <p>{firstLetter}</p>
      <div>
        <p>{webSite}</p>
        <p>{userName}</p>
        {passwordShown ? (
          <p>{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button type="button" onClick={deletePasswordItem} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default PasswordItems
