import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <div className="not-found">
      <div className="headerps">
        <Header />
      </div>
      <div className="back-container">
        <Link className="linkss" to="/">
          <button type="button" className="bytton">
            <img
              src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733907046/arrow_back_tqdy4i.png"
              alt="back"
            />
            <p>Home Page</p>
          </button>
        </Link>
      </div>

      <div className="not-found-container">
        <img
          src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733906895/Frame_153_raxxxy.png"
          alt="page not found"
          className="not-found-image"
        />
        <h1>Page Not Found</h1>
      </div>
    </div>
  </>
)

export default NotFound
