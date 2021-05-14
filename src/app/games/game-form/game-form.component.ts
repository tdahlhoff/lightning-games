import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GamesCommands } from '../../store/games/games.commands';
import { Store } from '@ngxs/store';
import { GamesActions } from '../../store/games/games.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GamesState } from '../../store/games/games.state';
import { Game } from '../../model/game';

enum FormMode {
    ADD = "ADD",
    EDIT = "EDIT"
}

@Component({
    selector: 'app-game-form',
    templateUrl: './game-form.component.html',
    styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

    mode = FormMode.ADD;
    selectedGame: Game | null = null;
    gameForm!: FormGroup;

    constructor(private store: Store, private router: Router, private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        const params = this.activatedRoute.snapshot.params;
        if (params.gameId) {
            this.mode = FormMode.EDIT;
            this.selectedGame = this.store.selectSnapshot(GamesState.getGame(params.gameId));
        }
        this.initializeForm();
    }

    onSubmit() {
        if (this.gameForm.valid) {
            let action;
            if (!this.selectedGame) {
                const command = new GamesCommands.Create(this.gameForm.controls.name.value,
                    this.gameForm.controls.genre.value, this.gameForm.controls.description.value,
                    this.gameForm.controls.releaseDate.value);
                action = new GamesActions.Create(command);
            } else {
                const command = new GamesCommands.Edit(this.selectedGame.gameId, this.gameForm.controls.name.value,
                    this.gameForm.controls.genre.value, this.gameForm.controls.description.value,
                    this.gameForm.controls.releaseDate.value);
                action = new GamesActions.Edit(command);
            }

            this.store.dispatch(action).subscribe(
                () => this.router.navigateByUrl('/games'),
                error => this.showError()
            );

        }
    }

    private showError() {
        this.snackBar.open('An error has occured');
    }

    private initializeForm() {
        this.gameForm = new FormGroup({
            name: new FormControl(this.selectedGame?.name, [Validators.required, Validators.maxLength(30)]),
            genre: new FormControl(this.selectedGame?.genre, [Validators.required, Validators.maxLength(30)]),
            releaseDate: new FormControl(this.selectedGame?.releaseDate,
                [Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)]),
            description: new FormControl(this.selectedGame?.description,
                [Validators.required, Validators.maxLength(500)])
        });
    }

    get isEditMode() {
        return this.mode == FormMode.EDIT;
    }

    get isAddingMode() {
        return this.mode == FormMode.ADD;
    }
}
