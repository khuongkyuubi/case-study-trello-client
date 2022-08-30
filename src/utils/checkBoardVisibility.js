import {boardRoles} from "./roles";

console.log(boardRoles.PRIVATE)
const checkBoardVisibility = (userId, boardRole, boardMembers, workspaceMembers) => {
    const isMemberOfBoard = boardMembers.includes(userId);
    const isMemberOfWorkspace = workspaceMembers.includes(userId);
    switch (boardRole) {
        case boardRoles.PRIVATE :
            return isMemberOfBoard;
        case boardRoles.WORK_SPACE:
            return isMemberOfWorkspace || isMemberOfBoard;
        case boardRoles.PUBLIC:
            return true;
        default:
            return false;
    }
}
export default checkBoardVisibility;