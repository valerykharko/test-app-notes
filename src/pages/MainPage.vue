<template>
  <div class="container">
    <div v-if="notes.length > 0">
      <div class="totalCount">
        <h3 style="font-weight: normal">
          Общее количество заметок:
          <strong>{{ notes.length }}</strong>
        </h3>
      </div>
      <NotesList :notes="notes" />
    </div>
    <div class="empty" v-else>
      <h2>На данный момент заметок нет, создайте первую :)</h2>
    </div>
  </div>
</template>

<script>
import NotesList from "@/components/Notes/NotesList";

export default {
  components: { NotesList },
  props: ["notes"],
};
</script>

<style scoped>
.container {
  padding: 30px 200px;
}

.totalCount {
  display: flex;
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
}
</style>
