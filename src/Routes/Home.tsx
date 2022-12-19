import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getlastedMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMoviesResult,
  IMovie,
} from '../api';
import { makeImagePath } from '../utils';
import DetailBox from '../Components/DetailBox';
import Slider from '../Components/Slider';

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
  const { data: latestData, isLoading: isLoadingLatest } = useQuery<IMovie>(
    ['movies', 'latest'],
    getlastedMovies,
  );
  const useMultipleQuery = () => {
    const nowPlaying = useQuery<IGetMoviesResult>(
      ['movies', 'nowPlaying'],
      getNowPlayingMovies,
    );
    const topRated = useQuery<IGetMoviesResult>(
      ['movies', 'topRated'],
      getTopRatedMovies,
    );
    const upcoming = useQuery<IGetMoviesResult>(
      ['movies', 'upcoming'],
      getUpcomingMovies,
    );
    return [nowPlaying, topRated, upcoming];
  };
  const [
    { data: nowPlayingData, isLoading: isLoadingNowPlaying },
    { data: topRatedData, isLoading: isLoadingTopRated },
    { data: upcomingData, isLoading: isLoadingUpcoming },
  ] = useMultipleQuery();

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
            <Banner bgPhoto={makeImagePath(latestData.poster_path || '')}>
              <Title>{latestData.title}</Title>
              <Overview>{latestData.overview}</Overview>
            </Banner>
          )}
          {nowPlayingData && (
            <>
              <Slider data={nowPlayingData} sliderTitle={'Now Playing'} />
              <DetailBox data={nowPlayingData} />
            </>
          )}
          {topRatedData && (
            <>
              <Slider data={topRatedData} sliderTitle={'Top Rated'} />
              <DetailBox data={topRatedData} />
            </>
          )}
          {upcomingData && (
            <>
              <Slider data={upcomingData} sliderTitle={'Upcoming'} />
              <DetailBox data={upcomingData} />
            </>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
