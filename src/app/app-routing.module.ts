import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { GameInfoComponent } from './games/game-info/game-info.component';
import { GameFormComponent } from './games/game-form/game-form.component';
import { GamesComponent } from './games/games.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'homepage'
    }, {
        path: 'homepage',
        component: HomepageComponent
    }, {
        path: 'games',
        component: GamesComponent,
        children: [
            {
                path: '',
                component: GameListComponent
            },
            {
                path: 'create',
                component: GameFormComponent
            },
            {
                path: ':gameId/info',
                component: GameInfoComponent
            },
            {
                path: ':gameId/Edit',
                component: GameFormComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
