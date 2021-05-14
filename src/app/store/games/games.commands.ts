export namespace GamesCommands {
    export class create {
        constructor(public name: string, public genre: string, public description: string,
            public releaseDate: string, public isFeatured: boolean) {
        }
    }
    export class edit {
        constructor(public gameId: string, public name: string, public genre: string, public description: string,
            public releaseDate: string, public isFeatured: boolean) {
        }
    }
    export class remove {
        constructor(public gameId: string) {
        }
    }
}
