import { useState } from 'react';
import ProgressFiltering from '../components/KidsProgressPage/ProgressFiltering';
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const KidsProgressPage = () => {
    const [isFiltering, setIsFiltering] = useState(false)
    const navigate = useNavigate()

    const goBackToFeed = () => {
      return navigate('/content/gallery');
  }

  return (
    <div className="container">
      <div className="kids-progress">
          <div className="icon" onClick={goBackToFeed}>
            <RxCross1/>
          </div>
          <h2>Pokyčiai</h2>
          <ProgressFiltering setIsFiltering={setIsFiltering}/>
          
          <div className="progress">
            <p className='title'>Ūgis</p>
            <div className="stats">
                <div className="line-1"></div>
                <p>45 → 54</p>
            </div>
          </div>

          <div className="progress">
            <p className='title'>Svoris</p>
            <div className="stats">
                <div className="line-2"></div>
                <p>2.5 → 3.0</p>
            </div>
          </div>

          <div className="progress">
            <p className='title'>Nuotaika</p>
            <div className="stats">
                <div className="mood">
                  <div className="emoji">:)</div>
                  <p className="day">1</p>
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default KidsProgressPage