export class AudioManager {

  audioContainer: HTMLDivElement;
  sounds: {[id: string]: HTMLAudioElement};
  activeLoops: HTMLAudioElement[];

  constructor() {
    this.audioContainer = document.getElementById('audio') as HTMLDivElement;
    this.sounds = {};
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
    this.audioContainer.appendChild(audio);
    this.sounds[id] = audio;
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
    });
    this.activeLoops = [];
  }

}

export const audiomanager = new AudioManager();
