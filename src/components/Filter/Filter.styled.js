import styled from 'styled-components';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  padding: 4px;
  min-width: 250px;
  min-height: 35px;
  margin-top: 10px;
  border: 2px solid gray;
  border-radius: 4px;

  &::placeholder {
    text-transform: capitalize;
  }
`;
