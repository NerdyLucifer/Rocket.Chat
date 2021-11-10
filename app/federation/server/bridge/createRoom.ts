// @ts-ignore
import { MatrixBridgedRoom, MatrixBridgedUser, Rooms, Subscriptions, Users } from '../../../models';
import { IMatrixEvent } from '../definitions/IMatrixEvent';
import { MatrixEventType } from '../definitions/MatrixEventType';

export const handleCreateRoom = async (
	event: IMatrixEvent<MatrixEventType.CREATE_ROOM>,
): Promise<void> => {
	const { room_id: matrixRoomId, sender } = event;

	// Find the bridged user id
	const userId = await MatrixBridgedUser.getId(sender);

	// Find the user
	const user = await Users.findOneById(userId);

	const roomId = Rooms.insert({
		description: '',
		broadcast: false,
		encrypted: false,
		usersCount: 1,
		u: {
			_id: user._id,
			username: user.username,
		},
		ts: new Date(),
		_updatedAt: new Date(),
	});

	MatrixBridgedRoom.insert({ rid: roomId, mri: matrixRoomId });

	Subscriptions.insert({
		open: true,
		alert: false,
		ts: new Date(),
		rid: roomId,
		u: {
			_id: user._id,
			name: user.name,
			username: user.username,
		},
		_updatedAt: new Date(),
	});
};
