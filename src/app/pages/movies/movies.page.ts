import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment'
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) => {
      loading.dismiss();
      this.movies.push(...res.results);
      console.log(res);

      event ?.target.complete();
      //On check si on a pas atteint la dernière page disponible, et si oui on ne charge pas d'autre page
      if(event) {
        event.target.disabled = res.total_pages == this.currentPage;
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
