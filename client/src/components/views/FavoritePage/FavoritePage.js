import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './favorite.css';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetFavoriteMovie();
  }, []);

  const fetFavoriteMovie = () => {
    axios
      .post('/api/favorite/getFavoriteMovie', {
        userFrom: localStorage.getItem('userId'),
      })
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data);
          setFavorites(response.data.favorites);
        } else {
          alert('영화 정보를 가져오는데 실패했습니다.');
        }
      });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    axios
      .post('/api/favorite/removeFromFavorite', variables)
      .then((response) => {
        if (response.data.success) {
          fetFavoriteMovie();
        } else {
          alert('리스트에서 지우는데 실패했습니다.');
        }
      });
  };

  const renderCards =
    favorites &&
    favorites.map((favorite, idx) => {
      const content = (
        <div>
          {favorite.moviePost ? (
            <img
              src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}
              alt="movie_image"
            />
          ) : (
            'no image'
          )}
        </div>
      );

      return (
        <tr key={idx}>
          <Popover content={content} title={`${favorite.movieTitle}`}>
            <td>{favorite.movieTitle}</td>
          </Popover>
          <td>{favorite.movieRunTime} mins</td>
          <td>
            <button
              onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>Favorite Movie</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from favorite</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
