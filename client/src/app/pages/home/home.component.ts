import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { map } from 'rxjs/operators';
import { Game } from '../../interfaces/interfaces';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  juegos: any[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    
    this.getData();
  }

  getData(){
    this.gameService
    .getGames()
    .pipe(
      map((resp: Game[]) => resp.map(({ name,votes }) => ({ name, value: votes })))
    )
    .subscribe((res) => {
      // console.log("res",res?.data);
      
      this.juegos = res;
    });
  }
}
