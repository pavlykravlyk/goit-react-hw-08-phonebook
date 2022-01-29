import styled from 'styled-components';

export const List = styled.ul`
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  width: 350px;
  list-style: none;
`;

export const Item = styled.li`
  min-height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 2px solid gray;
  border-radius: 4px;
  padding: 5px;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

export const Name = styled.p`
  margin-top: 0;
  margin-bottom: 0;
`;

export const Number = styled.p`
  margin-top: 0;
  margin-bottom: 0;
`;

export const DeleteContactButton = styled.button`
  padding: 5px;
  min-width: 80px;
  min-height: 30px;
  cursor: pointer;
  border-radius: 4px;
  border: none;

  &:hover,
  &:focus-visible {
    background-color: gray;
    color: white;
  }
`;

export const EditContactButton = styled.button`
  padding: 5px;
  min-width: 80px;
  min-height: 30px;
  cursor: pointer;
  border-radius: 4px;
  border: none;

  &:hover,
  &:focus-visible {
    background-color: gray;
    color: white;
  }
`;
