<template>
  <div class="title">
    <h3>{{ note.title }}</h3>
  </div>
  <div class="todo" v-for="todo in note.todos.slice(0, 3)">
    <input disabled type="checkbox" v-model="todo.isCompleted" />
    <span>{{ todo.name }}</span>
  </div>
</template>

<script>
export default {
  props: { note: { type: Object } },
};
</script>

<style scoped>
.title {
  margin-bottom: 15px;
}

.todo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.todo input {
  margin-right: 10px;
  cursor: not-allowed;
  transform: scale(1.5);
}

.todo span {
  font-size: 18px;
}
</style>
