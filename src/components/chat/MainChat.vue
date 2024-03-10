<template>
  <div class="container mx-auto">
    <div class="rounded-lg bg-white shadow-md">
      <div class="border-b border-gray-200 p-4">Chats</div>
      <div class="p-4">
        <chat-messages :messages="messages"></chat-messages>
      </div>
      <div class="border-t border-gray-200 p-4">
        <chat-form @messagesent="addMessage" :user="user"></chat-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ChatMessages from './ChatMessages.vue';
import ChatForm from './ChatForm.vue';

const messages = ref([]);
const user = ref(null);

const addMessage = (message) => {
  messages.value.push(message);
};

onMounted(async () => {
  // Fetch the current user and messages when the component is mounted
  // This is just a placeholder, replace it with actual data fetching logic
  user.value = await fetchCurrentUser();
  messages.value = await fetchMessages();
});
</script>
