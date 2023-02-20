import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { Category, IGetMoviesResult } from '../types/types';
import { getSearchMulty } from '../apis/search';
import ContantsBox from '../Components/ContantsBox';
import MovieDetail from '../Routes/MovieDetail';
import TvDetail from '../Routes/TvDetail';

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

const Warning = styled.p`
  text-align: center;
`;

function Search() {
  const params = useParams();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const searchData = useMutation<IGetMoviesResult>(() =>
    getSearchMulty(keyword),
  );

  const clickedCategory = () => {
    return searchData.data?.results.find(
      (result) => result.id === Number(params.searchId),
    )?.media_type;
  };

  useEffect(() => {
    searchData.mutate();
    // console.log(searchData.data);
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
                <ContantsBox
                  key={result.id}
                  apiResultData={result}
                  category={Category.search}
                  keyword={keyword}
                />
              ))}
            </ListArea>
          ) : (
            <Warning>검색 결과가 없습니다.</Warning>
          )}
        </>
      )}
      {params.searchId !== undefined
        ? (clickedCategory() === Category.movie && (
            <MovieDetail params={params.searchId} />
          )) ||
          (clickedCategory() === Category.tv && (
            <TvDetail params={params.searchId} />
          ))
        : null}
    </Wrapper>
  ) : null;
}

export default Search;
