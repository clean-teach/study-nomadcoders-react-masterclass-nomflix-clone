import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const DetailPopUpBox = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow-y: scroll;
  background-color: ${(props) => props.theme.black.lighter};
  &::-webkit-scrollbar {
    width: 4px;
  }
  .cover-area {
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 400px;
  }
  .title {
    color: ${(props) => props.theme.white.lighter};
    padding: 20px;
    font-size: 46px;
    position: relative;
    top: -80px;
  }
  .overview {
    padding: 20px;
    position: relative;
    top: -80px;
    color: ${(props) => props.theme.white.lighter};
  }
  dl + dl {
    margin-top: 1rem;
  }
  dt {
    display: inline-block;
  }
  dd {
    display: inline-block;
    font-size: 0.875rem;
    line-height: 1.25rem;
    ul li {
      display: inline-block;
      &:after {
        content: ', ';
      }
    }
  }
`;
