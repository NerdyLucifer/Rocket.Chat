import { callbacks } from '../../../callbacks/server';
import { IUser } from '../../../../definition/IUser';
import { IRoom } from '../../../../definition/IRoom';
import { afterSaveMessage } from './afterSaveMessage';
import { afterCreateRoom } from './afterCreateRoom';
import { afterAddedToRoom } from './afterAddedToRoom';

callbacks.add(
	'afterSaveMessage',
	(message, room) => Promise.await(afterSaveMessage(message, room)),
	callbacks.priority.LOW,
	'federation-v2-after-save-message',
);

callbacks.add(
	'afterCreateRoom',
	(user: IUser, room: IRoom) => Promise.await(afterCreateRoom(user, room)),
	callbacks.priority.LOW,
	'matrix-after-create-room',
);

callbacks.add(
	'afterAddedToRoom',
	(involvedUsers: any, room: IRoom) => Promise.await(afterAddedToRoom(involvedUsers, room)),
	callbacks.priority.LOW,
	'federation-after-added-to-room',
);
