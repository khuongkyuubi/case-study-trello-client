import styled from "styled-components";
export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: "Times New Roman", Times, serif;
  justify-content: center;
  margin: 0 auto;
  position: relative;
`
export const Nav = styled.div`
  width: 100%;
  position: sticky;
  flex: 1
`;
export const Avatar = styled.img`
  height: 140px !important;
  width: 140px !important;
  object-fit: cover;
  justify-content: center;
  border-radius:50%
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f5f7 !important;
  justify-content: center;
  padding:  32px  32px  0 32px;
  font-weight: 400;
`;
export const TopHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const LeftSideHeader = styled.div`
  display: flex;
  margin: 10px;
  padding: 0;
`;
export const BotHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const RightSideHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-family: Lato,"Helvetica Neue",Arial,Helvetica,sans-serif

`;
export const TeamDetails = styled.div`
    margin: 5px;
    
`;
export const Button = styled.button`
  margin-top: 8px;
  color: rgb(23, 43, 77) ;
  background-color: #e0e1e2;
  font-weight: 300 !important;
  width: 200px !important;
  height: 40px !important;
  border: none;
  border-radius: 0.28571429rem;
  &:hover{
   background-color:  #828A8A;
    cursor: pointer;
  }
`;