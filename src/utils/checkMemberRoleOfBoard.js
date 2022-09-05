import {memRoles} from "./roles";

export const isMemberOfBoard = (userId, boardMembers) => {
    const user = boardMembers.find(member => member.user === userId )
    switch (user?.role) {
        case memRoles.ADMIN :
            return true;
        case memRoles.MEMBER:
            return true
        case memRoles.VIEWER:
            return false;
        default:
            return false;
    }
}

export const isAdminOfBoard = (userId, boardMembers) => {
    const user = boardMembers.find(member => member.user === userId )
    switch (user?.role) {
        case memRoles.ADMIN :
            return true;
        default:
            return false;
    }
}

export const isAddToBoard = (userId, boardMembers) => {
    return boardMembers.find(member => member.user === userId);
}


