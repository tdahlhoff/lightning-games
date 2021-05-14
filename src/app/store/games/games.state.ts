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

    @Action(GamesActions.Load)
    public load(ctx: StateContext<GamesStateModel>) {
        ctx.setState(produce((draft) => {
            if (!draft.games['cfc57eb0-0659-4d8b-b76d-8f13c2e52457']) {
                draft.games['cfc57eb0-0659-4d8b-b76d-8f13c2e52457'] = {
                    gameId: 'cfc57eb0-0659-4d8b-b76d-8f13c2e52457',
                    name: 'Tetris',
                    genre: 'Puzzle',
                    creationDate: moment().format(),
                    releaseDate: '1984-06-06',
                    description: 'Tetris is a tile-matching video game created by Russian software engineer Alexey ' +
                        'Pajitnov in 1984 for the Electronika 60 computer. It has been published by several ' +
                        'companies, most prominently during a dispute over the appropriation of the rights in the ' +
                        'late 1980s.',
                    isFeatured: false
                }
            }
            if (!draft.games['f5358325-7c2e-460e-b020-8e688368537e']) {
                draft.games['f5358325-7c2e-460e-b020-8e688368537e'] = {
                    gameId: 'f5358325-7c2e-460e-b020-8e688368537e',
                    name: 'Puck-Man',
                    genre: 'Maze',
                    creationDate: moment().format(),
                    releaseDate: '1980-06-01',
                    description: 'Pac-Man is a maze action game developed and released by Namco for arcades in 1980. ' +
                        'The original Japanese title of Puck Man was changed to Pac-Man for international releases ' +
                        'as a preventative measure against defacement of the arcade machines by changing the P to ' +
                        'an F.',
                    isFeatured: true
                }
            }
        }));
    }

    @Action(GamesActions.Create)
    public create(ctx: StateContext<GamesStateModel>, {command}: GamesActions.Create) {
        ctx.setState(produce((draft) => {
            const gameId = uuid();
            draft.games[gameId] = {
                gameId: gameId,
                name: command.name,
                genre: command.genre,
                creationDate: moment().format(),
                releaseDate: command.releaseDate,
                description: command.description,
                isFeatured: false
            }
        }));
    }

    @Action(GamesActions.Edit)
    public edit(ctx: StateContext<GamesStateModel>, {command}: GamesActions.Edit) {
        ctx.setState(produce((draft) => {
            draft.games[command.gameId] = {
                ...draft.games[command.gameId],
                name: command.name,
                genre: command.genre,
                releaseDate: command.releaseDate,
                description: command.description
            }
        }));
    }

    @Action(GamesActions.Delete)
    public remove(ctx: StateContext<GamesStateModel>, {command}: GamesActions.Delete) {
        const state = ctx.getState();
        if (!state.games[command.gameId]) {
            throw new Error(`Game with id ${command.gameId} does not exist!`);
        }
        ctx.setState(produce((draft) => {
            delete draft.games[command.gameId];
        }));
    }

    @Action(GamesActions.SetFeatured)
    public setFeatured(ctx: StateContext<GamesStateModel>, {command}: GamesActions.SetFeatured) {
        const state = ctx.getState();
        if (!state.games[command.gameId]) {
            throw new Error(`Game with id ${command.gameId} does not exist!`);
        }
        ctx.setState(produce((draft) => {
            draft.games[command.gameId].isFeatured = true;
        }));
    }
}
