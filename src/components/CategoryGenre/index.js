import {Link, withRouter} from 'react-router-dom'

import './index.css'

const CategoryGenre = props => {
  const {categoryDetailsLists} = props
  const {images, name, tracks, id} = categoryDetailsLists

  const getCategoryId = () => {
    const {match} = props
    const {params} = match
    const {categoryId} = params
    return categoryId
  }

  return (
    <Link className="linkss" to={`/genre/${getCategoryId()}/${id}/playlist`}>
      <li className="genre-album-container">
        <img
          src={images[0].url}
          height={60}
          alt="genre-album"
          className="genre-album-image"
        />
        <div className="genre-album-info">
          <p className="genre-album-name">{name}</p>
          <p className="genre-album-tracks">{tracks.total} Tracks</p>
        </div>
      </li>
    </Link>
  )
}

export default withRouter(CategoryGenre)
