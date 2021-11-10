// @ts-ignore
import { MatrixBridgedRoom, Rooms, Subscriptions } from '../../../models';
import { IMatrixEvent } from '../definitions/IMatrixEvent';
import { MatrixEventType } from '../definitions/MatrixEventType';
import { SetRoomJoinRules } from '../IMatrixEventContent/IMatrixEventContentSetRoomJoinRules';

export const setRoomJoinRules = async (
	event: IMatrixEvent<MatrixEventType.SET_ROOM_JOIN_RULES>,
): Promise<void> => {
	const { room_id: matrixRoomId, content: { join_rule: joinRule } } = event;

	// Find the bridged room id
	const roomId = await MatrixBridgedRoom.getId(matrixRoomId);

	let type;

	switch (joinRule) {
		case SetRoomJoinRules.JOIN:
		default:
			type = 'c';
	}

	Rooms.update({ _id: roomId }, {
		$inc: { usersCount: 1 },
		$set: {
			t: type,
		},
	});

	Subscriptions.update({ rid: roomId }, {
		$set: {
			t: type,
		},
	});
};
