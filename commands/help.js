const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'List all available commands!',
    execute(interaction){
        let str = [];
        const commandsFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for(const file of commandsFiles){
            const command = require(`./${file}`);
            str.push( {name :`${command.name}`,value: `${command.description}`});
        }
        
        return void interaction.reply({
            embeds: [{
                title: 'Available commands',
                fields: str
            }],
            ephemeral: true,
        });
    }
};