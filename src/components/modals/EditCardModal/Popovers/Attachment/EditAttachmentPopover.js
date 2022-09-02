import React, {useState, useEffect} from 'react';
import {SearchArea, Title, BlueButton, RedButton} from '../Labels/styled';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {attachmentUpdate} from '../../../../../services/cardService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: fit-content;
  width: 100%;
  padding-bottom: 0.5rem;
  gap: 0.2rem;
`;

const EditAttachmentPopover = (props) => {
    const httpREGEX = new RegExp('http:')
    const dispatch = useDispatch();
    const card = useSelector((state) => state.card);
    const [link, setLink] = useState({
        link: props.link,
        check: true
    });
    const [linkName, setLinkName] = useState( props.name );
    const handleAttachClick = async () => {
        props.closeCallback();
        await attachmentUpdate(card.cardId, card.listId, card.boardId, props._id, new RegExp(/^https?:\/\//).test(link.link) ? link.link : 'http://' + link.link, linkName,link.check, dispatch);
    };
	const handleCancel = () => {
		props.closeCallback();
	}
    useEffect(() => {
        setLink(prevState => ({
            ...prevState,
            check: httpREGEX.test(link.link.split('/')[0])
        }))
    }, [])
    // console.log(link)
    // check= httpREGEX.test(link.split('/')[0])
    return (
        <Container>
            {link.check && (<>
                <Title>Link</Title>
                <SearchArea placeholder='Paste any link here...' value={link.link}
                            onChange={(e) =>
                                setLink(prevState => ({
                                    ...prevState, link: e.target.value
                                }))
                }/>
            </>)}
            {link.link && (
                <>
                    <Title style={{marginTop: '0.7rem'}}>Link name (optional)</Title>
                    <SearchArea value={linkName} onChange={(e) => setLinkName(e.target.value)}/>
                </>
            )}
            {!link.link && (<p style={{color: 'red'}}>Please fill out the link</p>)}
			{link.link?<BlueButton style={{marginTop: '1rem'}} onClick={handleAttachClick}>
				Update
			</BlueButton>:<RedButton onClick={handleCancel}>Cancel</RedButton>}
        </Container>
    );
};

export default EditAttachmentPopover;
