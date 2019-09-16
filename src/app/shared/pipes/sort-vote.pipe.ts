import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'sortVote'
})
export class SortVotePipe implements PipeTransform {
    constructor() { }
    transform(moviesList: any, pref: any) {
        const preferredList: Object[] = [];
        const remainingList: Object[] = [];
        if (pref) {
            const vote = pref.voteCount;
            const language = pref.language;
            for (const movie of moviesList) {
                if (language || (vote && vote.length > 0)) {
                    if (language && (vote && vote.length > 0)) {
                        if (movie.original_language === language) {
                            preferredList.push(movie);
                        } else if (movie.genre_ids.some(votes => vote.includes(votes))) {
                            preferredList.push(movie);
                        } else {
                            remainingList.push(movie);
                        }
                    } else {
                        if (language) {
                            if (movie.original_language === language) {
                                preferredList.push(movie);
                            }
                        } else if (vote && vote.length > 0) {
                            if (movie.genre_ids.some(votes => vote.includes(votes))) {
                                preferredList.push(movie);
                            }
                        } else {
                            remainingList.push(movie);
                        }
                    }
                } else {
                    remainingList.push(movie);
                }
            }
            return preferredList.concat(remainingList);
        } else {
            return moviesList;
        }
    }
}
