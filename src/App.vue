<script setup></script>

<template>
  <div class="app-container">
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style scoped>
*,
::before,
::after {
  padding: 0%;
  margin: 0%;
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: #5955;
  outline: 0%;
}

.app-container {
  height: 100vh;
}

body {
  margin: 0%;
  display: none;
  height: 90vh;
  padding: 0;
  background-color: green;
}
</style>

