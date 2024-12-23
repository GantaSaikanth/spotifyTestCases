import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  successPage = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failurePage = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.successPage(data.jwt_token)
    } else {
      this.failurePage(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-page">
          <div className="spotify-login-container">
            <img
              src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733904478/music_ajf3qm.png"
              alt="login website logo"
            />
            <h1 className="head">Spotify remix</h1>
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div>
              <label htmlFor="userName" className="label">
                USERNAME
              </label>
              <br />
              <input
                className="input"
                id="userName"
                type="text"
                value={username}
                onChange={this.onChangeUsername}
              />
              <br />
            </div>

            <div>
              <label htmlFor="passWord" className="label">
                PASSWORD
              </label>
              <br />
              <input
                className="input"
                id="passWord"
                type="password"
                value={password}
                onChange={this.onChangePassword}
              />
              <br />
            </div>
            <button type="submit" className="login-btn">
              LOGIN
            </button>
            {showError ? <p className="error-msg">*{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
