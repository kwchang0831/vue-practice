<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useStore } from '@/stores';
const state = useStore();
</script>

<template>
  <div class="flex flex-col min-h-100vh">
    <header>
      <nav>
        <RouterLink v-if="state.isLoggedIn" to="/">Home</RouterLink>
        <RouterLink v-if="state.isLoggedIn" to="/about">About</RouterLink>
        <a v-if="state.isLoggedIn" @click="state.logout()">Logout</a>
        <RouterLink v-if="!state.isLoggedIn" to="/login">Login</RouterLink>
      </nav>
    </header>

    <main class="flex-1 relative">
      <RouterView v-slot="{ Component }">
        <Transition :name="'scale-slide'">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style lang="scss">
nav {
  --at-apply: 'flex gap2 p4';

  a {
    --at-apply: 'p2 border-1 border-black rounded-2xl text-xl  transition transform ease-in-out duration-300';

    &.router-link-exact-active {
      --at-apply: 'font900 text-white bg-black';
    }

    &:hover {
      --at-apply: 'cursor-pointer scale-105';
    }
  }
}

.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}

.scale-slide-enter-from {
  left: -100%;
}

.scale-slide-enter-to {
  left: 0%;
}

.scale-slide-leave-from {
  transform: scale(1);
}

.scale-slide-leave-to {
  transform: scale(0.8);
}
</style>
