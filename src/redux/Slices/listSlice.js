import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allLists: [],
    loadingListService: true
}


const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loadingListService = action.payload;
        },
        successCreatingList: (state, action) => {
            state.allLists.push(action.payload);
        },
        successFetchingLists: (state, action) => {
            state.allLists = action.payload;
        },
        successDeletingList: (state, action) => {
            state.allLists = state.allLists.filter(list => list._id !== action.payload);
        },
        updateListDragDrop: (state, action) => {
            state.allLists = action.payload;
        },
        updateCardDragDrop: (state, action) => {
            state.allLists = action.payload;
        },
        updateListTitle: (state, action) => {
            const {listId, title} = action.payload;
            state.allLists = state.allLists.map(list => {
                if (list._id === listId) {
                    list.title = title
                }
                return list;
            });
        },
        successCreatingCard: (state, action) => {
            state.allLists = state.allLists.map((list) => {
                if (list._id === action.payload.listId) {
                    return action.payload.updatedList;
                }
                return list;
            });
        },
        setCardTitle: (state, action) => {
            const {listId, cardId, title} = action.payload;
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) card.title = title;
                        return card;
                    });
                }
                return list;
            });
        },
        updateLabelOfCard: (state, action) => {
            const { listId, cardId, labelId, text, color, backColor } = action.payload;
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) {
                            card.labels = card.labels.map((label) => {
                                if (label._id === labelId) {
                                    label.text = text;
                                    label.color = color;
                                    label.backColor = backColor;
                                }
                                return label;
                            });
                        }
                        return card;
                    });
                }
                return list;
            });
        },
        updateLabelSelectionOfCard: (state, action) => {
            const { listId, cardId, labelId, selected } = action.payload;
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) {
                            card.labels = card.labels.map((label) => {
                                if (label._id === labelId) {
                                    label.selected = selected;
                                }
                                return label;
                            });
                        }
                        return card;
                    });
                }
                return list;
            });
        },
        createLabelForCard: (state, action) => {
            const { listId, cardId, _id, text, color, backColor } = action.payload;
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) {
                            card.labels.unshift({ _id, text, color, backColor, selected: true });
                        }
                        return card;
                    });
                }
                return list;
            });
        },
        createCommentsForCard: (state, action) => {
            const {listId, cardId, data} = action.payload;
            console.log(action.payload)
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) {
                            card.activities = data;
                        }
                        return card;
                    });
                }
                return list;
            });
        },
        deleteCommentsForCard: (state, action) => {
            const {listId, cardId, commentId} = action.payload;
            console.log(action.payload)
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) {
                            card.activities = card.activities.filter(activity => {
                                return activity._id !== commentId
                            });
                        }
                        return card;
                    });
                }
                return list;
            });
        },

        deleteLabelOfCard: (state, action) => {
            const { listId, cardId, labelId } = action.payload;
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) {
                            card.labels = card.labels.filter((label) => label._id !== labelId);
                        }
                        return card;
                    });
                }
                return list;
            });
        },
        updateMemberOfCard: (state, action) => {
            const {listId, cardId, memberId, memberName, memberColor} = action.payload;
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) card.members.unshift({
                            user: memberId,
                            name: memberName,
                            color: memberColor
                        });
                        return card;
                    });
                }
                return list;
            });
        },
        deleteMemberOfCard: (state, action) => {
            const {listId, cardId, memberId} = action.payload;
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId)
                            card.members = card.members.filter((member) => member.user !== memberId);
                        return card;
                    });
                }
                return list;
            });
        },
        addAttachmentForCard: (state, action) => {
            // const {listId, cardId, link, name, _id, date} = action.payload;
            const {listId, cardId, attachments} = action.payload;
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) {
                            // card.attachments.push({link: link, name: name, _id: _id, date: date});
                            card.attachments = attachments;
                        }
                        return card;
                    });
                }
                return list;
            });
        },
        deleteAttachmentOfCard: (state, action) => {
            // const {listId, cardId, attachmentId} = action.payload;
            const {listId, cardId, attachments} = action.payload;
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) {
                            // card.attachments = card.attachments.filter((attachment) => attachment._id !== attachmentId);
                            card.attachments = attachments;
                        }
                        return card;
                    });
                }
                return list;
            });
        },

    }
});

export const {
    setLoading,
    successCreatingList,
    successFetchingLists,
    successDeletingList,
    updateListDragDrop,
    updateListTitle,
    updateCardDragDrop,
    successCreatingCard,
    setCardTitle,
    updateLabelOfCard,
    updateLabelSelectionOfCard,
    createLabelForCard,
    createCommentsForCard,
    deleteCommentsForCard,
    deleteLabelOfCard,
    updateMemberOfCard,
    deleteMemberOfCard,
    addAttachmentForCard,
    deleteAttachmentOfCard,

} = listSlice.actions;

export default listSlice.reducer;