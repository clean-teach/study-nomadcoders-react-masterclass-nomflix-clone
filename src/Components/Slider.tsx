import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { Category, IGetMoviesResult } from '../types/types';
import ContantsBox from './ContantsBox';

const Wrapper = styled.div`
  position: relative;
  top: -100px;
  padding: 0 60px;
  height: 300px;
  box-sizing: border-box;
  width: 100%;
  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
`;

const BtnSlider = styled.button<{ direction: string }>`
  position: absolute;
  top: 0;
  left: ${(props) => (props.direction === 'left' ? 0 : 'none')};
  right: ${(props) => (props.direction === 'right' ? 0 : 'none')};
  width: 4rem;
  height: calc(200px + 2.2rem);
  display: block;
  background: linear-gradient(
    ${(props) => (props.direction === 'right' ? '90deg' : '-90deg')},
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  border: none;
  svg {
    fill: #ffffff;
    width: 1rem;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  & > * {
    &:first-child {
      transform-origin: center left;
    }
    &:last-child {
      transform-origin: center right;
    }
  }
`;

const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth + 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth + 5 : -window.outerWidth + 5,
  }),
};

const offset = 6;

interface IProps {
  apiResultData: IGetMoviesResult;
  sliderTitle: string;
  category: Category;
}

function Slider({ apiResultData, sliderTitle, category }: IProps) {
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const incraseIndex = () => {
    if (apiResultData) {
      if (leaving) return;
      setIsBack(false);
      toggleLeaving();
      const totalMovies = apiResultData.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decraseIndex = () => {
    if (apiResultData) {
      if (leaving) return;
      setIsBack(true);
      toggleLeaving();
      const totalMovies = apiResultData.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  return (
    <Wrapper
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h2>{sliderTitle}</h2>
      <AnimatePresence
        custom={isBack}
        onExitComplete={toggleLeaving}
        initial={false}
      >
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={isBack}
          transition={{ type: 'tween', duration: 1 }}
          key={index}
        >
          {apiResultData.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <ContantsBox
                key={movie.id}
                apiResultData={movie}
                category={category}
              />
            ))}
        </Row>
      </AnimatePresence>
      {isHover && (
        <>
          <BtnSlider onClick={incraseIndex} direction="right">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
          </BtnSlider>
          {index !== 0 ? (
            <BtnSlider onClick={decraseIndex} direction="left">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </BtnSlider>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}

export default Slider;
