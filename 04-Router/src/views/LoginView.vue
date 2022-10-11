<script setup lang="ts">
import { useStore } from '@/stores';
const state = useStore();

let userName: string;
let userPassowrd: string;
</script>

<template>
  <main class="w-full h-full bg-orange absolute top-0 right-0">
    <h1>LOGIN</h1>
    <form @submit.prevent="state.login(userName, userPassowrd)">
      <input type="text" required v-model="userName" placeholder="username: admin" />
      <input type="password" required v-model="userPassowrd" placeholder="passowrd: admin" />
      <button type="submit">Login</button>
    </form>
  </main>
</template>

<style lang="scss" scoped>
main {
  --at-apply: 'flex flex-col justify-center items-center gap4';

  h1 {
    --at-apply: 'text-2xl font700';
  }

  form {
    --at-apply: 'flex flex-col gap2 items-center justify-center';
    input {
      --at-apply: 'border-1 border-black px2 py1 rounded text-xl';
    }
    button {
      --at-apply: 'bg-black text-white p2 rounded text-xl transition transform ease-in-out duration-300';
      &:hover {
        --at-apply: 'scale-105';
      }
    }
  }
}
</style>
