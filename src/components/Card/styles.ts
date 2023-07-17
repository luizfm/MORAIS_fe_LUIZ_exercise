
import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

type CardProps = {
  hasNavigation: boolean;
 }


export const Container = styled.div<CardProps>`
    display: flex;
    border-radius: 8px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background: #ddd;
    width: 250px;
    max-height: 200px;
    cursor: default;
    margin: 5px;

    ${props => (props.hasNavigation && css`
      cursor:pointer;
      transition: all 0.2s ease-in-out;
      
      &:hover {
        transform: scale(1.1);
      }
    `)}
`;

export const CardLink = styled(Link)`
  all: unset;
  padding: 20px;
  text-decoration: none;
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
`;