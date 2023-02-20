import { AnimatePresence, useScroll } from 'framer-motion';
import { UseQueryResult } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { DetailPopUpBox, Overlay } from '../styles/detailBox';
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

  return clickedData ? (
    <AnimatePresence>
      {clickedData.isLoading && <p>로딩중 ...</p>}
      {clickedData.isSuccess && (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <DetailPopUpBox
            style={{ top: scrollY.get() + 100 }}
            layoutId={clickedData.data.id}
          >
            <div
              className="cover-area"
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  clickedData.data.backdrop_path,
                  'w500',
                )})`,
              }}
            ></div>
            <h3 className="title">{clickedData.data.title}</h3>
            <div className="overview">
              {clickedData.data.tagline ? (
                <dl>
                  <dd>{clickedData.data.tagline}</dd>
                </dl>
              ) : null}
              {clickedData.data.genres ? (
                <dl>
                  <dt>장르 : </dt>
                  <dd>
                    <ul>
                      {clickedData.data.genres.map((genre: any) => (
                        <li key={genre.id}>{genre.name}</li>
                      ))}
                    </ul>
                  </dd>
                </dl>
              ) : null}
              {clickedData.data.release_date ? (
                <dl>
                  <dt>개봉일 : </dt>
                  <dd>{clickedData.data.release_date}</dd>
                </dl>
              ) : null}
              {clickedData.data.overview ? (
                <dl>
                  <dd>{clickedData.data.overview}</dd>
                </dl>
              ) : null}
            </div>
          </DetailPopUpBox>
        </>
      )}
    </AnimatePresence>
  ) : null;
}

export default DetailBox;
