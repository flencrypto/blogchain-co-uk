import type { Drug } from '../models/drug';
import type { Location } from '../models/location';
import { nextPrice } from './priceGenerator';
import seedrandom from 'seedrandom';

export class Game {
	day = 1;
	cash = 1000;
	inventory: Record<Drug['code'], number> = { CAN: 0, COC: 0, HER: 0, METH: 0, MDM: 0, FEN: 0 };

	constructor(
		private drugs: Record<string, Drug>,
		private locations: Record<string, Location>,
		private rng = seedrandom(),
	) {}

	prices(loc: string) {
		const locAdjust = this.locations[loc].adjust;
		const res: Record<string, number> = {};
		for (const [code, d] of Object.entries(this.drugs)) {
			const mu = d.mu * (locAdjust[code as keyof typeof locAdjust] ?? 1);
			res[code] = nextPrice(mu, d.sigma, this.rng);
		}
		return res;
	}
}
