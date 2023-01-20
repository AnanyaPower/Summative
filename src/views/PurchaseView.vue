<script setup>
import axios from "axios";
import { ref } from 'vue';
import SiteModal from '../components/SiteModal.vue';
import { useStore } from "../store/index.js"

const store = useStore();
const genre = ref(28);
const criteria = ref("");
const searchResults = ref([]);
const page = ref(1);
const totalPages = ref(0);
const showModal = ref(false);
const selectedId = ref(0);

const openModal = (id) => {
  showModal.value = true;
  selectedId.value = id;
};

const closeModal = () => {
  showModal.value = false;
};

const getGenres = async () => {
  searchResults.value = [];
  criteria.value = "";
  await store.getMovies(genre.value);
}

const search = async (direction) => {
  page.value += direction;

  let data = (
    await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "13fa5f30fd7d0d46db32924a921592e2",
        query: criteria.value,
        include_adult: false,
        page: page.value,
      },
    })
  ).data;

  totalPages.value = data.total_pages;

  searchResults.value = data.results.map((movie) => {
    return {
      id: movie.id,
      image: movie.poster_path,
    };
  });
};

// SHOULD ONLY BE RUN ONCE!!!!
// await store.populateFirestore();
</script>

<template>
  <div class="name">
    <h1>CENTRAL PERK</h1>
  </div>
  <!-- Delete div for searchbar if no css used -->
  <div class="searchbar">
    <input type="search" v-model="criteria" @keydown.enter="search(0)" />
  </div>
  <select v-model="genre" @change="getGenres()">
      <option value="Action">Action</option>
      <option value="Animation">Animation</option>
      <option value="Drama">Drama</option>
      <option value="Mystery">Mystery</option>
      <option value="Romance">Romance</option>
  </select>
  <div class="background">
    <RouterLink to="/cart" custom v-slot="{ navigate }">
      <font-awesome-icon class="cart"  @click="navigate" role="link" icon="fa-solid fa-cart-shopping" size="6x" pull="right" />
    </RouterLink>
    <template v-if="searchResults.length">
      <div class="navigation">
        <table>
          <tr>
            <td>
              <button v-show="page > 1" @click="search(-1)">Prev</button>
            </td>
          <h3>{{ `Page ${page} of ${totalPages}` }}</h3>
            <td>
              <button v-show="page < totalPages" @click="search(1)">Next</button>
            </td>
          </tr>
        </table>
      </div>
    </template>
    <div class="purchase-container">
      <template v-if="searchResults.length">
        <img
          v-for="movie in searchResults"
          :id="movie.id"
          @click="openModal(movie.id)"
          :src="`https://image.tmdb.org/t/p/w500${movie.image}`"
        />
      </template>
      <img 
        v-for="movie in store.movies" 
        :id="movie.id" 
        @click="openModal(movie.id)"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster}`"
        />
      <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />
    </div>
  </div>
</template>

<style scoped>
.searchbar {
  margin-left: 25px;
  /* margin-top: 25px; */
  /* width: 100%; centers search bar
  text-align:center; centers search bar*/
}

select {
  margin-left: 25px;
  margin-bottom: 25px;
  /* margin-top: 25px; */
}

.name {
  padding : 1px;
}

h1 {
  font-size: 35px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: forestgreen;
  padding: 1px 25px;
}

/* h3 {
  font-size: 35px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: forestgreen;
  padding: 1px 25px;
} */

table {
  margin: auto;
}

button {
  display: table;
  background-color: darkblue;
  border: none;
  color: white;
  padding: 15px 32px;
  text-decoration: none;
  font-size: 16px;
}

.background {
  background: #5955;
}

.purchase-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.cart {
  margin-right: 25px;
  margin-top: 25px;
}

img {
  position: relative;
  left: 30px;
  width: 175px;
  aspect-ratio: 2 / 3;
  margin-top: 25px;
}
</style>