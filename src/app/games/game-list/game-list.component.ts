import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GamesState } from '../../store/games/games.state';
import { Select, Store } from '@ngxs/store';
import { Game } from '../../model/game';
import { GamesActions } from '../../store/games/games.actions';
import { GamesCommands } from '../../store/games/games.commands';

@Component({
    selector: 'app-games',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

    @Select(GamesState.getGames) games$!: Observable<Game[]>;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
    }

    deleteGame(game: Game) {
        this.store.dispatch(new GamesActions.Delete(new GamesCommands.Delete(game.gameId))).subscribe();
    }
}
