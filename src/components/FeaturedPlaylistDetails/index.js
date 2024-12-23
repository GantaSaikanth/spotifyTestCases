import {Component} from 'react'

import {Link} from 'react-router-dom'

import moment from 'moment'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FeaturedPlaylistDetails extends Component {
  state = {
    detailsList: [],
    tracksList: [],
    apiStatusDetails: apiConstants.initial,
    index: 0,
  }

  componentDidMount() {
    this.getDetailsList()
  }

  getDetailsList = async () => {
    this.setState({apiStatusDetails: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(
      `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`,
    )

    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        collaborative: data.collaborative,
        description: data.description,
        externalUrls: data.external_urls,
        href: data.href,
        id: data.id,
        images: data.images,
        name: data.name,
        owner: data.owner,
        primaryColor: data.primary_color,
        public: data.public,
        snapshotId: data.snapshot_id,
        tracks: data.tracks,
        type: data.type,
        uri: data.uri,
      }

      const updatedTracksData = data.tracks.items.map(item => ({
        album: item.track.album,
        artists: item.track.artists,
        availableMarkets: item.track.available_markets,
        discNumber: item.track.disc_number,
        durationMs: item.track.duration_ms,
        episode: item.track.episode,
        explicit: item.track.explicit,
        externalIds: item.track.external_ids,
        externalUrls: item.track.external_urls,
        href: item.track.href,
        id: item.track.id,
        isLocal: item.track.is_local,
        name: item.track.name,
        popularity: item.track.popularity,
        previewUrl: item.track.preview_url,
        track: item.track.track,
        trackNumber: item.track.track_number,
        type: item.track.type,
        uri: item.track.uri,
      }))

      this.setState({
        detailsList: updatedData,
        tracksList: updatedTracksData,
        apiStatusDetails: apiConstants.success,
      })
    } else {
      this.setState({apiStatusDetails: apiConstants.failure})
    }
  }

  selectSong = index => {
    this.setState({index})
  }

  renderSuccessDetails = () => {
    const {detailsList, tracksList, index} = this.state

    let albumName

    if (detailsList.name === undefined) {
      albumName = 'Album'
    } else {
      albumName = detailsList.name
    }
    console.log(albumName)

    return (
      <>
        <div className="detail">
          <div className="album-details">
            <img
              src={detailsList.images[0].url}
              alt={detailsList.name}
              className="image-details"
            />
            <div className="album-content-details">
              <p className="editor-pick-para">Editor's picks</p>
              <h1 className="name-heading">{albumName}</h1>
            </div>
          </div>
        </div>
        <div className="tracks">
          <span className="spans">Track</span>
          <span className="spans">Album</span>
          <span className="spans">Time</span>
          <span className="spans">Artist</span>
          <span className="spans">Added</span>
        </div>
        <ul className="ordered-lists">
          {tracksList.map(each => {
            const durationSeconds = Math.floor((each.durationMs / 1000) % 60)
            const durationMinutes = Math.floor(each.durationMs / 1000 / 60)

            const onClickMusicList = () => {
              this.selectSong(index)
            }
            console.log(index)

            const addedAgo = moment(
              each.album.release_date,
              'YYYYMMDD',
            ).fromNow()

            return (
              <li
                className="list-items-details"
                key={each.id}
                onClick={onClickMusicList}
              >
                <div className="list-detailsss">
                  <span className="tracks-names">{each.name}</span>
                  <span className="tracks-names tracks-namess">
                    {each.album.name}
                  </span>
                  <span className="tracks-names tracks-namess">
                    {durationMinutes}:{durationSeconds}
                  </span>
                  <span className="tracks-names tracks-namess">
                    {each.artists[0].name}
                  </span>
                  <span className="tracks-names tracks-namess">{addedAgo}</span>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="music-controls">{this.renderMusic()}</div>
      </>
    )
  }

  renderMusic = () => {
    const {tracksList, index} = this.state
    const currentSongs = tracksList[index]
    console.log(tracksList)
    console.log(currentSongs.album)

    return (
      <>
        <div className="music-album-details">
          <img
            src={currentSongs.album.images[0].url}
            alt={currentSongs.name}
            className="music-images"
          />

          <div className="music-details">
            <h1 className="music-heading">{currentSongs.name}</h1>
            <p className="music-para">{currentSongs.album.artists[0].name}</p>
          </div>
        </div>
        <audio controls>
          <source src={currentSongs.previewUrl} />
          <track kind="captions" srcLang="en" />
        </audio>
      </>
    )
  }

  renderLoaderPage = () => (
    <div className="loader-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733904478/music_ajf3qm.png"
        alt="loader"
      />
      <span className="loade-ing">Loading...</span>
    </div>
  )

  renderFailureDetails = () => (
    <div className="failure-page-details">
      <img
        src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733911712/alert-triangle_ulocco.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={() => this.getDetailsList()}>
        Try again
      </button>
    </div>
  )

  renderDetailsPage = () => {
    const {apiStatusDetails} = this.state

    switch (apiStatusDetails) {
      case apiConstants.success:
        return this.renderSuccessDetails()
      case apiConstants.failure:
        return this.renderFailureDetails()
      case apiConstants.inProgress:
        return this.renderLoaderPage()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="details-list-container">
          <div className="header-none">
            <Header />
          </div>

          <div>
            <div className="back-container">
              <Link className="linkss" to="/">
                <button type="button" className="bytton">
                  <img
                    src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733907046/arrow_back_tqdy4i.png"
                    alt="back"
                  />
                  <p>Back</p>
                </button>
              </Link>
            </div>
            <div className="renderingDetails">{this.renderDetailsPage()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default FeaturedPlaylistDetails
