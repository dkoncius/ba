import { Link, useParams } from 'react-router-dom';

const ContentHeader = ({selectedKidData}) => {
  const {kidId} = useParams()

  return (
    <div className="container">
      <header className="content-header">
          <div className="content-header-top">
              <Link to={`/${kidId}/progress`}>
                <img className="stats-icon" src="/content/stats-icon.svg" alt="stats icon" />
              </Link>
              <Link to="/kids">
              {selectedKidData && <img className="profile-image" src={selectedKidData.image} alt={selectedKidData.name}/>}
              </Link>
          </div>
      </header>
    </div>
  )
}

export default ContentHeader