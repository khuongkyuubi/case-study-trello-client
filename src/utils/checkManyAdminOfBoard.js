

const checkHowManyAdminOfBoard=(listMember)=>{
    let count=0;
    listMember.map(member=>{
        if(member.role==='Admin'){
            count++;
        }
    })
    return count > 1;
}

export default checkHowManyAdminOfBoard;