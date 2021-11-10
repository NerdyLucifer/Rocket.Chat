// @ts-ignore
import { MatrixBridgedRoom, MatrixBridgedUser } from '../../../models';
import { IUser } from '../../../../definition/IUser';
import { IRoom } from '../../../../definition/IRoom';
import { bridge } from '../bridge';

export async function afterCreateRoom(user: IUser, room: IRoom): Promise<void> {
	const intent = bridge.getIntent();

	const roomName = `@rocketchat_${ room.name }`;

	// Create the matrix room
	const matrixRoom = await intent.createRoom({
		createAsClient: true,
		options: {
			name: roomName,
			topic: room.topic,
			visibility: 'public',
			preset: 'public_chat',
		},
	});

	// Retrieve the matrix user
	const matrixId = MatrixBridgedUser.getMatrixId(user._id);

	// Add to the map
	MatrixBridgedRoom.insert({ rid: room._id, mri: matrixRoom.room_id });

	// Set room visibility
	const roomDirectoryVisibility = await intent
		.getClient()
		.getRoomDirectoryVisibility(matrixRoom.room_id);

	if (roomDirectoryVisibility !== 'public') {
		await intent
			.getClient()
			.setRoomDirectoryVisibility(matrixRoom.room_id, 'public');
	}

	// Add our user
	await intent.invite(matrixRoom.room_id, matrixId);
}
