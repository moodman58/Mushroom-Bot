const { SlashCommandBuilder: MushroomCommandBuilder} = require('discord.js');



const GoogleImageFetcher = require('google-image-fetcher');

// Create an instance of GoogleImageFetcher (no need to pass API Key and CX ID here)
const imageFetcher = new GoogleImageFetcher();

// Define the query and the save folder (optional)
const query = 'Mushroom Image';
const saveFolder = '';
// Call the fetchImages method to fetch and save images
const image = imageFetcher.fetchImages(query);
console.log(image);


/*
module.exports = {
	data: new MushroomCommandBuilder()
		.setName('Mushroom')
		.setDescription('Generates Random Mushroom'),
	async execute(interaction : any) {
		await interaction.reply(image);
	},
};
*/