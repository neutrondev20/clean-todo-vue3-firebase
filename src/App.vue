<script setup lang="ts">
import dayjs from "dayjs";
import { generateRandomUUID } from "./utils/helpers";
import { Unsubscribe } from "firebase/firestore";
import {
  TodoListViewModel,
  ITodoListViewModel,
} from "./todo-list/view/viewmodel/todo-list.view-model";
import { onMounted, onUnmounted, ref } from "vue";

const vm = ref<ITodoListViewModel<Unsubscribe>>(new TodoListViewModel());

onMounted(async () => {
  await vm.value.init();
});

const invisible_padding = ref<HTMLDivElement | null>(null);

onUnmounted(() => {
  vm.value.deinit();
});
</script>

<template>
  <div class="w-screen h-screen flex flex-col py-4">
    <div class="flex flex-col px-4">
      <div class="text-2xl text-green-700 uppercase">Naturally 🍃</div>
      <div class="text-green-700 text-opacity-60">
        Your only productive pocket friend
      </div>
    </div>
    <div
      class="flex flex-row w-full h-full min-h-0 mt-2 border border-b-0 border-gray-300"
    >
      <div
        class="h-full overflow-y-scroll w-[300px] scrollbar-none border-r border-gray-300"
      >
        <div class="font-bold text-xl p-4">Your List</div>
        <div
          class="flex flex-col w-full"
          v-for="[id, list] in vm.todo_lists"
          :key="id"
          @click="vm.selected_list_id = id"
        >
          <div
            class="p-4 transition-colors"
            :class="vm.selected_list_id === id ? 'bg-green-100 font-bold' : ''"
          >
            <i class="mr-2">{{ list.icon }}</i>
            <span>{{ list.title }}</span>
          </div>
        </div>
        <div class="w-full">
          <input
            type="text"
            class="w-full placeholder-gray-300 p-4"
            v-model="vm.new_list"
            placeholder="Create a new list.."
            @keypress.enter="
              () => {
                vm.upsertNewList({
                  uuid: generateRandomUUID(),
                  title: vm.new_list,
                  icon: '📝',
                });
              }
            "
          />
        </div>
      </div>
      <div class="h-full overflow-y-scroll w-full scrollbar-none bg-gray-100">
        <div
          class="w-full h-full empty relative"
          v-if="vm.current_list === undefined"
        >
          <div class="absolute position-center text-gray-300">
            <div class="flex flex-col items-center text-center w-72">
              <i class="fas fa-list-ul fa-4x"></i>
              <span class="font-bold">List not selected</span>
              <p class="text-sm">
                Select a list from the left to view and work on your todos
              </p>
            </div>
          </div>
        </div>
        <div class="w-full non-empty" v-else>
          <div class="text-2xl font-bold p-4">
            <span>{{ vm.current_list.title }}</span>
          </div>
          <div
            class="w-full border-t border-gray-300 p-4 first:border-t-0 bg-white"
            v-for="[id, todo] in vm.todos"
            :key="id"
          >
            <div class="flex flex-row">
              <div
                class="w-6 h-6 mr-2 border-gray-300 shadow-sm relative transition-colors"
                :class="todo.completed ? 'bg-green-400' : 'border'"
                @click="
                  vm.upsertNewTodo({ ...todo, completed: !todo.completed })
                "
              >
                <Transition name="fade">
                  <i
                    class="fas fa-check text-white absolute position-center"
                    v-if="todo.completed"
                  ></i>
                </Transition>
              </div>
              <div class="flex flex-col">
                <span>{{ todo.title }}</span>
                <span class="text-gray-600 text-sm">
                  {{ todo.created_at.format("MMMM DD, YYYY") }}
                </span>
              </div>
            </div>
          </div>
          <input
            type="text"
            class="w-full text-lg placeholder-gray-300 border-y border-gray-300 p-4"
            @focus="vm.typing = true"
            @blur="vm.typing = false"
            placeholder="speak your mind..."
            v-model="vm.new_todo"
            @keypress.enter="
              () => {
                vm.upsertNewTodo({
                  uuid: generateRandomUUID(),
                  title: vm.new_todo,
                  created_at: dayjs(),
                  completed: false,
                });
                invisible_padding?.scrollIntoView();
              }
            "
          />
          <div class="w-full h-12" ref="invisible_padding"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
