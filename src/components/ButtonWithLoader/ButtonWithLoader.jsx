import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';

const Button = styled.button`
  margin-left: auto;
  margin-right: auto;
  padding: 8px 16px;
  min-width: 120px;
  min-height: 30px;
  cursor: pointer;
  border-radius: 4px;
  background: transparent;
  border: 2px solid gray;
  color: gray;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 500;

  &:hover,
  :focus-visible {
    background-color: gray;
    color: white;
  }
`;

const ButtonWithLoader = ({ text, loader = false }) => {
  return (
    <Button>
      {loader ? <TailSpin color="gray" height={20} width={30} /> : text}
    </Button>
  );
};

export default ButtonWithLoader;
