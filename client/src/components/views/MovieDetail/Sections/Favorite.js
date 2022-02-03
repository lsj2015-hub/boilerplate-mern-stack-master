import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';

function Favorite(props) {
  // console.log('props: ', props);
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  useEffect(() => {
    axios.post('/api/favorite/favoriteNumber', variables).then((response) => {
      // console.log('favoriteNumber 가져오기: ', response.data);
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert('숫자 정보를 가져오는데 실패했습니다.');
      }
    });

    axios.post('/api/favorite/favorited', variables).then((response) => {
      if (response.data.success) {
        // console.log('favortite 추가하기: ', response.data);
        setFavorited(response.data.favorited);
      } else {
        alert('정보를 가져오는데 실패했습니다.');
      }
    });
  }, []);

  const onclickFavorite = () => {
    if (favorited) {
      axios
        .post('/api/favorite/removeFromFavorite', variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(favoriteNumber - 1);
            setFavorited(!favorited);
          } else {
            alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
          }
        });
    } else {
      axios.post('/api/favorite/addToFavorite', variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(favoriteNumber + 1);
          setFavorited(!favorited);
        } else {
          alert('Favorite 리스트에서 추가하는 걸 실패했습니다.');
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onclickFavorite}>
        {favorited ? 'Not Favorite' : 'Add to Favorite'}{' '}
        {favoriteNumber === 0 ? <HeartTwoTone /> : favoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
