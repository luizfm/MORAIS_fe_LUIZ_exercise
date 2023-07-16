import styled from 'styled-components';

export const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 8px;
  min-width: 300px;
`;

export const SearchInputLabel = styled.label``;

export const InputWrapper = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
`;

export const Input = styled.input`
  all: unset;
  padding: 8px 12px;
  display: flex;
  flex: 1;
`;

export const SubmitButton = styled.button`
  all: unset;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #ddd;
  padding: 8px;
  display: flex;
  align-items: center;
  transition: filter 0.6s ease-in;

  &:hover {
    cursor: pointer;
    filter: brightness(0.7);
  }
`;