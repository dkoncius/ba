import { Link } from 'react-router-dom';

const ContentHeader = () => {
  return (
    <div className="container">
      <header className="content-header">
          <div className="content-header-top">
              <Link to="/progress">
                <img className="stats-icon" src="/content/stats-icon.svg" alt="stats icon" />
              </Link>
              <Link to="/kids">
                <img className="profile-image" src="/kids/kid-1.jpg" alt="kid-1" />
              </Link>
          </div>
      </header>
    </div>
  )
}

export default ContentHeader