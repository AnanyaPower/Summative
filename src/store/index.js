import { firestore } from "../firebase/index";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { defineStore } from 'pinia'
import axios from 'axios';

export const useStore = defineStore('store', {
  state: () => {
    return {
      movies: [],
      cart: new Map(),
    }
  },
  actions: {
    async populateFirestore() {
      const genres = new Map([[28, "Action"], [10751, "Animation"], [18, "Drama"], [9648, "Mystery"], [10749, "Romance"]]);

      genres.forEach(async (value, key) => {
        let data = (await axios.get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: "13fa5f30fd7d0d46db32924a921592e2",
            with_genres: key,
            include_adult: false,
          }
        })).data.results;
        data = data.map((movie) => {
          return {
            id: movie.id,
            image: movie.poster_path,
          }
        });
        await setDoc(doc(firestore, "Genre", value), { data });
      });
    },
    async getMovies(genre) {
      this.movies = (await getDoc(doc(firestore, "Genre", genre))).data().data;
    },
    addToCart(id, data) {
      this.cart.set(id, data);
    },
    removeFromCart(id) {
      this.cart.delete(id);
    }
  }
});