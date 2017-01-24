'use strict'

class MusicManager {
    constructor() {
        this.musics = [];
    }

    addMusic(music) {
        this.musics[music.id] = music;
    }
    removeMusic(music) {
        delete this.musics[music.id];
    }

}
