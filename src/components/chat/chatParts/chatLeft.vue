<template>
  <div class="flex w-1/3 flex-col border">
    <!-- Search -->
    <div class="bg-grey-lightest px-2 py-2">
      <input type="text" class="w-full px-2 py-2 text-sm" placeholder="Search" />
    </div>

    <!-- Contacts -->
    <div class="bg-grey-lighter flex-1 overflow-auto">
      <div v-for="chat in chats" @click="OpenChat(chat.id)" :key="chat.id">
        <div
          v-for="participant in chat.participants"
          class="bg-grey-light flex cursor-pointer items-center px-3"
        >
          <div v-if="participant.id != user?.id">
            <img class="h-12 w-12 rounded-full" :src="participant.profile_picture" />
          </div>
          <div
            v-if="participant.id != user?.id"
            class="border-grey-lighter ml-4 flex-1 border-b py-4"
          >
            <div class="items-bottom flex justify-between">
              <p class="text-grey-darkest">{{ participant.name }}</p>
              <p class="text-grey-darkest text-xs">12:45 pm</p>
            </div>
            <div>
              <p v-if="user?.id != chat.messages[0]?.user_id" class="font-bold">
                {{ chat.messages.length > 0 ? trimMessage(chat.messages[0].message) : '' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User, Chat } from '@/api/types';
import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const userStore = useUserStore();
const user = computed<User | null>(() => userStore.user);

// chats

const chatStore = useChatStore();

const chats = ref<Chat[]>();

const getChats = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/chat/get-chats');
    chats.value = response.data.chats;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  getChats();
  if (!userStore.user) {
    await userStore.GET_USER();
  }
  console.log('user: ', user.value?.id);
});

const emit = defineEmits(['renderChat']);

const chat_id = ref();
const OpenChat = async (chat_id: any) => {
  await getChats();
  await window.Echo.leave('chat' + chat_id);
  emit('renderChat', chat_id);
};

const trimMessage = (message: string) => {
  return message.length > 10 ? message.substring(0, 10) + '...' : message;
};

// const messages = computed(() => chatStore.messages);
// console.log('MESSAGES', messages.value);
// const unseenMessages = computed(() =>
//   messages.value.filter((message) => message.data.status == 'delivered')
// );
// console.log('unSEEN', unseenMessages.value);

// const lastUnseenMessage = computed(() => {
//       if (unseenMessages.value.length > 0) {
//         const sortedMessages = unseenMessages.value.sort((a: any, b: any) => new Date(b.timestamp) - new Date(a.timestamp));
//         return sortedMessages[0];
//       } else {
//         return null;
//       }
//     });
// const isUnseen = () => {
//   const unseenMessages2 = messages.value.filter((message) => message.data.status == 'delivered');
//   return unseenMessages2.length > 0;
// };
</script>
