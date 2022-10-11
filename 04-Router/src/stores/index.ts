import { defineStore, type Store } from 'pinia';
import { computed, reactive } from 'vue';
import { mande } from 'mande';
import { setting } from '../config/setting';

const api = mande(setting.api_base);

interface resUserLogin {
  id: string;
  username: string;
  token: string;
}

export const useStore = defineStore('store', () => {
  const loginState = reactive({
    id: '',
    username: '',
    token: '',
  });

  const isLoggedIn = computed(() => {
    return !!loginState.token;
  });

  async function login(this: Store, username: string, password: string) {
    api
      .post('login', { username: username, password: password })
      .then((res) => {
        loginState.id = (res as resUserLogin).id;
        loginState.username = (res as resUserLogin).username;
        loginState.token = (res as resUserLogin).token;
        this.router.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function logout(this: Store) {
    loginState.id = '';
    loginState.username = '';
    loginState.token = '';
    this.router.push('/');
    this.router.go(0);
  }

  return {
    loginState,
    isLoggedIn,
    login,
    logout,
  };
});
