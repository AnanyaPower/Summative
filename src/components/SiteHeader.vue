<script setup>
</script>

<template>
  <div class="name">
    <h1>CENTRAL PERK</h1>
  </div>
  <RouterLink to="/login" custom v-slot="{ navigate }">
    <button @click="navigate" role="link">Login</button>
  </RouterLink>
  <RouterLink to="/register" custom v-slot="{ navigate }">
    <button @click="navigate" role="link">Register</button>
  </RouterLink>
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

button {
  display: table;
  background-color: darkblue;
  border: none;
  color: white;
  padding: 15px 32px;
  text-decoration: none;
  font-size: 16px;
  margin-left: 85%;
}
</style>