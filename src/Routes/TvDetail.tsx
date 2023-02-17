import { useQuery } from 'react-query';
import { getTvDetail } from '../apis/tvShows';
import DetailBox from '../Components/DetailBox';

interface IProps {
  params: string;
}

function TvDetail({ params }: IProps) {
  const clickedTv = useQuery(['tvShow', 'detail'], () => getTvDetail(params));

  return <DetailBox clickedData={clickedTv} />;
}

export default TvDetail;
