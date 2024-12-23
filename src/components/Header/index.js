import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header">
      <Link className="linkss" to="/">
        <img
          src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733904478/music_ajf3qm.png"
          alt="website logo"
          className="image"
        />
      </Link>
      <button className="logout-button" type="button" onClick={onClickLogout}>
        <img
          src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733908621/log-out-04_avegzr.png"
          alt="logout"
        />
        <p className="logout-para">Logout</p>
      </button>
    </nav>
  )
}

export default withRouter(Header)
