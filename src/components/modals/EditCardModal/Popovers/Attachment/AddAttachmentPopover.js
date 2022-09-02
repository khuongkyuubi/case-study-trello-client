import React, {useEffect, useState} from 'react';
import { SearchArea, Title } from '../Labels/styled';
import Button from '../../ReUsableComponents/Button';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {attachmentAdd, attachmentAddFile} from '../../../../../services/cardService';
import {IconButton} from "@mui/material";
import {ComputerWrapper} from "./Styled";

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

const AddAttachmentPopover = (props) => {
	const dispatch = useDispatch();
	const card = useSelector((state) => state.card);
	const [link, setLink] = useState('');
	const [linkName, setLinkName] = useState('');
	const [file,setFile] = useState();
	const data = new FormData;
	// console.log(card.attachments)
	useEffect(() => {
		const fetchData = async () => {
			if(file){
				const filename = "" + Date.now() + file?.["name"];
				data.append("name", filename);
				data.append("file", file);
				data.append("data", card.cardId)
				await attachmentAddFile(card.cardId,card.listId,data,dispatch);
			}
		}
		fetchData()
	},[file])

	const handleChangeFile =(e) =>{
		setFile(e.target.files[0]);
	}
	const handleAttachClick = async () => {
		setLink('');
		setLinkName('');
		await attachmentAdd(
			card.cardId,
			card.listId,
			card.boardId,
			new RegExp(/^https?:\/\//).test(link) ? link : 'http://' + link,
			linkName,
			dispatch
		);
	};
	return (
		<Container>
			<ComputerWrapper>
				<IconButton color="primary" aria-label="upload picture" component="label">
					<input hidden type="file" onChange={handleChangeFile}/>
					<Title>Computer</Title>
				</IconButton>
			</ComputerWrapper>
			<hr/>
			<Title>Attach a link</Title>
			<SearchArea placeholder='Paste any link here...' value={link} onChange={(e) => setLink(e.target.value)} />
			{link && (
				<>
					<Title style={{ marginTop: '0.7rem' }}>Link name (optional)</Title>
					<SearchArea value={linkName} onChange={(e) => setLinkName(e.target.value)} />
				</>
			)}
			<Button style={{ marginTop: '1rem' }} title='Attach' clickCallback={handleAttachClick} />
		</Container>
	);
};

export default AddAttachmentPopover;
