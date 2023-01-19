<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref(false);
const props = defineProps(["id"]);
const emits = defineEmits(["toggleModal"]);

const login = () => {
  if (username.value === "tmdb" && password.value === "movies") {
    router.push("./purchase");
  } else {
    error.value = true;
  }
};
</script>

<template>
  <div class="name">
    <h1>CENTRAL PERK</h1>
  </div>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login()">
      <input type="text" placeholder="Username" v-model="username" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="submit" value="Login" />
    </form>
    <div v-if="error">
      <p>Incorrect Username or Password!</p>
    </div>
  </div>
</template>

<style scoped>
.name {
  padding-top: 2px;
}
  
h1 {
  font-size: 35px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: forestgreen;
  padding: 1px 25px;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 3rem;
}

form {
  display: flex;
  flex-direction: column;
}
</style>