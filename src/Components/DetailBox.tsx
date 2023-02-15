import React from 'react';

function DetailBox() {
  return <div>엣헤</div>;
}

export default DetailBox;
// import { AnimatePresence, motion, useScroll } from 'framer-motion';
// import styled from 'styled-components';
// import { useHistory, useRouteMatch } from 'react-router-dom';
// import { makeImagePath } from '../utils';
// import { IGetMoviesResult } from '../api';

// function DetailBox({ data }: IProps) {
//   const history = useHistory();
//   const bigMovieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
//   const { scrollY } = useScroll();
//   const onOverlayClick = () => history.push('/');
//   const clickedMovie =
//     bigMovieMatch?.params.movieId &&
//     data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

//   return (
//     <>
//       <AnimatePresence>
//         {bigMovieMatch ? (
//           <>
//             <Overlay
//               onClick={onOverlayClick}
//               exit={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             />
//             <BigMovie
//               style={{ top: scrollY.get() + 100 }}
//               layoutId={bigMovieMatch.params.movieId}
//             >
//               {clickedMovie && (
//                 <>
//                   <BigCover
//                     style={{
//                       backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
//                         clickedMovie.backdrop_path,
//                         'w500',
//                       )})`,
//                     }}
//                   />
//                   <BigTitle>{clickedMovie.title}</BigTitle>
//                   <BigOverview>{clickedMovie.overview}</BigOverview>
//                 </>
//               )}
//             </BigMovie>
//           </>
//         ) : null}
//       </AnimatePresence>
//     </>
//   );
// }

// export default DetailBox;
