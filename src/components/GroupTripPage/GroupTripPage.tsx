// main group trip page
// leaderboard &/or group stats with clickable individual user links

// stretch:
// pass down banner w/ top leader(s) & countdown
// message board component pulled in here

import React, { useState, useEffect } from 'react';
import SoloPage from '../SoloPage/SoloPage';
import MessageBoard from './MessageBoard';
import { useLocation, useNavigate } from 'react-router-dom';

// TODO: change the type (or make it an interface?)
// need to have a variable number of habits
const tripGoals: Progress = {
  workout: 20,
  diet: 15,
  language: 10,
};

type Progress = {
  workout: number;
  diet: number;
  language: number;
};

type UserInfo = {
  name: string;
  id: number;
  progress: Progress;
};

const calculateTotal = (progress: Progress) => {
  return Object.values(progress).reduce((sum, value) => sum + value, 0);
};

//define page's react componenet
const GroupTripPage: React.FC = () => {
  const navigate = useNavigate();
  // super jank way getting the tripId off of the URL.
  // gets the last 5 characters of the URL string. sets to null if the URL is only /GroupTripPage/
  const location = useLocation();
  let tripId = location.state?.tripId;
  //console.debug('this is the tripID: ' + tripId)
  if (!tripId) {
    const trailingUrl = location.pathname;
    tripId = trailingUrl.length > 15 ? trailingUrl.slice(-5) : null;
  }

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [groupInfo, setGroupInfo] = useState<UserInfo[]>([]);

  useEffect(() => {
    if (!tripId) {
      alert('No Trip Id!');
      navigate('/');
      return;
    }

    const fetchGroupStats = async () => {
      try {
        const res = await fetch(`http://localhost:3000/trips/groupStats/${tripId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch group stats');
        }
        const data = await res.json();
        console.log('res:', res);
        console.log('data:', data);

        // TODO: fix 'any' type
        const fetchedGroupInfo = data.usersAndTrackers.map((user: any) => ({
          name: user.name,
          id: user.id,
          progress: {
            workout: user.workout_count,
            diet: user.diet_count,
            language: user.language_count,
          },
        }));
        setGroupInfo(fetchedGroupInfo);
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    fetchGroupStats();
  }, [tripId, navigate]);

  const handleProgressUpdate = async (userId: number, habit: string) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}/${habit}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, habit }),
      });

      if (!res.ok) throw new Error('Failed to update progress on backend');
      
      const data = await res.json(); //  backend returns { countAfterIncrement: newCount }

      setGroupInfo((prevProgress) =>
        prevProgress.map((user) =>
          user.id === userId ? { ...user, progress: { ...user.progress, [habit]: data.countAfterIncrement } } : user
        )
      );
    } catch (err) {
      console.error('Error updating progress', err);
    }
  };

  // sort the leaderboard (for each user, calc the total progress and sort from high to low)
  // groupInfo is unsorted list of Users. [...] makes a copy - don't mutate original.
  // calculateTotal(b.progress) - calculateTotal(a.progress) --> means if b's total is bigger that a's... etc.
  const sortedProgress = [...groupInfo].sort((a, b) => {
    return calculateTotal(b.progress) - calculateTotal(a.progress);
  });

  // variable to select the entire user object by their ID
  const selectedUser = groupInfo.find((user) => user.id === selectedUserId);

  // render section. note tenary operator -- saying if user is null, display first set. else ... display the user selected (the SoloPage)
  return (
    <div style={{ padding: '20px' }}>
      {!selectedUserId ? (
        <>
          <h2>Trip Name: </h2>
          <h3>Trip Id: {tripId}</h3>
          <h3>Trip Goals:</h3>
          <ul>
            Workout: {tripGoals.workout} sessions <strong>|</strong> Diet: {tripGoals.diet} days of healthy eating{' '}
            <strong>|</strong> Language: {tripGoals.language} lessons
          </ul>

          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ flex: 1 }}>
              <h2>Leaderboard</h2>
              {sortedProgress.map((user, index) => (
                //react requires key for elements in a loop, used user.name as key to map the names instead of the id's
                <div key={user.name}>
                  <button
                    onClick={() => setSelectedUserId(user.id)}
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      padding: '10px',
                      backgroundColor:
                        index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#ffffff00',
                      borderRadius: '8px',
                      borderColor: 'white',
                      width: '30%',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    #{index + 1} - {user.name} - Total: {calculateTotal(user.progress)}
                  </button>
                  <ul>
                    <li>
                      Workout: {user.progress.workout} / {tripGoals.workout}
                    </li>
                    <li>
                      Diet: {user.progress.diet} / {tripGoals.diet}
                    </li>
                    <li>
                      Language: {user.progress.language} / {tripGoals.language}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <h2>Message Board</h2>
              <MessageBoard tripID={tripId} />
            </div>
          </div>
        </>
      ) : (
        <>
          <button onClick={() => setSelectedUserId(null)}>Back to Group Page</button>

          <SoloPage
            userId={selectedUser!.id}
            name={selectedUser!.name}
            progress={selectedUser!.progress}
            tripGoals={tripGoals}
            onProgressUpdate={(id, habit) => handleProgressUpdate(id, habit)}
          />
        </>
      )}
    </div>
  );
};

export default GroupTripPage;
