export namespace GamesCommands {
    export class Create {
        constructor(public name: string, public genre: string, public description: string,
            public releaseDate: string) {
        }
    }
    export class Edit {
        constructor(public gameId: string, public name: string, public genre: string, public description: string,
            public releaseDate: string) {
        }
    }
    export class Remove {
        constructor(public gameId: string) {
        }
    }
}
