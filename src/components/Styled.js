import styled from "styled-components";

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0 0.5rem;
  color: #fff;
  margin-left: 0.35rem;
  font-size: 0.8rem;
  ${props => props.isNotify && 'background-color: #EB5A46;'};
  border-radius: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }
`;