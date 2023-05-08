import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteImage from './FavoritesImage';

const FavoritesList = () => {
  const userId = useSelector(store => store.userId);
  const favorites = useSelector(store => store.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch, userId]);


  return (
    <div>
      <h2>Favorites</h2>
      {favorites.map((favorite) => (
                <FavoriteImage key={favorite.id} 
                favorite={favorite} 
                />
                ))} 
    </div>
  );
};


{/* <div key={favorite.id}>
<h3>{favorite}</h3>
</div> */}
export default FavoritesList;