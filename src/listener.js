class Listener {
    constructor(playlistService, mailSender) {
        this._playlistService = playlistService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { userId: getUserPlaylists, playlistId, targetEmail } = JSON.parse(message.content.toString());

            const playlist = await this._playlistService.getPlaylistById(playlistId, getUserPlaylists);
            const songs = await this._playlistService.getPlaylistSongs(playlistId);
            playlist.songs = songs;
            const response = {
                playlist
            }

            const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(response));

            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listener;
