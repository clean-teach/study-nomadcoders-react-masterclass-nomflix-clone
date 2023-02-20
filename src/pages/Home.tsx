import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getlastedMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../apis/movies';
import { makeImagePath } from '../utils/utils';
import Slider from '../Components/Slider';
import { useParams } from 'react-router-dom';
import MovieDetail from '../Routes/MovieDetail';
import { Category, IGetMoviesResult, IMovie } from '../types/types';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 1.25rem;
  width: 50%;
`;

function Home() {
  const params = useParams();
  const queryKey_0 = 'movies';

  const { data: latestData, isLoading: isLoadingLatest } = useQuery<IMovie>(
    [queryKey_0, 'latest'],
    getlastedMovies,
  );
  const useMultipleQuery = () => {
    const nowPlaying = useQuery<IGetMoviesResult>(
      [queryKey_0, 'nowPlaying'],
      getNowPlayingMovies,
    );
    const topRated = useQuery<IGetMoviesResult>(
      [queryKey_0, 'topRated'],
      getTopRatedMovies,
    );
    const upcoming = useQuery<IGetMoviesResult>(
      [queryKey_0, 'upcoming'],
      getUpcomingMovies,
    );
    return [nowPlaying, topRated, upcoming];
  };
  const [
    { data: nowPlayingData, isLoading: isLoadingNowPlaying },
    { data: topRatedData, isLoading: isLoadingTopRated },
    { data: upcomingData, isLoading: isLoadingUpcoming },
  ] = useMultipleQuery();

  useEffect(() => {
    console.log(latestData);
    if (latestData?.poster_path === null) {
      console.log('해당 작품은 이미지가 존재하지 않습니다.');
    }
  }, [latestData]);

  return (
    <Wrapper style={{ height: '200vh' }}>
      {isLoadingNowPlaying &&
      isLoadingLatest &&
      isLoadingTopRated &&
      isLoadingUpcoming ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {latestData && (
            <Banner
              bgPhoto={
                latestData.poster_path
                  ? makeImagePath(latestData.poster_path || '')
                  : 'black'
              }
            >
              <Title>{latestData.title || latestData.name}</Title>
              <Overview>{latestData.overview}</Overview>
            </Banner>
          )}
          {nowPlayingData && (
            <Slider
              apiResultData={nowPlayingData}
              sliderTitle={'Now Playing'}
              category={Category.movie}
            />
          )}
          {topRatedData && (
            <Slider
              apiResultData={topRatedData}
              sliderTitle={'Top Rated'}
              category={Category.movie}
            />
          )}
          {upcomingData && (
            <Slider
              apiResultData={upcomingData}
              sliderTitle={'Upcoming'}
              category={Category.movie}
            />
          )}
        </>
      )}
      {params.movieId !== undefined ? (
        <MovieDetail params={params.movieId} />
      ) : null}
    </Wrapper>
  );
}

export default Home;
