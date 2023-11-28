import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  console.log('eachRepo:', eachRepo)
  const {name, issues, stars, forks, avatar} = eachRepo

  return (
    <li className="repo-list-item">
      <img src={avatar} alt={name} className="avatar" />
      <h1>{name}</h1>
      <div className="count-container">
        <div className="star">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            className="icon"
            alt="stars"
          />
          <p>{stars}</p>
        </div>
        <div className="star">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            className="icon"
            alt="forks"
          />
          <p>{forks}</p>
        </div>
        <div className="star">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="icon"
            alt="open issues"
          />
          <p>{issues}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
