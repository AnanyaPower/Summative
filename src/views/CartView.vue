<script setup>
import { useStore } from "../store/index.js"

const store = useStore();
</script>

<template>
  <div class="name">
    <h1>CENTRAL PERK</h1>
  </div>
  <div class="background">
    <RouterLink to="/purchase" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">Back</button>
    </RouterLink>
    <div v-for="movie in Array.from(store.cart.values())">
      <div class="container">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
        <div class="title">
          <h1>{{movie.title}}</h1>
          <div class="remove">
            <button @click="store.removeFromCart(movie.id)">Remove</button>
          </div>
        </div>
        <!-- <div class="remove">x
        <button @click="store.removeFromCart(movie.id)">Remove</button>
        </div> -->
      </div>
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

button {
  background-color: darkblue;
  border: none;
  color: white;
  padding: 15px 32px;
  text-decoration: none;
  font-size: 16px;
  margin-left: 85%;
  margin-top: 20px;
}

.container {
  display: flex;
}

img {
  position: relative;
  left: 30px;
  width: 175px;
  aspect-ratio: 2 / 3;
  margin-top: 25px;
}

.title {
  margin-left: 100px;
  margin-top: 100px;
}
/* .remove {
  background-color: darkblue;
  border: none;
  color: white;
  padding: 15px 32px;
  text-decoration: none;
  font-size: 16px;
  margin-left: 112px;
  margin-top: 65px;
} */
</style>
