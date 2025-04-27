// audio files
const BACKGROUND_MUSIC = ["audio/bg0.mp3","audio/bg1.mp3","audio/bg2.mp3",]
const CLICK_SOUND = "audio/click.mp3"
const ERROR_SOUND = "audio/error.mp3"
const MATCH_SOUND = "audio/scored.mp3"
const GAMEOVER_SOUND = "audio/gameover.mp3"

export interface IAudioManager {
    playMatchSound(): void
    playGameOverSound(): void
    playErrorSound(): void
    playClickSound(): void
    playBackgroundMusic(): void
}

function createAudioInstance() {
    const a = new Audio()
    document.body.appendChild(a)
    return a
}

export class AudioManager implements IAudioManager {
    private instances: Record<string, HTMLAudioElement>
    private bgMusicID: number
    private bgMusicPlaying: boolean

    constructor() {
        this.instances = {
            match: createAudioInstance(),
            gameover: createAudioInstance(),
            error: createAudioInstance(),
            click: createAudioInstance(),
            background: createAudioInstance(),
        }

        this.bgMusicID = 0
        this.bgMusicPlaying = false

        this.instances.background.onplaying = () => {
            this.bgMusicPlaying = true
        }

        this.instances.background.onended = () => {
            this.bgMusicID = (this.bgMusicID + 1) % BACKGROUND_MUSIC.length
            this.instances.background.src = BACKGROUND_MUSIC[this.bgMusicID]
            this.instances.background.play()
        }
    }

    playMatchSound(): void {
        this.instances.match.src = MATCH_SOUND
        this.instances.match.play()
    }

    playGameOverSound(): void {
        this.instances.gameover.src = GAMEOVER_SOUND
        this.instances.gameover.play()
    }

    playErrorSound(): void {
        this.instances.error.src = ERROR_SOUND
        this.instances.error.play()
    }
    
    playClickSound(): void {
        this.instances.click.src = CLICK_SOUND
        this.instances.click.play()
    }

    playBackgroundMusic(): void {
        if (this.bgMusicPlaying) return
        this.instances.background.src = BACKGROUND_MUSIC[this.bgMusicID]
        this.instances.background.play()
    }

}