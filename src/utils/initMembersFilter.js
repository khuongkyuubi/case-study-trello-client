const initMembersFilter = (members) => {
    const state = {noMembers: false}
    members.map((member) => state[member.user] = false);
    return state;
}

export default initMembersFilter;