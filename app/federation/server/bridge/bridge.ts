// @ts-ignore
import yaml from 'js-yaml';
import { AppServiceRegistration, Bridge } from 'matrix-appservice-bridge';

import { currentServer } from '../servers';
import { IMatrixEvent } from '../definitions/IMatrixEvent';
import { MatrixEventType } from '../definitions/MatrixEventType';
import { handleSendMessage } from './sendMessage';
import { handleCreateRoom } from './createRoom';
import { handleAddMemberToRoom } from './addMemberToRoom';
import { setRoomJoinRules } from './setRoomJoinRules';
import { setRoomName } from './setRoomName';
import { setRoomTopic } from './setRoomTopic';

const registration: AppServiceRegistration = yaml.load(
	currentServer.registrationFile,
);

export const bridge = new Bridge({
	homeserverUrl: currentServer.homeserverUrl,
	domain: 'localhost',
	registration,
	suppressEcho: false,
	disableStores: true,

	controller: {
		// onUserQuery(queriedUser) {
		// 	return {}; // auto-provision users with no additional data
		// },

		async onEvent(request/* , context*/): Promise<void> {
			// Get the event
			const event = request.getData() as unknown as IMatrixEvent<MatrixEventType>;

			switch (event.type) {
				case MatrixEventType.CREATE_ROOM: {
					await handleCreateRoom(event as IMatrixEvent<MatrixEventType.CREATE_ROOM>);

					break;
				}
				case MatrixEventType.ADD_MEMBER_TO_ROOM: {
					await handleAddMemberToRoom(event as IMatrixEvent<MatrixEventType.ADD_MEMBER_TO_ROOM>);

					break;
				}
				case MatrixEventType.SET_ROOM_JOIN_RULES: {
					await setRoomJoinRules(event as IMatrixEvent<MatrixEventType.SET_ROOM_JOIN_RULES>);

					break;
				}
				case MatrixEventType.SET_ROOM_NAME: {
					await setRoomName(event as IMatrixEvent<MatrixEventType.SET_ROOM_NAME>);

					break;
				}
				case MatrixEventType.SET_ROOM_TOPIC: {
					await setRoomTopic(event as IMatrixEvent<MatrixEventType.SET_ROOM_TOPIC>);

					break;
				}
				case MatrixEventType.SEND_MESSAGE: {
					await handleSendMessage(event as IMatrixEvent<MatrixEventType.SEND_MESSAGE>);

					break;
				}
				case MatrixEventType.SET_ROOM_POWER_LEVELS:
				case MatrixEventType.SET_ROOM_CANONICAL_ALIAS:
				case MatrixEventType.SET_ROOM_HISTORY_VISIBILITY: {
					console.log(`Ignoring ${ event.type }`);

					break;
				}
				default:
					console.log(`Could not find handler for ${ event.type }`, event);
			}
		},
	},
});
