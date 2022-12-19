import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getSearchMulty, IGetMoviesResult } from '../api';
import styled from 'styled-components';
import Slider from '../Components/Slider';
// import DetailBox from '../Components/DetailBox';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;
const Title = styled.div`
  text-align: center;
  font-size: 3.6rem;
  padding: 1rem 0 2rem;
  margin-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'latest'],
    () => getSearchMulty(keyword),
  );

  return (
    <Wrapper>
      <Title>{keyword}</Title>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {data && (
            <>
              <Slider
                data={data}
                sliderTitle={'Now Playing'}
                category={'search'}
              />
              {/* <DetailBox data={data} /> */}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Search;
