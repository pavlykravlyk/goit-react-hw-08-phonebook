import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding-top: 30px;
  padding-bottom: 30px;
`;

const Section = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

Section.propTypes = { children: PropTypes.node };

export default Section;
