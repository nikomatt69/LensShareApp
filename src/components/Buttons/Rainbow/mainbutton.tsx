import { Web3Button } from '@web3modal/react';
import { ConnectKitButton } from 'connectkit';

import styled from 'styled-components';
const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 8px 16px;
  color: #ffffff;
  background: #000;
  font-size: 13px;
  font-weight: 400;
  border-radius: 10rem;
  box-shadow: 0 4px 20px -6px #1a88f8;

  transition: 200ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 40px -6px #1a88f8;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 26px -6px #1a88f8;
  }
`;

export const MainButton = () => {
  return <Web3Button />;
};

export default MainButton;
