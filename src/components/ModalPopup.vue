<template>
  <div class="modalContainer" @click.stop="changeModalOpen">
    <div class="modal" @click.stop>
      <div><h2>Создание заметки</h2></div>
      <div class="block">
        <span>Введите название заметки: (до 35 символов)</span>
        <input v-model="title" @input="inputTitle" type="text" maxlength="35" />
      </div>
      <div class="block">
        <span>Добавьте задачу: (до 35 символов)</span>
        <span v-if="todos.length === 5">Кол-во задач максимум 5!!!</span>
        <input
          v-model="todo"
          @input="inputTodo"
          @keydown.enter="addTodo"
          :disabled="todos.length >= 5"
          type="text"
          maxlength="35"
        />
      </div>
      <div class="result" v-if="title">
        <p>Результат:</p>
        <h3>{{ title }}</h3>
        <div class="todos" v-for="todo in todos">
          <input
            type="checkbox"
            v-model="todo.isCompleted"
            onchange="changeIsTodoCompleted(todo.name)"
          />
          <span>{{ todo.name }}</span>
        </div>
      </div>
      <div class="btn" @click.stop="addNewNote">
        <button>Создать</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["changeModalOpen", "notes", "addNote"],
  data() {
    return {
      title: "",
      todo: "",
      todos: [],
    };
  },
  methods: {
    inputTitle(event) {
      this.title = event.target.value;
    },

    inputTodo(event) {
      this.todo = event.target.value;
    },

    addTodo() {
      if (this.todo !== "") {
        this.todos.push({
          id: Date.now(),
          name: this.todo,
          isCompleted: false,
        });
        this.todo = "";
      }
    },

    changeIsTodoCompleted(name) {
      this.todos.map((elem) => {
        if (elem.name === name)
          return { ...elem, isCompleted: !elem.isCompleted };
      });
    },

    addNewNote() {
      this.addNote({
        id: Date.now(),
        title: this.title,
        todos: this.todos,
      });
      this.title = "";
      this.todo = "";
      this.changeModalOpen();
    },
  },
};
</script>

<style scoped>
.modalContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(4px) brightness(40%) contrast(40%);
}

.modal {
  width: 600px;
  height: 700px;
  padding: 20px;
  border-radius: 10px;
  outline: 4px solid lightgray;
  background: white;
}

.block {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.block span {
  font-size: 16px;
  margin: 5px 0;
}

.block input {
  width: 60%;
  padding: 7px;
  font-size: 16px;
  border: 2px solid lightgray;
}

.block input:hover,
input:focus {
  outline: none;
  border: 2px solid lightskyblue !important;
}

.result {
  margin-top: 20px;
}

.result h3 {
  margin-top: 10px;
}

.todos {
  margin-top: 10px;
}

.todos input {
  margin-right: 10px;
  transform: scale(1.3);
}

.todos span {
  font-size: 16px;
}

.btn {
  position: absolute;
  bottom: 160px;
  right: 690px;
}

.btn button {
  margin-top: 20px;
  padding: 7px 20px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  outline: 2px solid lightgray;
  background: lightgreen;
  cursor: pointer;
}

.btn button:hover {
  outline: 3px solid lightgray;
}
</style>
