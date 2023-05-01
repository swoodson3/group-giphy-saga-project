import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteImage from './FavoriteImage';

const FavoritesList = () => {
  const userId = useSelector(state => state.userId);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {;
  }, [dispatch, userId]);


  return (
    <div>
      <h2>Favorites</h2>
      {favorites.map(favorite => 
      <FavoriteImage key={favorite.id} 
      favorite={favorite} 
      />
      )}
    </div>
  );
};

export default FavoritesList;