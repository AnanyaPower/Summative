<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase/index";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

const router = useRouter();
const email = ref("");
const password = ref("");
const props = defineProps(["id"]);
const emits = defineEmits(["toggleModal"]);

const loginUserByEmailAndPassword = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/purchase');
  } catch (error) {
  }
};

const loginUserByGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
  router.push('/purchase');
};
</script>

<template>
  <div class="name">
    <h1>CENTRAL PERK</h1>
  </div>
  <div class="login-container">
    <h1>Login</h1>
    <h2>Login by Google</h2>
    <button @click="loginUserByGoogle">Google</button>
    <h2>Login by Email</h2>
    <form @submit.prevent="loginUserByEmailAndPassword()">
      <input v-model="email" type="email" placeholder="email" />
      <input v-model="password" type="password" placeholder="password" />
      <input type="submit" value="Login" />
    </form>
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
  background: #5955;
}

form {
  display: flex;
  flex-direction: column;
}
</style>