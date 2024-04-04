import type { Chat, Message, User } from '@/api/types';
import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from './user';

export const useChatStore = defineStore('chat', () => {
  const userStore = useUserStore();
  const user = computed<User | null>(() => userStore.user);

  const messages = ref<Message[]>([]);
  const chat = ref<Chat>();

  const GET_DATA = async (chat_id: number | undefined) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/chat/get-chat-by-id/${chat_id}`);
      messages.value = response.data.messages.data;
      chat.value = response.data.chat;
      window.Echo.leave('chat.' + chat_id);
      START_WEBSOCKET(chat_id);
    } catch (error) {
      console.error('Error getting chat data:', error);
    }
  };

  const START_WEBSOCKET = async (chat_id: number | undefined) => {
    console.log('startWebSockeHERE', chat_id);
    window.Echo.private('chat.' + chat_id)
      .listen('ChatMessageSent', (e: any) => {
        messages.value.push(e.message);
        if (user.value) {
          console.log('User id does not works');
          // if (user.value.id != e.message.sender.id) {
          // console.log('New message received!');

          axios.get(`http://localhost:8000/api/chat/message-status/${e.message.id}`);

          if (user.value.id != e.message.sender.id) {
            console.log('New message received!');
          }
        }
      })
      .listen('ChatMessageStatus', (e: any) => {
        const foundMessage = messages.value.find((m) => m.id == e.message.id);
        if (foundMessage) {
          foundMessage.data.status = e.message.data.status;
        }
      });
  };

  return {
    messages,
    chat,
    GET_DATA
  };
});
