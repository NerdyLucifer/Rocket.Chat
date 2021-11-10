// @ts-ignore
import { MatrixBridgedUser, MatrixBridgedRoom, Rooms, Users } from '../../../models';
import { IMatrixEvent } from '../definitions/IMatrixEvent';
import { MatrixEventType } from '../definitions/MatrixEventType';

export const handleAddMemberToRoom = async (
	event: IMatrixEvent<MatrixEventType.ADD_MEMBER_TO_ROOM>,
): Promise<void> => {
	const { room_id: matrixRoomId, sender } = event;

	// Find the bridged user id
	const userId = await MatrixBridgedUser.getId(sender);

	// Find the user
	const user = await Users.findOneById(userId);

	// Find the bridged room id
	const roomId = await MatrixBridgedRoom.getId(matrixRoomId);

	Rooms.update({ _id: roomId }, {
		$inc: { usersCount: 1 },
		$set: {
			u: {
				_id: user._id,
				username: user.username,
			},
		},
	});
};
