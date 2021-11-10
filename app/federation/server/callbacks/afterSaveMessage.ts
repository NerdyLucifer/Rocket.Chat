// @ts-ignore
import { MatrixBridgedRoom, MatrixBridgedUser } from '../../../models';
import { bridge } from '../bridge';

export async function afterSaveMessage(message, room) {
	// Retrieve the matrix user
	const matrixId = MatrixBridgedUser.getMatrixId(message.u._id);

	// Retrieve the matrix room
	const roomMatrixId = MatrixBridgedRoom.getMatrixId(room._id);

	const intent = bridge.getIntent(matrixId);
	await intent.sendText(roomMatrixId, message.msg || '...not-supported...');

	return message;
}
