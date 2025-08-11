import inquirer from 'inquirer';
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

async function main() {
	const { drugs, locations } = await loadData();
	const game = new Game(drugs, locations);
	let city = 'Denver';
	while (game.day <= 30) {
		const prices = game.prices(city);
		console.log(`Day ${game.day} - ${city}`);
		for (const [c, p] of Object.entries(prices)) console.log(`  ${c}: $${p.toFixed(2)}`);
		const { action } = await inquirer.prompt({ name: 'action', message: 'Action (travel/skip/quit)?', type: 'input' });
		if (action === 'quit') break;
		if (action === 'travel') {
			const { to } = await inquirer.prompt({
				name: 'to',
				message: 'Destination',
				type: 'list',
				choices: Object.keys(locations),
			});
			city = to;
		}
		game.day++;
	}
	console.log('Game over');
}

main();
