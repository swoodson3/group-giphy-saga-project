import React from 'react';

const FavoriteImage = ({ favorite }) => {
  return (
    <div>
      <img src={favorite.url} alt={favorite.title} />
      <div>
        <label htmlFor={`category-${favorite.id}`}>Category:</label>
        <select id={`category-${favorite.id}`} value={favorite.category}>
          {/* Display options from database */}
        </select>
      </div>
    </div>
  );
};

export default FavoriteImage;