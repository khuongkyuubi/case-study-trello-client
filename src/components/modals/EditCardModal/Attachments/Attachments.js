import React, {useEffect, useState} from 'react';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import AttachmentIcon from '@mui/icons-material/InsertLinkRounded';
import Button from '../ReUsableComponents/Button';
import {useSelector} from 'react-redux';
import {
    Container,
    RightWrapper,
    Title,
    Row,
    FaviconWrapper,
    AttachmentRightWrapper,
    AttachmentTitleWrapper,
    AttachmentTitle,
    AttachmentTitleIconWrapper,
    AttachmentFooterWrapper,
    AttachmentDate,
    AttachmentOperations,
    ButtonDelete,
} from './styled';
import BasePopover from '../ReUsableComponents/BasePopover';
import EditAttachmentPopover from '../Popovers/Attachment/EditAttachmentPopover';
import moment from 'moment';
import AddAttachmentPopover from '../Popovers/Attachment/AddAttachmentPopover';
import DeleteAttachmentPopover from "../Popovers/Attachment/DeleteAttachment";

const Attachments = ({isMemberOrAdmin}) => {
    const REGEX = /jpeg$|svg$|png$|jpg$|gif$/
    const httpREGEX = new RegExp('http:')
    const card = useSelector((state) => state.card);
    // const dispatch = useDispatch();
    const [editPopover, setEditPopover] = useState(null);
    const [popoverComponent, setPopoverComponent] = useState(null);
    const [attachmentPopover, setAttachmentPopover] = useState(null);
    const [deletePopover, setDeletePopover] = useState(null);


    // console.log(card?.attachments[8]?.link?.split('/')[0])
    // console.log(httpREGEX.test(card?.attachments[8]?.link?.split('/')[0]))
    return (
        <>
            <Container>
                <AttachmentIcon fontSize='small'/>
                <RightWrapper>
                    <Title>Attachments</Title>
                    {card.attachments?.map((attachment) => {
                        const validateLink = () => {
                        };
                        validateLink();
                        const url = !httpREGEX.test(attachment?.link?.split('/')[0]) ? (process.env.REACT_APP_PUBLIC_API_ENDPOINT + '/' + attachment?.link) : (attachment?.link);
                        return (
                            <Row key={attachment._id} onClick={() => window.open(url, '_blank')}>
                                <FaviconWrapper
                                    url={process.env.REACT_APP_PUBLIC_API_ENDPOINT + '/' + attachment?.link}>
                                    {httpREGEX.test(attachment?.link?.split('/')[0]) ? <AttachmentIcon
                                        fontSize='large'/> : (!REGEX.test(attachment?.link?.split('.')?.pop()) ?
                                        <h3>{attachment?.link?.split('.')?.pop()}</h3> : null)}
                                </FaviconWrapper>
                                <AttachmentRightWrapper>
                                    <AttachmentTitleWrapper>

                                        <AttachmentTitle>
                                            {attachment.name ? attachment.name : attachment.link}
                                        </AttachmentTitle>
                                        <AttachmentTitleIconWrapper>
                                            <NorthEastRoundedIcon fontSize='inherit'/>
                                        </AttachmentTitleIconWrapper>
                                    </AttachmentTitleWrapper>
                                    <AttachmentFooterWrapper>

                                        <AttachmentDate>
                                            {'Added ' + moment(attachment.date).format('MMM, DD [at] HH.mm')}
                                            {isMemberOrAdmin && <div>
                                                <AttachmentOperations
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setDeletePopover(e.currentTarget)
                                                        setPopoverComponent(attachment)
                                                    }
                                                    }
                                                >
                                                    Delete
                                                </AttachmentOperations>
                                                {' - '}
                                                <AttachmentOperations
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPopoverComponent(attachment);
                                                        setEditPopover(e.currentTarget);
                                                    }}
                                                >
                                                    Edit
                                                </AttachmentOperations>
                                            </div>}
                                        </AttachmentDate>


                                    </AttachmentFooterWrapper>
                                </AttachmentRightWrapper>
                            </Row>
                        );
                    })}
                    {isMemberOrAdmin &&
                        <Button
                            style={{width: '9rem', marginTop: '0.7rem'}}
                            clickCallback={(event) => setAttachmentPopover(event.currentTarget)}
                            title='Add an Attachment'
                        />}

                </RightWrapper>
                {
                    deletePopover && (
                        <BasePopover
                            anchorElement={deletePopover}
                            closeCallback={() => {
                                setDeletePopover(null);
                            }}
                            title='Delete attachment?'
                            contents={
                                <DeleteAttachmentPopover
                                    {...popoverComponent}
                                    closeCallback={() => {
                                        setDeletePopover(null);
                                    }}
                                />
                            }
                        />
                    )
                }
                {editPopover && (
                    <BasePopover
                        anchorElement={editPopover}
                        closeCallback={() => {
                            setEditPopover(null);
                        }}
                        title='Edit'
                        contents={
                            <EditAttachmentPopover
                                {...popoverComponent}
                                closeCallback={() => {
                                    setEditPopover(null);
                                }}
                            />
                        }
                    />
                )}
                {attachmentPopover && (
                    <BasePopover
                        anchorElement={attachmentPopover}
                        closeCallback={() => {
                            setAttachmentPopover(null);
                        }}
                        title='Attach from...'
                        contents={
                            <AddAttachmentPopover
                                closeCallback={() => {
                                    setAttachmentPopover(null);
                                }}
                            />
                        }
                    />
                )}
            </Container>
        </>
    );
};

export default Attachments;
