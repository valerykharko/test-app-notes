<template>
  <div class="notes">
    <div
      class="note"
      v-for="note in notes"
      @click="$router.push(`/${note.id}`)"
    >
      <NoteItem :note="note"></NoteItem>
    </div>
  </div>
</template>

<script>
import NoteItem from "@/components/Notes/NoteItem.vue";

export default {
  props: { notes: { type: Array } },
  components: { NoteItem },
};
</script>

<style scoped>
.notes {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.note {
  flex: 0 1 23%;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  min-height: 150px;
  border-radius: 5px;
  background: white;
  cursor: pointer;
}
</style>
