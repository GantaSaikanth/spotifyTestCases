import {Link} from 'react-router-dom'

import './index.css'

const CategoriesPlaylist = props => {
  const {categories} = props
  const {name, icons, id} = categories

  let icon

  if (icons !== undefined) {
    icon = icons.reduce((prev, curr) => prev > curr)
    icon = icon.url
  } else {
    icon = null
  }

  return (
    <Link to={`/category/${id}`}>
      <li className="list-itemss">
        <img className="playlist-imagess" src={icon} alt="category" />
        <p className="playlist-names">{name}</p>
      </li>
    </Link>
  )
}

export default CategoriesPlaylist
