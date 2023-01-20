<script setup>
import axios from 'axios';
import { useStore } from "../store/index.js"

const store = useStore();
const props = defineProps(["id"]);
const emits = defineEmits(["toggleModal"]);

let data = (await axios.get(`https://api.themoviedb.org/3/movie/${props.id}`, {
    params: {
      api_key: "13fa5f30fd7d0d46db32924a921592e2",
    }
  })).data;
</script>

<template>
  <Teleport to="body">
    <div class="modal-outer-container" @click.self="emits('toggleModal')">
      <div class="modal-inner-container">
        <button class="close-button" @click="emits('toggleModal')">X</button>
        <div class="container">
          <div class="text">
            <h1>{{ data.title }}</h1>
            <h2>Release Date: {{ data.release_date }}</h2>
            <button @click="store.addToCart(props.id, {
              id: data.id,
              poster: data.poster_path,
              title: data.title
            })">Purchase</button>
          </div>
          <div class="image">
            <img :src="`https://image.tmdb.org/t/p/w500${data.poster_path}`">
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-outer-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #00000099;
  z-index: 3;
}
  
.modal-outer-container .modal-inner-container {
  background-color: #1F2123;
  width: clamp(280px, 100%, 800px);
  height: 400px;
  position: relative;
}
  
.modal-outer-container .modal-inner-container .close-button {
  position: absolute;
  margin: 0px;
  right: 0px;
  padding: 1rem;
  border: none;
  background: #1F2123;
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
}

.container {
  display: flex;
}

.text {
  font-size: 20px;
  margin-left: 20px;
  margin-bottom: 150px;
  color: #FAF9F6;
  
}

button {
  background-color: darkblue;
  border: none;
  color: white;
  padding: 15px 32px;
  text-decoration: none;
  font-size: 16px;
  margin-left: 112px;
  margin-top: 65px;
}

img {
  width: 175px;
  aspect-ratio: 2 / 3;
  margin: 80px;
}
</style>
