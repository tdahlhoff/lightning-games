import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { GamesActions } from './games.actions';
import { Injectable } from '@angular/core';
import { Game } from '../../model/game';
import { produce } from 'immer';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';

export interface GamesStateModel {
    games: {
        [gameId: string]: Game
    };
}

@State<GamesStateModel>({
    name: 'games',
    defaults: {
        games: {}
    }
})
@Injectable()
export class GamesState {

    @Selector()
    public static getGames(state: GamesStateModel) {
        return Object.values(state.games);
    }

    @Selector()
    public static getFeaturedGames(state: GamesStateModel) {
        return Object.values(state.games).filter(game => game.isFeatured);
    }

    public static getGame(gameId: string) {
        return createSelector([GamesState], (state: GamesStateModel) => {
            return state.games[gameId];
        });
    }

    @Action(GamesActions.load)
    public load(ctx: StateContext<GamesStateModel>) {
        ctx.setState(produce((draft) => {
            if (!draft.games['cfc57eb0-0659-4d8b-b76d-8f13c2e52457']) {
                draft.games['cfc57eb0-0659-4d8b-b76d-8f13c2e52457'] = {
                    gameId: 'cfc57eb0-0659-4d8b-b76d-8f13c2e52457',
                    name: 'Tetris',
                    genre: 'Geschicklichkeit',
                    creationDate: moment().format(),
                    releaseDate: '1984-06-06',
                    description: 'Tetris ist ein puzzleartiges Computerspiel des russischen Programmierers Alexei ' +
                        'Paschitnow, der die erste spielbare Version am 6. Juni 1984 auf einem ' +
                        ' Elektronika-60-Rechner fertigstellte.',
                    isFeatured: false
                }
            }
            if (!draft.games['f5358325-7c2e-460e-b020-8e688368537e']) {
                draft.games['f5358325-7c2e-460e-b020-8e688368537e'] = {
                    gameId: 'f5358325-7c2e-460e-b020-8e688368537e',
                    name: 'Pac-Man',
                    genre: 'Arcade',
                    creationDate: moment().format(),
                    releaseDate: '1980-05-22',
                    description: 'Pac-Man ist ein Arcade- und Videospiel, welches erstmals am 22. Mai 1980 von Namco ' +
                        'in Japan als „Puck Man“ für Arcade-Automaten veröffentlicht wurde. Es erschienen zahlreiche ' +
                        ' Klone, Varianten und Weiterentwicklungen des Spiels für so gut wie alle Betriebssysteme.',
                    isFeatured: true
                }
            }
        }));
    }

    @Action(GamesActions.create)
    public create(ctx: StateContext<GamesStateModel>, {command}: GamesActions.create) {
        ctx.setState(produce((draft) => {
            const gameId = uuid();
            draft.games[gameId] = {
                gameId: gameId,
                name: command.name,
                genre: command.genre,
                creationDate: moment().format(),
                releaseDate: command.releaseDate,
                description: command.description,
                isFeatured: command.isFeatured
            }
        }));
    }

    @Action(GamesActions.edit)
    public edit(ctx: StateContext<GamesStateModel>, {command}: GamesActions.edit) {
        ctx.setState(produce((draft) => {
            draft.games[command.gameId] = {
                ...draft.games[command.gameId],
                name: command.name,
                genre: command.genre,
                releaseDate: command.releaseDate,
                description: command.description,
                isFeatured: command.isFeatured
            }
        }));
    }

    @Action(GamesActions.remove)
    public remove(ctx: StateContext<GamesStateModel>, {command}: GamesActions.remove) {
        const state = ctx.getState();
        if (!state.games[command.gameId]) {
            throw new Error(`Game with id ${command.gameId} does not exist!`);
        }
        ctx.setState(produce((draft) => {
            delete draft.games[command.gameId];
        }));
    }
}
