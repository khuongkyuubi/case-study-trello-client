import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  width: 34%;
  margin-top: 40px;
`
const WrapperMain = styled.div`
  width: 100%;
  border: 1px solid #46536b;
  height:500px;
  border-radius: 4px;
`

const ImageDiv = styled.div`
  border-radius: 5px;
  margin: 10px;

`

const Image = styled.img`
  width: 100%;
  height: 300px;
`

const ContentMain = styled.div`
  margin: 10px;
`

const Tittle = styled.p`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 8px;
`

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`


const HomeCenter = () => {
    return (
        <Container>
            <WrapperMain>
                <ImageDiv>
                    <Image
                        src="https://web4s.vn/uploads/tiny_uploads/tin-tuc/trello-la-gi/gioi-thieu-ung-dung-trello.jpg"
                        alt="anh loi"/>
                </ImageDiv>

                <ContentMain>
                    <Tittle>Stay on track and up to date</Tittle>
                    <Description>
                        Invite people to boards and cards, leave comments,
                        add due dates, and we'll show the most important
                        activity here.
                    </Description>
                </ContentMain>
            </WrapperMain>
        </Container>
    );
};

export default HomeCenter;