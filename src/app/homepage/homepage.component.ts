import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GamesState } from '../store/games/games.state';
import { Observable } from 'rxjs';
import { Game } from '../model/game';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @Select(GamesState.getFeaturedGames) featuredGames$!: Observable<Game[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
