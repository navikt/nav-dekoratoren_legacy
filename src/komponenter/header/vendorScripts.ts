export const VNGAGE_ID = '83BD7664-B38B-4EEE-8D99-200669A32551' as const

export const vendorScripts = {
	skjermdeling: `https://account.psplugin.com/${VNGAGE_ID}/ps.js`
} as const;

export type VngageUserState = {
	user: {
		state: 'Ready'; // probably more states but couldn't find documentation.
	},
	poi: unknown;
}
