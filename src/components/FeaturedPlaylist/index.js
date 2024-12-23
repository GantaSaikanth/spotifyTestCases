import {Link} from 'react-router-dom'

import './index.css'

const FeaturedPlaylist = props => {
  const {playlists} = props
  const {name, images, id, tracks} = playlists

  let image

  if (images !== undefined) {
    image = images.reduce((prev, curr) => prev > curr)
    image = image.url
  } else {
    image = null
  }

  return (
    <Link to={`/playlist/${id}`}>
      <li className="list-items">
        <img className="playlist-images" src={image} alt="featured playlist" />
        <p className="playlist-name">{name}</p>
        <p className="playlist-name">{tracks ? tracks.total : 'N/A'}</p>
      </li>
    </Link>
  )
}

export default FeaturedPlaylist
