import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { API_KEY } from '../../Key';
import { Row } from 'antd';

import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [casts, setCasts] = useState([]);
  const [actorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
        console.log('response', response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        // console.log('responseForCrew', response);
        setCasts(response.cast);
      });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!actorToggle);
  };

  return (
    <div>
      {/* Header */}
      {movie.backdrop_path && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
          title={movie.original_title}
          text={movie.overview}
        />
      )}

      {/* Body */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {movie && (
            <Favorite
              movieInfo={movie}
              movieId={movieId}
              userFrom={localStorage.getItem('userId')}
            />
          )}
        </div>
        {/* Movie Info */}
        <MovieInfo movie={movie} />
        <br />
        {/* Actor Grid */}
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}
        >
          <button onClick={toggleActorView}>Toggle Actor View</button>
        </div>
        {actorToggle && (
          <Row gutter={[16, 16]}>
            {casts &&
              casts.map((cast, idx) => (
                <React.Fragment key={idx}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    characterName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
