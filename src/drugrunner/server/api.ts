import express from 'express';
import fs from 'fs/promises';
import { Game } from '../engine/game';
import type { Drug } from '../models/drug';
import type { Location } from '../models/location';

async function loadData() {
	const drugs = JSON.parse(await fs.readFile(__dirname + '/../data/drugs.json', 'utf-8')) as Record<string, Drug>;
	const locations = JSON.parse(await fs.readFile(__dirname + '/../data/locations.json', 'utf-8')) as Record<
		string,
		Location
	>;
	return { drugs, locations };
}

export async function startServer(port = 3000) {
	const { drugs, locations } = await loadData();
	const game = new Game(drugs, locations);

	const app = express();
	app.use(express.json());

	app.get('/v1/prices', (req, res) => {
		const loc = (req.query.loc as string) || 'Denver';
		res.json(game.prices(loc));
	});

	app.listen(port, () => console.log(`API up on :${port}`));
}

if (require.main === module) startServer();
