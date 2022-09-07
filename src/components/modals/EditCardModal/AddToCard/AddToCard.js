import React from 'react';
import { Container, Title } from './styled';
import Button from '../ReUsableComponents/IconButton';
import MemberIcon from '@mui/icons-material/PersonOutlineOutlined';
import LabelIcon from '@mui/icons-material/LabelOutlined';
import AttachmentIcon from '@mui/icons-material/AttachFileOutlined';
import BasePopover from '../ReUsableComponents/BasePopover';
import MembersPopover from '../Popovers/Members/MembersPopover';
import LabelsPopover from '../Popovers/Labels/LabelsPopover';
import AddAttachmentPopover from '../Popovers/Attachment/AddAttachmentPopover';
import {isMemberOfBoard} from "../../../../utils/checkMemberRoleOfBoard";
import {useSelector} from "react-redux";

const AddToCard = () => {
	const [memberPopover, setMemberPopover] = React.useState(null);
	const [labelPopover, setLabelPopover] = React.useState(null);
	const [attachmentPopover, setAttachmentPopover] = React.useState(null);
	const [labelsBackArrow, setLabelsBackArrow] = React.useState(false);
	const [labelsTitle, setLabelsTitle] = React.useState('Labels');
	const {userInfo} = useSelector(state => state.user)
	const {members} = useSelector(state => state.board)
	const isMember = isMemberOfBoard(userInfo._id, members)
	return isMember && (
		<Container>
			<Title>Add to card</Title>
			<Button
				clickCallback={(event) => setMemberPopover(event.currentTarget)}
				title='Members'
				icon={<MemberIcon fontSize='small'/>}
			/>
			{memberPopover && (
				<BasePopover
					anchorElement={memberPopover}
					closeCallback={() => {
						setMemberPopover(null);
					}}
					title='Members'
					PaperProps={{
						style: { width: '300px' },
					}}
					contents={<MembersPopover/>}
				/>
			)}

			<Button
				clickCallback={(event) => setLabelPopover(event.currentTarget)}
				title='Labels'
				icon={<LabelIcon fontSize='small'/>}
			></Button>
			{labelPopover && (
				<BasePopover
					anchorElement={labelPopover}
					closeCallback={() => {
						setLabelPopover(null);
						setLabelsTitle('Labels');
						setLabelsBackArrow(false);
					}}
					title={labelsTitle}
					backClick={() => {
						setLabelsTitle('Labels');
						setLabelsBackArrow(false);
					}}
					backArrow={labelsBackArrow}
					contents={
						<LabelsPopover
							currentPage={labelsTitle}
							titleCallback={(event) => setLabelsTitle(event)}
							arrowCallback={(event) => {
								setLabelsBackArrow(event);
							}}
						/>
					}
				/>
			)}

			<Button
				clickCallback={(event) => setAttachmentPopover(event.currentTarget)}
				title='Attachment'
				icon={<AttachmentIcon fontSize='small'/>}
			/>
			{attachmentPopover && (
				<BasePopover
					anchorElement={attachmentPopover}
					closeCallback={() => {
						setAttachmentPopover(null);
					}}
					title='Attach from...'
					contents={<AddAttachmentPopover closeCallback={() => {
						setAttachmentPopover(null);
					}}/>}
				/>
			)}

		</Container>
	)
};

export default AddToCard;
