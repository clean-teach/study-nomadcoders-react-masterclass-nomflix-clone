import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { IGetMoviesResult } from '../types/types';
import { getSearchMulty } from '../apis/search';
import { makeImagePath } from '../utils/utils';

const Wrapper = styled.div`
  background-color: black;
  padding: 12rem 8rem;
`;
const Title = styled.div`
  text-align: center;
  font-size: 3.6rem;
  padding: 0 0 12rem;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListArea = styled.ul`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(4, 1fr);
`;
const Box = styled.li<{ $bgPhoto: string }>`
  height: 200px;
  font-size: 66px;
  background-color: white;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  color: ${(props) => props.theme.black.darker};
  position: relative;
  h4 {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
`;

const Warning = styled.p`
  text-align: center;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const searchData = useMutation<IGetMoviesResult>(() =>
    getSearchMulty(keyword),
  );

  useEffect(() => {
    searchData.mutate();
    // console.log(searchData);
  }, [location]);

  return searchData ? (
    <Wrapper>
      {searchData.isLoading && <Loader>로딩중 ..</Loader>}
      {searchData.isSuccess && (
        <>
          <Title>
            "{keyword}" 검색 결과 {searchData.data.results.length} 개
          </Title>
          {searchData.data.results.length > 0 ? (
            <ListArea>
              {searchData.data.results.map((result) => (
                <Box
                  key={result.id}
                  $bgPhoto={makeImagePath(result.poster_path, 'w500')}
                >
                  <h4>{result.title || result.name}</h4>
                </Box>
              ))}
            </ListArea>
          ) : (
            <Warning>검색 결과가 없습니다.</Warning>
          )}
        </>
      )}
    </Wrapper>
  ) : null;
}

export default Search;
