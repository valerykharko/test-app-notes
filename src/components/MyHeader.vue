<template>
  <header>
    <div class="links">
      <div
        v-if="this.$router.currentRoute.value.path !== '/'"
        @click="$router.back()"
      >
        <img src="@/assets/previous.png" alt="back-icon" />
      </div>
      <nav><router-link class="link" to="/">Заметки</router-link></nav>
    </div>
    <div class="create-note">
      <button @click="changeModalOpen">
        <strong style="font-size: 18px">Создать заметку</strong>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: ["changeModalOpen"],
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  width: 100%;
  height: 80px;
  background: lightgray;
}

.create-note button {
  padding: 10px;
  border: none;
  border-radius: 2px;
  background: lightcyan;
  box-shadow: 0 0 2px 2px lightskyblue;
  cursor: pointer;
}

.create-note button:hover {
  background: white;
  box-shadow: 0 0 4px 4px lightskyblue;
}

.links {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.links img {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 35px;
  height: 35px;
  margin-right: 20px;
  cursor: pointer;
}

.links img:hover {
  border-radius: 100%;
  background: lightskyblue;
}

.link {
  padding: 10px;
  border-bottom: 2px solid black;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: black;
  background: white;
}

.link:hover {
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 4px 4px darkgray;
}
</style>
