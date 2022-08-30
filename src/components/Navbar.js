import React, {useState} from 'react';
import styled from 'styled-components';
import SearchBar from './NavbarComponents/SearchBar';
import {xs} from '../BreakPoints';
import ProfileBox from './NavbarComponents/ProfileBox';
import {useNavigate} from 'react-router-dom';
import InfoMenu from "./NavbarComponents/InfoMenu";
import NotifyMenu from "./NavbarComponents/NotifyMenu";
import AppMenu from "./NavbarComponents/AppMenu";

const Container = styled.div`
  height: 2.5rem;
  width: 100%;
  ${props => props.isTranslucent ?
          ` background-color: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(24px);` :
          ` background-color: #026AA7;`
  }
  position: fixed;

  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;

  gap: 0.5rem;
  ${xs({
    padding: '0.5rem, 0rem',
  })}
`;

const LeftSide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 0rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  ${xs({
    gap: '0.1rem',
    width: 'fit-content',
  })}
`;

const RightSide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0 0.5rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    cursor: pointer;

  }
`;

const TrelloLogo = styled.img`
  //width: 2rem;
  height: 1rem;

`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  ${xs({
    display: 'none',
  })}
`;

const Navbar = (props) => {
    const navigate = useNavigate();
    const [logo, setLogo] = useState('https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif')

    return (
        <Container isTranslucent={props.isTranslucent}>
            <LeftSide>
                <AppMenu/>
                <LogoContainer
                    onClick={() => {
                        navigate('/home');
                    }}
                    onMouseEnter={() => setLogo('https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif')}
                    onMouseLeave={() => setLogo('https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif')}
                >
                    <TrelloLogo src={logo}
                    />
                </LogoContainer>
                {/*<DropdownContainer>*/}
                {/*    <DropdownMenu title='Your Boards' />*/}
                {/*</DropdownContainer>*/}
            </LeftSide>
            <RightSide>
                <SearchBar searchString={props.searchString} setSearchString={props.setSearchString}/>
                <InfoMenu/>
                <NotifyMenu/>
                <ProfileBox/>
            </RightSide>
        </Container>
    );
};

export default Navbar;