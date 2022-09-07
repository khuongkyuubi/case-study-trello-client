import styled from 'styled-components';
export const Text=styled.div`
  color: #b07171;

  &:hover {
    color: red;
  }
  font-size:1rem;
`

export const ButtonDelete = styled.button`
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  background-color: #801515;
  color: #fff;
  font-size: 0.875rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  width: 100%;
  padding: 0.375rem 0.75rem;

  &:hover {
    background-color: #670a0a;
  }

`;