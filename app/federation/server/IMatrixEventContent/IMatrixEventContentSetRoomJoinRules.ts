export enum SetRoomJoinRules {
	JOIN = 'public'
}
export interface IMatrixEventContentSetRoomJoinRules {
	join_rule: SetRoomJoinRules;
}
