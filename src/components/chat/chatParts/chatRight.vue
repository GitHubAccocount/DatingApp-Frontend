<template>
  <div v-if="!chat_id" class="flex w-2/3 items-center justify-center border">
    <p class="font-bold">No chat has been selected</p>
  </div>
  <div v-else class="flex w-2/3 flex-col border">
    <!-- Header -->
    <div class="bg-grey-lighter flex flex-row items-center justify-between px-3 py-2">
      <div v-for="participant in chat?.participants" class="flex items-center">
        <div v-if="participant.id != user?.id">
          <img class="h-10 w-10 rounded-full" :src="participant.profile_picture" />
        </div>
        <div class="ml-4">
          <p v-if="participant.id != user?.id" class="text-grey-darkest">
            {{ participant.name }}
          </p>
        </div>
      </div>

      <div class="flex">
        <div class="ml-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#263238"
              fill-opacity=".6"
              d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div ref="messageContainers" class="flex-1 overflow-auto bg-slate-100">
      <div class="px-3 py-2">
        <div v-for="message in messages" :key="message.id">
          <div v-if="user?.id == message.user_id" class="mb-2 flex justify-end">
            <div>
              <p class="text-purple text-right text-sm">{{ message.sender.name }}</p>
              <div
                class="rounded bg-red-300 px-3 py-2 tracking-wide"
                @click="toggleShowDate(message.id)"
              >
                <p class="mt-1 cursor-pointer text-sm">{{ message.message }}</p>
                <p v-show="currentId === message.id" class="text-grey-dark mt-1 text-right text-xs">
                  {{ formatDate(message.created_at) }} | {{ message.data.status }}
                </p>
              </div>
            </div>
          </div>

          <div v-else class="mb-2 flex">
            <div>
              <p class="text-purple text-sm">{{ message.sender.name }}</p>
              <div class="rounded bg-zinc-300 px-3 py-2" @click="toggleShowDate(message.id)">
                <p class="mt-1 cursor-pointer text-sm tracking-wide">{{ message.message }}</p>
                <p v-show="currentId === message.id" class="text-grey-dark mt-1 text-right text-xs">
                  {{ formatDate(message.created_at) }} | {{ message.data.status }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="bg-grey-lighter flex items-center px-4 py-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path
            opacity=".45"
            fill="#263238"
            d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
          ></path>
        </svg>
      </div>
      <div class="mx-4 flex-1">
        <input
          class="w-full rounded border px-2 py-2"
          type="text"
          v-model="message"
          name="message"
          @keydown.enter="onSubmit"
        />
      </div>
      <button
        @click="onSubmit"
        :disabled="isDisabled"
        :class="{ 'opacity-50': isDisabled, 'cursor-pointer': !isDisabled }"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User, Chat, Message } from '@/api/types';
import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chat';
import axios from 'axios';
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue';

const props = defineProps({
  chat_id: Number
});

const chatStore = useChatStore();
const messages = computed(() => chatStore.messages);
const chat = computed(() => chatStore.chat);

// const messages = ref<Message[]>([]);
// const chat = ref<Chat>();
const message = ref('');

// chatStore.GET_DATA(props.chat_id);

// const getData = async () => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8000/api/chat/get-chat-by-id/${props.chat_id}`
//     );
//     messages.value = response.data.messages.data;
//     chat.value = response.data.chat;
//     window.Echo.leave('chat.' + props.chat_id);
//     startWebSocket();
//   } catch (error) {
//     console.error('Error getting chat data:', error);
//   }
// };

const messageContainers = ref<HTMLElement | null>(null);
const scrollToLastMessage = () => {
  if (messageContainers.value) {
    messageContainers.value.scrollTop = messageContainers.value.scrollHeight;
  }
};

watchEffect(async () => {
  if (chat.value) {
    await nextTick();
    scrollToLastMessage();
  }
});

// formaat date of message
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const currentId = ref<null | number>(null);
const toggleShowDate = (messageId: number) => {
  currentId.value = currentId.value === messageId ? null : messageId;
};

// const startWebSocket = async () => {
//   console.log('startWebSockeHERE', props.chat_id);
//   window.Echo.private('chat.' + props.chat_id).listen('ChatMessageSent', (e: any) => {
//     messages.value.push(e.message);
//   });
// };

watchEffect(() => {
  if (props.chat_id) {
    chatStore.GET_DATA(props.chat_id);
  }
});

const isDisabled = ref(false);
const onSubmit = async () => {
  isDisabled.value = true;
  try {
    const response = await axios.post(`http://localhost:8000/api/chat/send-text-message`, {
      message: message.value,
      chat_id: props.chat_id
    });
    console.log(response);
    message.value = '';
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    isDisabled.value = false;
    scrollToLastMessage();
  }
};

const userStore = useUserStore();
const user = computed<User | null>(() => userStore.user);
onMounted(async () => {
  if (!userStore.user) {
    await userStore.GET_USER();
  }
});
</script>
