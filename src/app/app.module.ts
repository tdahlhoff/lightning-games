import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { GameInfoComponent } from './games/game-info/game-info.component';
import { GameFormComponent } from './games/game-form/game-form.component';
import { GamesComponent } from './games/games.component'
import { NgxsModule } from '@ngxs/store';
import { GamesState } from './store/games/games.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        GameListComponent,
        GameInfoComponent,
        GameFormComponent,
        GamesComponent
    ],
    imports: [
        NgxsModule.forRoot([GamesState], {
            developmentMode: !environment.production
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
