import React, { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

const fetchData = async () => {
  try {
    const response = await axios.get('https://reqres.in/api/users');
    return response.data.data; // Return the array of users from the response
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return []; // Return an empty array in case of error
  }
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchData();
      setUsers(fetchedUsers); // Update the state with the fetched users
      setIsLoading(false);
    };

    getUsers();
  }, []);

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvite = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChange={onChangeSearchValue}
          searchValue={searchValue}
          isLoading={isLoading}
          items={users}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvite={onClickSendInvite}
        />
      )}
    </div>
  );
};

export default App;
