import styled from 'styled-components'

export const ComputerWrapper = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px !important;
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: left;
  font-size: 0.875rem;
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }

  &:active {
    background-color: #e4f0f6;
    color: #0079bf;
  }
`;