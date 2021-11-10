import { MatrixEventType } from './MatrixEventType';
import { EventContent } from '../IMatrixEventContent';

export interface IMatrixEvent<T extends MatrixEventType> {
	age: number;
	content: EventContent[T];
	event_id: string;
	origin_server_ts: number;
	room_id: string;
	sender: string;
	state_key: string;
	type: T;
	unsigned: { age: number };
	user_id: string;
}
