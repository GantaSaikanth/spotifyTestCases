import {Component} from 'react'

import {Link} from 'react-router-dom'

import CategoryGenre from '../CategoryGenre'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CategoriesPlaylistDetails extends Component {
  state = {categoryDetailList: [], apiStatusForDetails: apiConstants.initial}

  componentDidMount() {
    this.getCategoryDetails()
  }

  getCategoryDetails = async () => {
    this.setState({apiStatusForDetails: apiConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.playlists.items.map(item => ({
        collaborative: item.collaborative,
        description: item.description,
        externalUrls: item.external_urls,
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        owner: item.owner,
        primaryColor: item.primary_color,
        public: item.public,
        snapshotId: item.snapshot_id,
        tracks: item.tracks,
        type: item.type,
        uri: item.uri,
      }))

      this.setState({
        categoryDetailList: updatedData,
        apiStatusForDetails: apiConstants.success,
      })
    } else {
      this.setState({apiStatusForDetails: apiConstants.failure})
    }
  }

  successDetailsPages = () => {
    const {categoryDetailList} = this.state

    return (
      <ul className="list-category-items">
        {categoryDetailList.map(each => (
          <CategoryGenre key={each.id} categoryDetailsLists={each} />
        ))}
      </ul>
    )
  }

  renderLoaderForDetailsPage = () => (
    <div className="loader-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733904478/music_ajf3qm.png"
        alt="loader"
      />
      <span className="loade-ing">Loading...</span>
    </div>
  )

  failureDetailsPages = () => (
    <div className="failure-page-details">
      <img
        src="https://res.cloudinary.com/dnvtpszvn/image/upload/v1733911712/alert-triangle_ulocco.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={() => this.getCategoryDetails()}>
        Try again
      </button>
    </div>
  )

  renderDetailsPage = () => {
    const {apiStatusForDetails} = this.state

    switch (apiStatusForDetails) {
      case apiConstants.success:
        return this.successDetailsPages()
      case apiConstants.failure:
        return this.failureDetailsPages()
      case apiConstants.inProgress:
        return this.renderLoaderForDetailsPage()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="details-list-containers">
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
            <h1 className="podcasts">Podcasts</h1>
            <div className="renderingDetails">{this.renderDetailsPage()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default CategoriesPlaylistDetails
