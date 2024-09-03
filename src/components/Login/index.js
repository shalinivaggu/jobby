import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', error: false, errorMsg: ''}

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const result = await response.json()
    if (response.ok) {
      const jwtToken = result.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({error: true, errorMsg: result.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {error, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form onSubmit={this.onSubmitForm} className="login-form">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={this.onChangePassword}
            />
            <button type="submit">Login</button>
            {error && <p>* {errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
