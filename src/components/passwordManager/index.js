import {Component} from 'react'

import {v4 as uniqueId} from 'uuid'

import PasswordItems from '../passwordItems/index'

import './index.css'

class PasswordManager extends Component {
  state = {
    userName: '',
    webSite: '',
    password: '',
    passwordsList: [],
    isShown: false,
    searchInput: '',
  }

  onSubmitPassword = event => {
    event.preventDefault()
    const {password, userName, webSite} = this.state
    const newPassword = {
      id: uniqueId(),
      webSite,
      userName,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
    }))
  }

  getWebSite = event => {
    this.setState({webSite: event.target.value})
  }

  getUserName = event => {
    this.setState({userName: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeStatus = () => {
    this.setState(prevState => ({
      isShown: !prevState.isShown,
    }))
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(eachItem => eachItem.id !== id)
    this.setState({passwordsList: filteredList})
  }

  onSearchItems = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {passwordsList, isShown, searchInput} = this.state
    const searchedList = passwordsList.filter(eachItem =>
      eachItem.webSite.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const passwordListAvilable = searchedList.length > 0
    return (
      <div className="bg-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="pswMngLogo"
        />
        <div className="sec-top-cont">
          <form className="form-ele" onSubmit={this.onSubmitPassword}>
            <h1 className="heading">Add New Password</h1>
            <div className="inputImgAndBar">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <hr className="line" />
              <input
                type="text"
                className="input-ele "
                placeholder="Enter WebSite"
                onChange={this.getWebSite}
              />
            </div>

            <div className="inputImgAndBar">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                className="input-ele "
                placeholder="Enter UserName"
                onChange={this.getUserName}
              />
            </div>

            <div className="inputImgAndBar">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                className="input-ele "
                placeholder="Enter Password"
                onChange={this.getPassword}
              />
            </div>
            <div className="btn-cont">
              <button type="submit">Add</button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="image-1"
          />
        </div>

        <div>
          <div className="passwords-nav">
            <div>
              <h1>Your Passwords </h1>
              <p>{searchedList.length}</p>
            </div>
            <div className="passwords-search">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input type="search" onChange={this.onSearchItems} />
            </div>
          </div>
        </div>
        <hr className="line" />
        <div className="showPassword">
          <input type="checkbox" id="search" onClick={this.onChangeStatus} />
          <label htmlFor="search">Show passwords</label>
        </div>
        {passwordListAvilable ? (
          <ul>
            {searchedList.map(eachItem => (
              <PasswordItems
                listItems={eachItem}
                key={eachItem.id}
                passwordShown={isShown}
                onDeletePassword={this.onDeletePassword}
              />
            ))}
          </ul>
        ) : (
          <div className="no-password-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
              className="no-password"
            />
            <p>No Passwords</p>
          </div>
        )}
      </div>
    )
  }
}
export default PasswordManager
