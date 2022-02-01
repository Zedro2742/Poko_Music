module.exports = async (client) => {

    require(`${process.cwd()}/modules/distubeEvents`)(client);
    require(`${process.cwd()}/modules/music-system`)(client);

}