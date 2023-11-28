import './index.css'

const LanguageFilterItem = props => {
  const {eachLang, updateActiveLangId, activeLangId} = props

  const handleActiveLangId = () => {
    updateActiveLangId(eachLang.id)
  }

  return (
    <button
      type="button"
      className={`${eachLang.id === activeLangId ? 'active' : ''} list-item`}
      onClick={handleActiveLangId}
    >
      <p className="lang-name">{eachLang.language}</p>
    </button>
  )
}

export default LanguageFilterItem
