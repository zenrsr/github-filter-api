import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const renderStatusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  fail: 'FAILED',
}

class GithubPopularRepos extends Component {
  state = {
    activeLangId: languageFiltersData[0].id,
    formattedData: [],
    renderStatus: renderStatusConstants.loading,
  }

  componentDidMount() {
    this.getLang()
  }

  updateActiveLangId = id => this.setState({activeLangId: id}, this.getLang)

  getLang = async () => {
    try {
      const {activeLangId} = this.state
      const api = `https://apis.ccbp.in/popular-repos?language=${activeLangId}`
      const response = await fetch(api)
      const data = await response.json()
      const formattedData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        issues: each.issues_count,
        forks: each.forks_count,
        stars: each.stars_count,
        avatar: each.avatar_url,
      }))

      this.setState({
        formattedData,
        renderStatus: renderStatusConstants.success,
      })
    } catch (error) {
      console.log(console.error())
    }
  }

  renderSuccessView = () => {
    const {formattedData} = this.state
    return (
      <>
        <ul className="repo-list-container">
          {formattedData.map(eachRepo => (
            <RepositoryItem key={eachRepo.id} eachRepo={eachRepo} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure"
        className="failure"
      />
      <h1 className="fail-heading">Something Went Wrong</h1>
    </div>
  )

  render() {
    const {renderStatus, activeLangId} = this.state
    let renderedView = null

    if (renderStatus === renderStatusConstants.success) {
      renderedView = this.renderSuccessView()
    } else if (renderStatus === renderStatusConstants.loading) {
      renderedView = this.renderLoadingView()
    } else {
      renderedView = this.renderFailureView()
    }

    return (
      <div className="container">
        <h1 className="heading">Popular</h1>
        <div className="list-container" type="none">
          {languageFiltersData.map(eachLang => (
            <LanguageFilterItem
              key={eachLang.id}
              eachLang={eachLang}
              updateActiveLangId={this.updateActiveLangId}
              activeLangId={activeLangId}
            />
          ))}
        </div>
        {renderedView}
      </div>
    )
  }
}

export default GithubPopularRepos
