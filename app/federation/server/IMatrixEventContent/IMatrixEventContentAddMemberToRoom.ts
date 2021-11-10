enum AddMemberToRoomMembership {
	JOIN = 'join'
}

export interface IMatrixEventContentAddMemberToRoom {
	displayname: string;
	membership: AddMemberToRoomMembership;
}
