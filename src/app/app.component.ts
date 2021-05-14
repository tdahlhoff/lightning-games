import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GamesActions } from './store/games/games.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'lightning-games';

    constructor(private store: Store) {
        store.dispatch(new GamesActions.load()).subscribe();
    }
}
