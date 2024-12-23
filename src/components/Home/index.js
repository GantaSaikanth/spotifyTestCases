import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import Header from '../Header'
import FeaturedPlaylist from '../FeaturedPlaylist'
import CategoriesPlaylist from '../CategoriesPlaylist'
import NewReleasesPlaylist from '../NewReleasesPlaylist'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiConstants.initial,
    apiStatusCategories: apiConstants.initial,
    apiStatusReleases: apiConstants.initial,
    featuredPlaylist: [],
    categoriesList: [],
    newReleasesList: [],
  }

  componentDidMount() {
    this.getFeaturedPlaylist()
    this.getCategoriesList()
    this.getNewReleases()
  }

  getNewReleases = async () => {
    this.setState({apiStatusReleases: apiConstants.inProgress})
    const url = 'https://apis2.ccbp.in/spotify-clone/new-releases'

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.albums.items.map(each => ({
        albumType: each.album_type,
        artists: each.artists,
        availableMarkets: each.available_markets,
        externalUrls: each.external_urls,
        href: each.href,
        id: each.id,
        images: each.images,
        name: each.name,
        releaseDate: each.release_date,
        releaseDatePrecision: each.release_date_precision,
        totalTracks: each.total_tracks,
        type: each.type,
        uri: each.uri,
      }))

      this.setState({
        apiStatusReleases: apiConstants.success,
        newReleasesList: updatedData,
      })
    } else {
      this.setState({apiStatusReleases: apiConstants.failure})
    }
  }

  getCategoriesList = async () => {
    this.setState({apiStatusCategories: apiConstants.inProgress})
    const url = 'https://apis2.ccbp.in/spotify-clone/categories'

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.categories.items.map(each => ({
        name: each.name,
        id: each.id,
        icons: each.icons,
        tracks: each.tracks,
      }))

      this.setState({
        categoriesList: updatedData,
        apiStatusCategories: apiConstants.success,
      })
    } else {
      this.setState({apiStatusCategories: apiConstants.failure})
    }
  }

  getFeaturedPlaylist = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.playlists.items.map(each => ({
        description: each.description,
        id: each.id,
        images: each.images,
        name: each.name,
        tracks: each.tracks,
      }))

      this.setState({
        featuredPlaylist: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  successHomePage = () => {
    const {featuredPlaylist} = this.state

    return (
      <div>
        <h1 className="feature-title">Editors Picks</h1>
        <ul className="items">
          {featuredPlaylist.map(each => (
            <FeaturedPlaylist key={each.id} playlists={each} />
          ))}
        </ul>
      </div>
    )
  }

  successCategoryPage = () => {
    const {categoriesList} = this.state

    return (
      <div>
        <h1 className="category-title">Genres & Moods</h1>
        <ul className="items">
          {categoriesList.map(each => (
            <CategoriesPlaylist key={each.id} categories={each} />
          ))}
        </ul>
      </div>
    )
  }

  successReleases = () => {
    const {newReleasesList} = this.state

    return (
      <div>
        <h1 className="category-title">New releases</h1>
        <ul className="items">
          {newReleasesList.map(each => (
            <NewReleasesPlaylist key={each.id} releases={each} />
          ))}
        </ul>
      </div>
    )
  }

  failureHomePage = () => (
    <div className="failure-page">
      <img
        src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733911712/alert-triangle_ulocco.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={() => this.getFeaturedPlaylist()}>
        Try again
      </button>
    </div>
  )

  failureCategoryPage = () => (
    <div className="failure-page">
      <img
        src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733911712/alert-triangle_ulocco.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={() => this.getCategoriesList()}>
        Try again
      </button>
    </div>
  )

  failureReleases = () => (
    <div className="failure-page">
      <img
        src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733911712/alert-triangle_ulocco.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={() => this.getNewReleases()}>
        Try again
      </button>
    </div>
  )

  renderLoaderHome = () => (
    <div className="loader-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733904478/music_ajf3qm.png"
        alt="loader"
      />
      <span className="loade-ing">Loading...</span>
    </div>
  )

  renderLoaderCat = () => (
    <div className="loader-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733904478/music_ajf3qm.png"
        alt="loader"
      />
      <span className="loade-ing">Loading...</span>
    </div>
  )

  renderLoaderRel = () => (
    <div className="loader-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733904478/music_ajf3qm.png"
        alt="loader"
      />
      <span className="loade-ing">Loading...</span>
    </div>
  )

  renderHomePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.successHomePage()
      case apiConstants.inProgress:
        return this.renderLoaderHome()
      case apiConstants.failure:
        return this.failureHomePage()
      default:
        return null
    }
  }

  renderCategories = () => {
    const {apiStatusCategories} = this.state

    switch (apiStatusCategories) {
      case apiConstants.success:
        return this.successCategoryPage()
      case apiConstants.inProgress:
        return this.renderLoaderCat()
      case apiConstants.failure:
        return this.failureCategoryPage()
      default:
        return null
    }
  }

  renderNewReleases = () => {
    const {apiStatusReleases} = this.state

    switch (apiStatusReleases) {
      case apiConstants.success:
        return this.successReleases()
      case apiConstants.inProgress:
        return this.renderLoaderRel()
      case apiConstants.failure:
        return this.failureReleases()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="home-container">
        <Header />
        <div className="home">
          {this.renderHomePage()}
          {this.renderCategories()}
          {this.renderNewReleases()}
        </div>
      </div>
    )
  }
}

export default Home
