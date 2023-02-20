import { useQuery } from 'react-query';
import { getMovieDetail } from '../apis/movies';
import DetailBox from '../Components/DetailBox';

interface IProps {
  params: string;
}

function MovieDetail({ params }: IProps) {
  const clickedMovie = useQuery(['movies', 'detail'], () =>
    getMovieDetail(params),
  );

  return <DetailBox clickedData={clickedMovie} />;
}

export default MovieDetail;
