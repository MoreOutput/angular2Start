import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
	private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
    	// converting Observable to promise with imported
    	// function from RXJS
    	.toPromise()
    	// Promise callback. Converts incoming json into
    	// the wanted heros array. Mock returns an object
    	// with a data property that houses the heroes.
    	.then(response => response.json().data as Hero[])
    	.catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
  	console.error('An error in HeroService has occurred!', error);
  	return Promise.reject(error.message || error);
  }

  create(name: string): Promise<Hero> {
	  return this.http
	  	.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
		.toPromise()
		.then(res => res.json().data)
		.catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
	  const url = `${this.heroesUrl}/${hero.id}`;

	  console.log('Calling getHero url', url);

	  return this.http
		  .put(url, JSON.stringify(hero), {headers: this.headers})
		  .toPromise()
		  .then(() => hero)
		  .catch(this.handleError);
	}

  getHero(id: number): Promise<Hero> {
  	const url = `${this.heroesUrl}/${id}`;

  	console.log('Calling getHero url', url);

  	return this.http.get(url)
  		.toPromise()
  		.then(response => response.json().data as Hero)
  		.catch(this.handleError);
	}
}
