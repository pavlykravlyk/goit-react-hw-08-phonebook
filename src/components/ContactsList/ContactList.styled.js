import styled from 'styled-components';

export const ContactList = styled.ul`
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  width: 250px;
  list-style: none;
`;

export const ContactItem = styled.li`
  min-height: 95px;
  display: flex;
  align-items: center;

  justify-content: space-around;
  width: 100%;
  border: 2px solid gray;
  border-radius: 4px;
  padding: 5px;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

export const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContactName = styled.p`
  margin-top: 0;
  margin-bottom: 0;
`;

export const ContactNumber = styled.p`
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

export const ContactMessage = styled.p``;

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

export const EditContactForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  border: 2px solid gray;
  border-radius: 4px;
  padding: 20px;
  width: fit-content;
`;

export const EditContactFormList = styled.ul`
  padding-left: 0;
  margin-bottom: 0;
  margin-top: 0;
  list-style: none;
`;

export const EditContactFormItem = styled.li`
  margin-bottom: 15px;
`;

export const EditContactFormLabel = styled.label`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  text-transform: capitalize;
  font-size: 18px;
`;

export const EditContactFormInput = styled.input`
  min-width: 300px;
  min-height: 30px;
  margin-top: 5px;
  border: 2px solid gray;
  border-radius: 4px;
  padding-left: 5px;

  &::placeholder {
    font-size: 16px;
    color: lightgray;
  }
`;

export const UpdateContactButton = styled.button`
  margin-left: auto;
  margin-right: auto;
  padding: 8px 16px;
  min-width: 120px;
  min-height: 30px;
  border-radius: 4px;
  background: transparent;
  border: 2px solid gray;
  color: gray;

  text-transform: capitalize;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover,
  :focus-visible {
    background-color: gray;
    color: white;
  }
`;
