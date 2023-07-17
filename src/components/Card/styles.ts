import styled, {css} from 'styled-components';

export const Container = styled.div<{hasNavigation: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background: #ddd;
    padding: 20px;
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