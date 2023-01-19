<script setup>
import { ref } from "vue";
import { auth } from "../firebase/index";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const username = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");

const registerUserByEmail = async () => {
  if (password1.value !== password2.value) {
    console.log("Password issue");
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, email.value, password1.value);
  } catch (error) {
    console.log(error);
  }
};

const registerUserByGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider);
  console.log(user);
};
</script>

<template>
  <div>
    <!-- <h1>Login</h1> -->
    <div class="name">
      <h1>CENTRAL PERK</h1>
    </div>
    <div class="register-container">
      <!-- <h2>Register by Google</h2>
      <button @click="registerUserByGoogle">Google</button> -->
      <!-- <hr /> -->
      <h2>Register by email</h2>
      <!-- change style - DO NOT use break tags -->
      <form @submit.prevent="registerUserByEmail()">
        <input v-model="username" type="text" placeholder="username" /> <br />
        <input v-model="email" type="email" placeholder="email" /> <br />
        <input v-model="password1" type="password" placeholder="password" /> <br />
        <input v-model="password2" type="password" placeholder="re-enter password" /> <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  </div>
</template>

<style scoped>
/* .name {
  padding-top: 2px;
} */

/* h1 {
  font-size: 35px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: forestgreen;
  padding: 1px 25px;
} */

.register-container {
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
