import { AnimatePresence, useScroll } from 'framer-motion';
import { UseQueryResult } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BigCover,
  BigMovie,
  BigOverview,
  BigTitle,
  Overlay,
} from '../styles/detailBox';
import { makeImagePath } from '../utils/utils';

interface IProps {
  clickedData: UseQueryResult<any, unknown>;
}

function DetailBox({ clickedData }: IProps) {
  const currentURL = useLocation();
  const navigate = useNavigate();

  const onOverlayClick = () => {
    function getCurrentCategoryURL(url: string) {
      const currentURL = url.slice(1, url.slice(1).indexOf('/') + 1);
      if (currentURL === 'movie') {
        return '';
      }
      return currentURL;
    }
    const backURL = getCurrentCategoryURL(currentURL.pathname);
    navigate(`/${backURL}`);
  };
  const { scrollY } = useScroll();

  console.log(clickedData);

  return (
    <AnimatePresence>
      {clickedData ? (
        clickedData.isLoading ? (
          <p>로딩중 ...</p>
        ) : (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              style={{ top: scrollY.get() + 100 }}
              layoutId={clickedData.data.id}
            >
              <BigCover
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                    clickedData.data.backdrop_path,
                    'w500',
                  )})`,
                }}
              />
              <BigTitle>{clickedData.data.title}</BigTitle>
              <BigOverview>{clickedData.data.overview}</BigOverview>
            </BigMovie>
          </>
        )
      ) : null}
    </AnimatePresence>
  );
}

export default DetailBox;
