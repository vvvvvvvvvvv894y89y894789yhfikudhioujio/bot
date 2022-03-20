//The Module
module.exports = async (client, thread) => {
    try{
        if(thread.joinable && !thread.joined){
            await thread.join();
        }
    }catch (e){
        console.log(String(e).grey)
    }
}
/**
 * @INFO
 * Bot Coded by S409™#0001 | https://discord.gg/hx2wg4HfQS
 * @INFO
 * Work for Zink Development | https://s409.xyz
 * @INFO
 * Please mention him / Zink Development, when using this Code!
 * @INFO
 */
