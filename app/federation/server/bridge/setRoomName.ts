// @ts-ignore
import { MatrixBridgedRoom, Rooms, Subscriptions } from '../../../models';
import { IMatrixEvent } from '../definitions/IMatrixEvent';
import { MatrixEventType } from '../definitions/MatrixEventType';

export const setRoomName = async (
	event: IMatrixEvent<MatrixEventType.SET_ROOM_NAME>,
): Promise<void> => {
	const { room_id: matrixRoomId, content: { name } } = event;

	// Find the bridged room id
	const roomId = await MatrixBridgedRoom.getId(matrixRoomId);

	Rooms.update({ _id: roomId }, {
		$set: {
			name,
			fname: name,
		},
	});

	Subscriptions.update({ rid: roomId }, {
		$set: {
			name,
			fname: name,
		},
	});
};
