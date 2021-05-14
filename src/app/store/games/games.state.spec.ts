import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GamesState, GamesStateModel } from './games.state';

describe('Games store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GamesState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should Create an action and add an item', () => {
    const expected: GamesStateModel = {
      items: ['item-1']
    };
    store.dispatch(new GamesAction('item-1'));
    const actual = store.selectSnapshot(GamesState.getState);
    expect(actual).toEqual(expected);
  });

});
