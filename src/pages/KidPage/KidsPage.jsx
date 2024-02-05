import { useNavigate } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { Kid } from '../../components/KidsPage/Kid';

const kidsData = [
    {id: 1, name: "Tomas", birthDate: "2022-01-26", image: "/kids/kid-1.jpg"}
]

const KidsPage = () => {
    const navigate = useNavigate()

const handleSignOut = async () => {
    navigate('/login');
    };

const goBackToFeed = () => {
    return navigate('/content/gallery');
}

const handleAddKid = () => {
    navigate('/new-kid');
  };

  return (
    <>
     <nav className='kids-nav'>
      <p className='logout' onClick={handleSignOut}>
        Log Out
      </p>
      <div className="icon" onClick={goBackToFeed}>
        <RxCross1/>
      </div>
    </nav>

    <h1>Pasirink savo vaikutį</h1>

    <section className='kids-container'>
      {kidsData.map((kid) => (
        <Kid key={kid.id} kid={kid} />
        ))}
      <button className='button-green' onClick={handleAddKid}>Pridėti vaiką +</button>
    </section>
    </>
  )
}

export default KidsPage