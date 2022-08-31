import {teamRoles} from "./roles";

export const checkTeamVisibility = (userId, workspaceMembers, workspaceRole) => {
    const user = workspaceMembers.find(member => member.user === userId);
    switch (workspaceRole) {
        case teamRoles.PRIVATE:
            return Boolean(user);
        case teamRoles.PUBLIC:
            return true;
        default:
            return false;
    }

}
export default checkTeamVisibility;