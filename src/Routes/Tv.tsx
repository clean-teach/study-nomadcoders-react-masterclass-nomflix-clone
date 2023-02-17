import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getAiringTodayTv,
  getlastedTv,
  getPopularTv,
  getTopRatedTv,
} from '../apis/tvShows';
import { makeImagePath } from '../utils/utils';
import Slider from '../Components/Slider';
import { useParams } from 'react-router-dom';
import TvDetail from './TvDetail';
import { IGetMoviesResult, IMovie } from '../types/types';

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

function Tv() {
  const params = useParams();

  const { data: latestData, isLoading: isLoadingLatest } = useQuery<IMovie>(
    ['tvShow', 'latest'],
    getlastedTv,
  );
  const useMultipleQuery = () => {
    const nowPlaying = useQuery<IGetMoviesResult>(
      ['tvShow', 'nowPlaying'],
      getAiringTodayTv,
    );
    const topRated = useQuery<IGetMoviesResult>(
      ['tvShow', 'topRated'],
      getPopularTv,
    );
    const upcoming = useQuery<IGetMoviesResult>(
      ['tvShow', 'upcoming'],
      getTopRatedTv,
    );
    return [nowPlaying, topRated, upcoming];
  };
  const [
    { data: nowPlayingData, isLoading: isLoadingNowPlaying },
    { data: topRatedData, isLoading: isLoadingTopRated },
    { data: upcomingData, isLoading: isLoadingUpcoming },
  ] = useMultipleQuery();

  useEffect(() => {
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
              <Title>{latestData.title}</Title>
              <Overview>{latestData.overview}</Overview>
            </Banner>
          )}
          {nowPlayingData && (
            <>
              <Slider
                data={nowPlayingData}
                sliderTitle={'Now Playing'}
                category={'tv'}
              />
            </>
          )}
          {topRatedData && (
            <>
              <Slider
                data={topRatedData}
                sliderTitle={'Top Rated'}
                category={'tv'}
              />
            </>
          )}
          {upcomingData && (
            <>
              <Slider
                data={upcomingData}
                sliderTitle={'Upcoming'}
                category={'tv'}
              />
            </>
          )}
        </>
      )}
      {params.tvId !== undefined ? <TvDetail params={params.tvId} /> : null}
    </Wrapper>
  );
}

export default Tv;
