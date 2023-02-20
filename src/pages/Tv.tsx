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
import { Category, IGetMoviesResult, IMovie } from '../types/types';
import TvDetail from '../Routes/TvDetail';

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
  const queryKey_0 = 'tvShow';

  const { data: latestData, isLoading: isLoadingLatest } = useQuery<IMovie>(
    [queryKey_0, 'latest'],
    getlastedTv,
  );
  const useMultipleQuery = () => {
    const nowPlaying = useQuery<IGetMoviesResult>(
      [queryKey_0, 'nowPlaying'],
      getAiringTodayTv,
    );
    const topRated = useQuery<IGetMoviesResult>(
      [queryKey_0, 'topRated'],
      getPopularTv,
    );
    const upcoming = useQuery<IGetMoviesResult>(
      [queryKey_0, 'upcoming'],
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
            <>
              <Slider
                apiResultData={nowPlayingData}
                sliderTitle={'Now Playing'}
                category={Category.tv}
              />
            </>
          )}
          {topRatedData && (
            <>
              <Slider
                apiResultData={topRatedData}
                sliderTitle={'Top Rated'}
                category={Category.tv}
              />
            </>
          )}
          {upcomingData && (
            <>
              <Slider
                apiResultData={upcomingData}
                sliderTitle={'Upcoming'}
                category={Category.tv}
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
