import {teamRoles} from "./roles";

const checkTeamVisibility = (userId, workspaceMembers, workspaceRole) => {
    const user = !! workspaceMembers?.filter(member => member.user.toString() === userId.toString()).length;
    console.log(user);
    switch (workspaceRole) {
        case teamRoles.PRIVATE :
            return user;
        case teamRoles.PUBLIC:
            return true;
        default:
            return false;
    }
}
export default checkTeamVisibility;

// const checkBoardVisibility = (userId, boardRole, boardMembers, teamMembers) => {
//     const isMemberOfBoard = !!boardMembers?.filter(memberBoard=>memberBoard.user.toString()===userId.toString()).length;
// const isMemberOfTeam = !!teamMembers?.filter(memberTeam=> memberTeam.user.toString() === userId.toString()).length;
// switch (boardRole) {
//     case boardRoles.PRIVATE :
//         return isMemberOfBoard;
//     case boardRoles.WORK_SPACE:
//         return isMemberOfTeam || isMemberOfBoard
//     case boardRoles.PUBLIC:
//         return true;
//     default:
//         return false;
// }
// }
// export default checkBoardVisibility;