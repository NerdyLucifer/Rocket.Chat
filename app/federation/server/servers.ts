enum SERVER {
	A = 'A',
	B = 'B',
}

const servers = {
	[SERVER.A]: {
		homeserverUrl: 'https://a.rc.allskar.com',
		domain: 'a.rc.allskar.com',
		registrationFile: Assets.absoluteFilePath(
			'matrix/rocketchat-registration-a.yaml',
		),
		port: 9000,
	},
	[SERVER.B]: {
		homeserverUrl: 'https://b.rc.allskar.com',
		domain: 'b.rc.allskar.com',
		registrationFile: Assets.absoluteFilePath(
			'matrix/rocketchat-registration-b.yaml',
		),
		port: 9001,
	},
};

const SELECTED_SERVER: SERVER = (process.env.APP_SERVER as unknown as SERVER) || SERVER.A;

export const currentServer = servers[SELECTED_SERVER];
