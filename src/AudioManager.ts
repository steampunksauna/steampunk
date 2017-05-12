export class AudioManager {

  audioContainer: HTMLDivElement;
  sounds: {[id: string]: HTMLAudioElement};
  soundFiles: {[id: string]: string};
  activeLoops: HTMLAudioElement[];

  constructor() {
    this.audioContainer = document.getElementById('audio') as HTMLDivElement;
    this.sounds = {};
    this.soundFiles = {};
    this.activeLoops = [];
  }

  createAudio(id: string, file: string) {
    if (this.sounds[id])
      return false; // Audio with this id already exists
    let audio = document.createElement('audio');
    let mp3Source = document.createElement('source');
    let oggSource = document.createElement('source');
    mp3Source.src = 'sounds/' + file + '.mp3';
    oggSource.src = 'sounds/' + file + '.ogg';
    audio.appendChild(mp3Source);
    audio.appendChild(oggSource);
    audio.id = id;
    this.audioContainer.appendChild(audio);
    this.sounds[id] = audio;
    this.soundFiles[id] = file;
  }

  removeAudio(id: string) {
    let elem = document.getElementById(id)!;
    this.audioContainer.removeChild(elem);
    delete this.sounds[id];
  }

  play(id: string) {
    if (this.sounds[id])
      this.sounds[id].play();
  }

  loop(id: string) {
    if (this.sounds[id]) {
      let sound = this.sounds[id];
      sound.loop = true;
      sound.play();
      this.activeLoops.push(sound);
    }
  }

  clearLoops() {
    this.activeLoops.forEach((sound) => {
      sound.loop = false;
      sound.pause();
      this.removeAudio(sound.id);
      this.createAudio(sound.id, this.soundFiles[sound.id]);
    });
    this.activeLoops = [];
  }

}

export const audiomanager = new AudioManager();
