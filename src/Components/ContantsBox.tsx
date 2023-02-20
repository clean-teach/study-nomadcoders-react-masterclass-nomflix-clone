import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { makeImagePath } from '../utils/utils';
import { Category, IMovie } from '../types/types';

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  height: 200px;
  font-size: 66px;
  background-color: white;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  .no-img {
    width: 100%;
    height: 100%;
    font-size: 0.875rem;
    text-align: center;
    color: ${(props) => props.theme.black.lighter};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

interface IProps {
  apiResultData: IMovie;
  category: Category;
  keyword?: string | null;
}

function ContantsBox({ apiResultData, category, keyword }: IProps) {
  const navigate = useNavigate();

  const onBoxClicked = (movieId: number) => {
    // if (category === Category.search) {
    //   navigate(`/search?keyword=${keyword}/${movieId}`);
    // } else {
    navigate(`/${category}/${movieId}`);
    // }
  };

  return (
    <Box
      key={apiResultData.id}
      $bgPhoto={makeImagePath(apiResultData.backdrop_path, 'w500')}
      whileHover="hover"
      initial="normal"
      variants={boxVariants}
      transition={{ type: 'tween' }}
      onClick={() => onBoxClicked(apiResultData.id)}
      layoutId={apiResultData.id + ''}
    >
      {apiResultData.backdrop_path === null ||
      apiResultData.backdrop_path === undefined ? (
        <p className="no-img">이미지가 없습니다.</p>
      ) : null}
      <Info variants={infoVariants}>
        <h4>{apiResultData.title || apiResultData.name}</h4>
      </Info>
    </Box>
  );
}

export default ContantsBox;
