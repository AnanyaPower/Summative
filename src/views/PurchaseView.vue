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
</script>

<template>
  <div class="name">
    <h1>CENTRAL PERK</h1>
  </div>
  <input type="search" v-model="criteria" @keydown.enter="search(0)" />
  <div class="background">
    <RouterLink to="/cart" custom v-slot="{ navigate }">
      <font-awesome-icon class="cart"  @click="navigate" role="link" icon="fa-solid fa-cart-shopping" size="6x" pull="right" />
    </RouterLink>
  </div>
  <select v-model="genre" @change="getGenres()">
    <option value="28">Action</option>
    <option value="12">Family</option>
    <option value="16">Science Fiction</option>
    <option value="35">Adventure</option>
    <option value="80">Fantasy</option>
  </select>
  <template v-if="searchResults.length">
    <div class="navigation">
      <button v-show="page > 1" @click="search(-1)">Prev</button>
      <h1>{{ `Page ${page} of ${totalPages}` }}</h1>
      <button v-show="page < totalPages" @click="search(1)">Next</button>
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
    <img v-for="movie in store.movies" :id="movie.id" @click="openModal(movie.id)"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
    <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />
  </div>
</template>

<style scoped>
.purchase-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

img {
  width: 200px;
  aspect-ratio: 2 / 3;
}
</style>

<!-- <script setup>
import axios from "axios";
import { ref } from "vue";
import SiteModal from "../components/SiteModal.vue"
import { useStore } from "../store/index.js"

const store = useStore();
await store.getMovies();

const genre = ref(28);
const criteria = ref("");
const searchResults = ref([]);
const page = ref(1);
const totalPages = ref(0);

const showModal = ref(false);
const selectedId =  ref(0);

const openModal = (id) => {
  showModal.value = true;
  selectedId.value = id;
}

const closeModal = () => {
  showModal.value = false;
}

const getGenres = async () => {
  searchResults.value = [];
  criteria.value = "";
  await store.getMovies(genre.value);
};
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
  <input type="search" v-model="criteria" @keydown.enter="search(0)" />
  <br />
  <div class="name">
    <h1>CENTRAL PERK</h1>
  </div>
  <div class="background">
    <RouterLink to="/cart" custom v-slot="{ navigate }">
      <font-awesome-icon class="cart"  @click="navigate" role="link" icon="fa-solid fa-cart-shopping" size="6x" pull="right" />
    </RouterLink>
  <select v-model="genre" @change="getGenres()">
    <option value="Action">Action</option>
    <option value="Family">Family</option>
    <option value="Science Fiction">Science Fiction</option>
    <option value="Adventure">Adventure</option>
    <option value="Fantasy">Fantasy</option>
  </select>
    <div class="purchase-container">
    <template v-if="searchResults.length">
      <img
        v-for="movie in searchResults"
        :id="movie.id"
        @click="openModal(movie.id)"
        :src="`https://image.tmdb.org/t/p/w500${movie.image}`"
      />
    </template>
    <template v-else>
      <img
        v-for="movie in store.movies"
        :id="movie.id"
        @click="openModal(movie.id)"
        :src="`https://image.tmdb.org/t/p/w500${movie.image}`"
      />
    </template>
    <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />
  </div>
    <div class="purchase-container">
      <img v-for="movie in store.movies" :id="movie.id" @click="openModal(movie.id)"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
      <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />
    </div>
  </div>
</template>

<style scoped>
.name {
  padding: 1px;
}

h1 {
  font-size: 35px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: forestgreen;
  padding: 1px 25px;
}

.background {
  background: #5955;
}

.cart {
  margin-right: 25px;
  margin-top: 25px;
}

.purchase-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

img {
  position: relative;
  left: 30px;
  width: 175px;
  aspect-ratio: 2 / 3;
  margin-top: 25px;
}
</style> -->

<!-- <script setup>
import axios from "axios";
import { ref } from "vue";
import SiteModal from "../components/SiteModal.vue";
import { useStore } from "../store/index.js";

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
};

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
  <input type="search" v-model="criteria" @keydown.enter="search(0)" />
  <br />
  <RouterLink to="/cart" custom v-slot="{ navigate }">
    <button @click="navigate" role="link">Cart</button>
  </RouterLink>
  <br />
  <select v-model="genre" @change="getGenres()">
    <option value="Action">Action</option>
    <option value="Family">Family</option>
    <option value="Science Fiction">Science Fiction</option>
    <option value="Adventure">Adventure</option>
    <option value="Fantasy">Fantasy</option>
  </select>
  <template v-if="searchResults.length">
    <div class="navigation">
      <button v-show="page > 1" @click="search(-1)">Prev</button>
      <h1>{{ `Page ${page} of ${totalPages}` }}</h1>
      <button v-show="page < totalPages" @click="search(1)">Next</button>
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
    <template v-else>
      <img
        v-for="movie in store.movies"
        :id="movie.id"
        @click="openModal(movie.id)"
        :src="`https://image.tmdb.org/t/p/w500${movie.image}`"
      />
    </template>
    <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />
  </div>
</template>

<style scoped>
.purchase-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

img {
  width: 200px;
  aspect-ratio: 2 / 3;
}

.navigation {
  display: flex;
  justify-content: space-between;
}
</style> -->
