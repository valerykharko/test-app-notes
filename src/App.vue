<template>
  <MyHeader :changeModalOpen="changeModalOpen" />
  <router-view
    style="height: calc(100vh - 80px); background-color: #ebebeb"
    :notes="notes"
    :editNote="editNote"
    :removeNote="removeNote"
  />
  <ModalPopup
    v-show="modalOpen"
    :notes="notes"
    :addNote="addNote"
    :changeModalOpen="changeModalOpen"
  />
</template>

<script>
import { reactive, ref } from "vue";
import MyHeader from "@/components/MyHeader";
import ModalPopup from "@/components/ModalPopup";

export default {
  components: { ModalPopup, MyHeader },
  setup() {
    let notes = reactive([]);
    if (localStorage.getItem("notes")?.length > 0) {
      notes = reactive(JSON.parse(localStorage.getItem("notes")));
    } else {
      localStorage.setItem("notes", JSON.stringify(notes));
    }

    let modalOpen = ref(false);

    const changeModalOpen = () => {
      modalOpen.value = !modalOpen.value;
    };

    const addNote = (newNote) => {
      notes.push(newNote);
      localStorage.removeItem("notes");
      localStorage.setItem("notes", JSON.stringify(notes));
    };

    const editNote = (newNote) => {
      notes.forEach((elem, index) => {
        if (elem.id === newNote.id) {
          return (notes[index] = newNote);
        }
      });
      localStorage.removeItem("notes");
      localStorage.setItem("notes", JSON.stringify(notes));
    };

    const removeNote = (noteId) => {
      const indexOfNote = notes.findIndex((key) => key.id === Number(noteId));
      notes.splice(indexOfNote, 1);
      localStorage.removeItem("notes");
      localStorage.setItem("notes", JSON.stringify(notes));
    };

    return {
      notes,
      addNote,
      editNote,
      removeNote,
      modalOpen,
      changeModalOpen,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
</style>
