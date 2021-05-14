import { GamesCommands } from './games.commands';

export namespace GamesActions {
    export class Load {
        public static readonly type = '[Games] Load';

        constructor() {
        }
    }

    export class Create {
        public static readonly type = '[Games] Create';

        constructor(public command: GamesCommands.Create) {
        }
    }

    export class Edit {
        public static readonly type = '[Games] Edit';

        constructor(public command: GamesCommands.Edit) {
        }
    }

    export class Delete {
        public static readonly type = '[Games] Delete';

        constructor(public command: GamesCommands.Remove) {
        }
    }
}

