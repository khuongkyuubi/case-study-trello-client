import {roleInTeam} from "./roles";

export const isAdminOfTeam = (userId, workspaceMembers,) => {
    const user = workspaceMembers?.filter(member => member?.user === userId);
    if(user === undefined) return false

    switch (user[0]?.role) {
        case roleInTeam.ADMIN:
            return true;
        default:
            return false;
    }

}
export default isAdminOfTeam;