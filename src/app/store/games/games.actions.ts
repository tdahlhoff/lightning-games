import { GamesCommands } from './games.commands';

export namespace GamesActions {
    export class load {
        public static readonly type = '[Games] Load';

        constructor() {
        }
    }

    export class create {
        public static readonly type = '[Games] Create';

        constructor(public command: GamesCommands.create) {
        }
    }

    export class edit {
        public static readonly type = '[Games] Edit';

        constructor(public command: GamesCommands.edit) {
        }
    }

    export class remove {
        public static readonly type = '[Games] Remove';

        constructor(public command: GamesCommands.remove) {
        }
    }
}

