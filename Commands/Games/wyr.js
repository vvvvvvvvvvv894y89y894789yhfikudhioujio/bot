
const { WouldYouRather } = require("weky") 

module.exports = {
  name: "wyr",
  description: "Change the prefix per server!",
  aliases: ["wouldyourather"],
  run: async (client, message, args) => {



await WouldYouRather({
	message: message,
	embed: {
		title: 'Would you rather... | DECΩDERS:tm:',
		color: '#5865F2',
        footer: 'DECΩDERS:tm:',
		timestamp: true
	},
	thinkMessage: 'I am thinking',
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	buttons: { optionA: 'Option A', optionB: 'Option B' }
});
  }}