<template>
  <div>
    <div class="mx-auto">
      <div class="h-screen px-5">
        <div class="border-grey flex h-full rounded border shadow-lg">
          <!-- Left -->
          <chat-left @renderChat="renderChat"></chat-left>

          <!-- Right -->
          <chat-right :chat_id="chatID"></chat-right>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import chatLeft from './chatParts/chatLeft.vue';
import chatRight from './chatParts/chatRight.vue';
import { onUnmounted, ref } from 'vue';

const chatID = ref();

const renderChat = (chat_id: any) => {
  chatID.value = null;
  chatID.value = chat_id;
  console.log('chatID', chatID.value);
};

onUnmounted(() => {
  window.Echo.leave('chat.' + chatID.value);
  console.log('BYE BYE');
});

// const messages = ref([]);
// const startWebSocket = async () => {
//   console.log('startWebSocket', chatID.value);
//   // window.Echo.leave('chat.' + chatID.value);
//   // Subscribe to the private channel for the chat between two users
//   window.Echo.private('chat.' + chatID.value).listen('ChatMessageSent', (e: any) => {
//     // Handle incoming messages
//     handleIncomingMessage(e.message);
//   });
// };
// startWebSocket();

// const handleIncomingMessage = (message: any) => {
//   //@ts-ignore
//   messages.value.push(message);
// };
</script>
