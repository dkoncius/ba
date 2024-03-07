import { motion } from "framer-motion";
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressFiltering from '../../components/KidsProgressPage/ProgressFiltering';
import { RxCross1 } from "react-icons/rx";
import UserContext from "../../contexts/UserContext";
import { db } from '../../firebase/firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const facesData = [
  {src: "/faces/angry.svg", mood: "angry"},
  {src: "/faces/cry.svg", mood: "cry"},
  {src: "/faces/laugh.svg", mood: "laugh"},
  {src: "/faces/love.svg", mood: "love"},
  {src: "/faces/peace.svg", mood: "peace"},
  {src: "/faces/wow.svg", mood: "wow"}
];

const KidsProgressPage = () => {
    const {user} = useContext(UserContext);
    const {kidId} = useParams();
    const navigate = useNavigate();
    const [imagesData, setImagesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summaries, setSummaries] = useState({});
    const [moodEntries, setMoodEntries] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);


    useEffect(() => {
      setLoading(true);
      if (user && user.uid) {
        const fetchEndDate = new Date();
        const fetchStartDate = new Date();
        fetchStartDate.setDate(fetchEndDate.getDate() - 30); // Last 30 days
        
        const imagesColRef = collection(db, `users/${user.uid}/images`);
        const q = query(imagesColRef, where("kidId", "==", kidId));
        
        getDocs(q).then(querySnapshot => {
          const fetchedData = querySnapshot.docs
            .map(doc => ({ ...doc.data(), createdAt: doc.data().createdAt.toDate() }))
            .filter(({ createdAt }) => createdAt >= fetchStartDate && createdAt <= fetchEndDate)
            .sort((a, b) => a.createdAt - b.createdAt); // Ascending order by createdAt

          setImagesData(fetchedData);
          setLoading(false);

          // Calculate summaries and mood entries
          const heightData = fetchedData.map(data => data.height);
          const weightData = fetchedData.map(data => data.weight);
          const moodData = fetchedData.map(data => ({ mood: data.mood, src: facesData.find(face => face.mood === data.mood)?.src || '' }));

          setSummaries({
            heightStart: heightData[0] || 0,
            heightEnd: heightData[heightData.length - 1] || 0,
            weightStart: weightData[0] || 0,
            weightEnd: weightData[weightData.length - 1] || 0,
          });

          setMoodEntries(moodData.slice(-30)); // Last 30 moods
        }).catch(error => {
          console.error("Error fetching images data:", error);
          setLoading(false);
        });
      }
    }, [user, kidId]);

  // Updated handleDateChange to refetch data based on selected date range
const handleDateChange = ({ fromDate, toDate }) => {
  setLoading(true);
  // Convert string dates to Date objects for query comparison
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  endDate.setHours(23, 59, 59); // Include the end of the day for 'toDate'

  // Construct the new query with date range
  const imagesColRef = collection(db, `users/${user.uid}/images`);
  const q = query(imagesColRef, 
                  where("kidId", "==", kidId), 
                  where("createdAt", ">=", startDate), 
                  where("createdAt", "<=", endDate));

  getDocs(q).then(querySnapshot => {
      const fetchedData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate() // Convert timestamp to Date
      })).sort((a, b) => a.createdAt - b.createdAt); // Sort by createdAt in ascending order

      setImagesData(fetchedData);
      setLoading(false);

      // Post-fetch processing, similar to initial data load
      processFetchedData(fetchedData);
  }).catch(error => {
      console.error("Error refetching images data based on date range:", error);
      setLoading(false);
  });
};

// Process fetched data (similar logic as initially loading data)
const processFetchedData = (fetchedData) => {
  const heightData = fetchedData.map(data => data.height);
  const weightData = fetchedData.map(data => data.weight);
  const moodData = fetchedData.map(data => ({
      mood: data.mood,
      src: facesData.find(face => face.mood === data.mood)?.src || ''
  }));

  setSummaries({
      heightStart: heightData[0] || 0,
      heightEnd: heightData[heightData.length - 1] || 0,
      weightStart: weightData[0] || 0,
      weightEnd: weightData[weightData.length - 1] || 0,
  });

  setMoodEntries(moodData); // Consider if you want to limit to last 30 entries
};

    const goBackToFeed = () => navigate(`/${kidId}/content/images`);

    return (
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, x: -30}}
          animate={{ opacity: 1, x: 0}}
          transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
          className="kids-progress">
            {/* Progress Header */}
            <div className="kids-progress-header">
              <h2>Pokyčiai</h2>
              <div className="icon" onClick={goBackToFeed}><RxCross1/></div>
            </div>
            <ProgressFiltering setIsFiltering={setIsFiltering} onDateChange={handleDateChange} />

            
            {/* Height and Weight Summaries */}
            <div className="progress">
              <p className='title'>Ūgis</p>
              <div className="stats">
                  <img src="/content/line-1.svg" alt="" />
                  <p className='units'>{`${summaries.heightStart} → ${summaries.heightEnd}`}</p>
              </div>
            </div>

            <div className="progress">
              <p className='title'>Svoris</p>
              <div className="stats">
                  <img src="/content/line-2.svg" alt="" />
                  <p className='units'>{`${summaries.weightStart} → ${summaries.weightEnd}`}</p>
              </div>
            </div>

            {/* Mood Entries */}
            <div className="progress">
              <p className='title'>Nuotaika</p>
              <div className="stats moods">
                {moodEntries.map((entry, index) => (
                    <div key={index} className="mood">
                        {entry.src ? (
                            <img src={entry.src} alt={entry.mood} className="face" />
                        ) : (
                            <div className="no-face"></div> // Placeholder for days without a specific mood
                        )}
                    </div>
                ))}
              </div>
            </div>
        </motion.div>
      </div>
    );
};

export default KidsProgressPage;
