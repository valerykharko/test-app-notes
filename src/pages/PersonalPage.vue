<template>
  <div class="container">
    <div class="managerButtons">
      <button v-if="disabled" @click="disabled = !disabled">Изменить</button>
      <button v-else @click="editTipOpen = true">Отменить изменения</button>
      <div class="tip" v-show="editTipOpen">
        <span>Вы уверены?</span>
        <div>
          <button @click="editTipOpen = false">Нет</button>
          <button
            @click="
              editTipOpen = false;
              currentNoteCopy = JSON.parse(JSON.stringify(currentNote));
            "
          >
            Да
          </button>
        </div>
      </div>
      <button
        @click="
          disabled = true;
          editNote(currentNoteCopy);
        "
      >
        Сохранить
      </button>
    </div>
    <div class="note">
      <div class="title">
        <h3 v-if="disabled" v-bind:class="[disabled ? isDisabled : isAllowed]">
          {{ currentNoteCopy.title }}
        </h3>
        <input
          v-else
          style="font-weight: bold; font-size: 19px"
          v-model="currentNoteCopy.title"
          class="input__newValue"
          type="text"
          maxlength="35"
        />
        <div class="deleteNote" @click="totalDeleteTipOpen = true">
          <img src="@/assets/remove.png" alt="remove-icon" />
        </div>
        <div class="tip" v-show="totalDeleteTipOpen">
          <span>Удалить заметку?</span>
          <div>
            <button @click="totalDeleteTipOpen = false">Нет</button>
            <button
              @click="
                totalDeleteTipOpen = false;
                removeNote(currentNoteId);
                $router.back();
              "
            >
              Да
            </button>
          </div>
        </div>
      </div>
      <div class="todo" v-for="todo in currentNoteCopy.todos">
        <input
          class="input_checkbox"
          v-model="todo.isCompleted"
          v-bind:class="[disabled ? isDisabled : isAllowed]"
          type="checkbox"
          :disabled="disabled"
        />
        <div>
          <span
            v-if="disabled"
            v-bind:class="[disabled ? isDisabled : isAllowed]"
            >{{ todo.name }}</span
          >
          <input
            v-else
            v-model="todo.name"
            class="input__newValue"
            type="text"
            maxlength="35"
          />
        </div>
        <div
          v-if="!disabled"
          class="deleteImg"
          @click="
            deleteTipOpen = true;
            index = currentNoteCopy.todos.findIndex(
              (key) => key.id === todo.id
            );
          "
        >
          <img src="@/assets/delete.png" alt="delete-icon" />
        </div>
        <div class="tip" v-show="deleteTipOpen">
          <span>Вы уверены?</span>
          <div>
            <button @click="deleteTipOpen = false">Нет</button>
            <button
              @click="
                deleteTipOpen = false;
                currentNoteCopy.todos.splice(index, 1);
              "
            >
              Да
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="!disabled && currentNoteCopy.todos.length < 5"
        class="addTodo"
        @click="
          currentNoteCopy.todos.push({
            id: Date.now(),
            name: 'Введите название задания',
            isCompleted: false,
          })
        "
      >
        <img src="@/assets/add.png" alt="add-icon" />
        <span>Добавить задачу</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import router from "@/router";

export default {
  props: {
    notes: { type: Array },
    editNote: { type: Function },
    removeNote: { type: Function },
  },
  setup({ notes }) {
    const currentNoteId = router.currentRoute.value.params.id;
    const currentNote = notes.find((elem) => elem.id === Number(currentNoteId));

    const currentNoteCopy = reactive(JSON.parse(JSON.stringify(currentNote)));

    const disabled = ref(true);

    const buttonActive = "button_active";
    const isDisabled = "is_disabled";
    const isAllowed = "is_allowed";

    const editTipOpen = ref(false);
    const deleteTipOpen = ref(false);
    const totalDeleteTipOpen = ref(false);

    const index = ref(null);
    const indexOfNote = ref(null);

    return {
      buttonActive,
      isDisabled,
      isAllowed,
      currentNoteId,
      currentNote,
      currentNoteCopy,
      index,
      indexOfNote,
      disabled,
      editTipOpen,
      deleteTipOpen,
      totalDeleteTipOpen,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 150px;
}

.note {
  min-height: 300px;
  width: 500px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 6px 6px #9b9b9b;
  border-radius: 5px;
}

.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
}

.deleteNote {
  position: absolute;
  right: 730px;
  cursor: pointer;
}

.deleteNote img {
  width: 25px;
}

.todo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.input_checkbox {
  margin-right: 10px;
  transform: scale(1.5);
}

.is_allowed {
  cursor: pointer;
}

.is_disabled {
  cursor: not-allowed;
}

.input__newValue {
  font-size: 18px;
  width: 250px;
  border: none;
  outline: none;
}

.todo span {
  font-size: 18px;
}

.deleteImg {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.deleteImg img {
  width: 20px;
  cursor: pointer;
}

.addTodo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  font-size: 18px;
  cursor: pointer;
}

.addTodo img {
  width: 25px;
  margin-right: 10px;
}

.managerButtons {
  margin-bottom: 40px;
}

.managerButtons button {
  padding: 7px 10px;
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  background: lightcyan;
  box-shadow: 0 0 2px 2px lightskyblue;
  cursor: pointer;
}

.managerButtons button:hover {
  box-shadow: 0 0 4px 4px lightskyblue;
}

.button_active {
  box-shadow: 0 0 5px 5px lightskyblue !important;
}

.tip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 120px;
  left: 890px;
  padding: 10px;
  background: white;
  border-radius: 3px;
}

.tip span {
  display: inline-block;
  margin-bottom: 20px;
}

.tip button {
  width: 70px;
  padding: 7px 10px;
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  background: lightcyan;
  cursor: pointer;
  box-shadow: 0 0 3px 3px lightgreen;
}

.tip button:nth-child(2) {
  margin-right: 0;
  box-shadow: 0 0 3px 3px lightcoral;
}
</style>
