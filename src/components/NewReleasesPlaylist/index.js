import {Link} from 'react-router-dom'

import './index.css'

const NewReleasesPlaylist = props => {
  const {releases} = props
  const {name, images, id} = releases

  let image

  if (images !== undefined) {
    image = images.reduce((prev, curr) => (prev > curr ? curr : prev))
    image = image.url
  } else {
    image = null
  }

  return (
    <Link to={`/album/${id}`}>
      <li className="list-itemss">
        <img className="playlist-imagess" src={image} alt="new release album" />
        <p className="playlist-names">{name}</p>
      </li>
    </Link>
  )
}

export default NewReleasesPlaylist
