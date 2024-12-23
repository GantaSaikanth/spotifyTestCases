import {Component} from 'react'

import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class NewReleasesDetails extends Component {
  state = {
    detailsList: [],
    tracksList: [],
    apiStatusDetailsRoute: apiConstants.initial,
  }

  componentDidMount() {
    this.getDetailsRoute()
  }

  getDetailsRoute = async () => {
    this.setState({apiStatusDetailsRoute: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(
      `https://apis2.ccbp.in/spotify-clone/album-details/${id}`,
    )

    const data = await response.json()

    if (response.ok === true) {
      const updatedInfo = {
        albumType: data.album_type,
        artists: data.artists,
        availableMarkets: data.available_markets,
        copyrights: data.copyrights,
        externalIds: data.external_ids,
        externalUrls: data.external_urls,
        genres: data.genres,
        href: data.href,
        id: data.id,
        images: data.images,
        previewUrl: data.previewUrl,
        label: data.label,
        name: data.name,
        popularity: data.popularity,
        releaseDate: data.release_date,
        releaseDatePrecision: data.release_date_precision,
        totalTracks: data.total_tracks,
        tracks: data.tracks,
        type: data.type,
        uri: data.uri,
      }

      const updatedData = data.tracks.items.map(item => ({
        artists: item.artists,
        availableMarkets: item.available_markets,
        discNumber: item.disc_number,
        durationMs: item.duration_ms,
        explicit: item.explicit,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        isLocal: item.is_local,
        name: item.name,
        previewUrl: item.preview_url,
        trackNumber: item.track_number,
        type: item.type,
        uri: item.uri,
      }))

      this.setState({
        detailsList: updatedData,
        tracksList: updatedInfo,
        apiStatusDetailsRoute: apiConstants.success,
      })
    } else {
      this.setState({apiStatusDetailsRoute: apiConstants.failure})
    }
  }

  getDurationMinutes = durationMss => {
    const durationMinutesPer = Math.floor(durationMss / 1000 / 60)

    return durationMinutesPer
  }

  getDurationSeconds = durationMss => {
    const durationSecondsPer = Math.floor((durationMss / 1000) % 60)

    return durationSecondsPer
  }

  renderSuccessDetailsRoute = () => {
    const {detailsList, tracksList} = this.state
    console.log(detailsList[0].durationMs)
    const durationMinutes = this.getDurationMinutes(detailsList[0].durationMs)
    const durationSeconds = this.getDurationSeconds(detailsList[0].durationMs)
    console.log(durationMinutes, durationSeconds)

    let albumName

    if (detailsList[0].name === undefined) {
      albumName = 'Album'
    } else {
      albumName = detailsList[0].name
    }
    console.log(albumName)

    return (
      <>
        <div className="detail">
          <div className="album-details">
            <img
              src={tracksList.images[0].url}
              alt={detailsList.name}
              className="image-details"
            />
            <div className="album-content-details">
              <p className="editor-pick-para">New Releases</p>
              <h1 className="name-heading">{albumName}</h1>
            </div>
          </div>
        </div>
        <div className="tracks">
          <span className="spans">Track</span>
          <span className="spans">Time</span>
          <span className="spans">Artist</span>
        </div>
        <ul className="ordered-lists">
          <li>
            <div className="list-detailsss">
              <span className="tracks-names">{tracksList.name}</span>
              <span className="tracks-names tracks-namess">
                {durationMinutes}:{durationSeconds}
              </span>
              <span className="tracks-names tracks-namess">
                {tracksList.artists[0].name}
              </span>
            </div>
          </li>
        </ul>
        <div className="music-controls">{this.renderMusic()}</div>
      </>
    )
  }

  renderMusic = () => {
    const {detailsList, tracksList} = this.state
    console.log(detailsList)
    console.log(tracksList)

    return (
      <>
        <div className="music-album-details">
          <img
            src={tracksList.images[0].url}
            alt={tracksList.name}
            className="music-images"
          />

          <div className="music-details">
            <h1 className="music-heading">{tracksList.name}</h1>

            <p className="music-para">{tracksList.artists[0].name}</p>
          </div>
        </div>
        <audio controls>
          <source src={detailsList[0].previewUrl} />
          <track kind="captions" srcLang="en" />
        </audio>
      </>
    )
  }

  renderLoaderPageRoute = () => (
    <div className="loader-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733904478/music_ajf3qm.png"
        alt="loader"
      />
      <span className="loade-ing">Loading...</span>
    </div>
  )

  renderFailureDetailsRoute = () => (
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

  renderDetailsPageRoute = () => {
    const {apiStatusDetailsRoute} = this.state

    switch (apiStatusDetailsRoute) {
      case apiConstants.success:
        return this.renderSuccessDetailsRoute()
      case apiConstants.failure:
        return this.renderFailureDetailsRoute()
      case apiConstants.inProgress:
        return this.renderLoaderPageRoute()
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
            <div className="renderingDetails">
              {this.renderDetailsPageRoute()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default NewReleasesDetails
