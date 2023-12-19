import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import Api from '@/lib/api.js';

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export const useProfileStore = defineStore('profile', () => {
  const steamAuthUrl = computed(() => {
    return `${Api.getURL()}/profile/auth/steam?campaignId=${Api.getCampaignId()}&redirect=${
      window.location.origin
    }`;
  });

  const access_token = ref(localStorage.getItem('sataya:access_token') || false);
  const refresh_token = ref(localStorage.getItem('sataya:refresh_token') || false);

  const logout = () => {
    access_token.value = false;
    refresh_token.value = false;
    localStorage.removeItem('sataya:access_token');
    localStorage.removeItem('sataya:refresh_token');
  };

  const refreshToken = async (token) => {
    const res = await Api.post('/profile/auth/refresh', {
      refresh_token: token
    });

    if (res?.status === 200) {
      access_token.value = res.data.access_token;
      refresh_token.value = res.data.refresh_token;

      localStorage.setItem('sataya:access_token', access_token.value);
      localStorage.setItem('sataya:refresh_token', refresh_token.value);
    } else {
      logout();
    }
  };

  const profile = computed(() => {
    if (!access_token.value) return false;
    const parsed = parseJwt(access_token.value);
    return parsed.account;
  });

  const exp = computed(() => {
    if (!access_token.value) return false;
    const parsed = parseJwt(access_token.value);

    return parsed.exp;
  });

  const authCode = async (code) => {
    const res = await Api.post('/profile/auth/code', {
      code
    });

    if (res?.status === 200) {
      access_token.value = res.data.access_token;
      refresh_token.value = res.data.refresh_token;

      localStorage.setItem('sataya:access_token', access_token.value);
      localStorage.setItem('sataya:refresh_token', refresh_token.value);
    }

    return res;
  };

  const createOrder = async (cart = []) => {
    if (!access_token.value) return;

    const res = await Api.post('/profile/order', [...cart], {
      Authorization: `Bearer ${access_token.value}`
    });

    return res;
  };

  const balance = ref(0);

  const getBalance = async () => {
    if (!access_token.value) return;

    const res = await Api.get(
      '/profile/balance-total',
      {},
      {
        Authorization: `Bearer ${access_token.value}`
      }
    );

    if (res.status === 200) {
      balance.value = res.data.balance;
    }
  };

  const createPayment = async (type, amount) => {
    if (!access_token.value) return;
    const res = await Api.post(
      '/profile/payment',
      {
        type,
        amount
      },
      {
        Authorization: `Bearer ${access_token.value}`
      }
    );

    return res;
  };

  onMounted(async () => {
    if (!access_token.value) return;

    if (exp.value <= new Date().getTime() / 1000) {
      await refreshToken(refresh_token.value);
    }

    getBalance();
  });

  return {
    steamAuthUrl,
    authCode,
    profile,
    balance,
    createPayment,
    getBalance,
    logout,
    createOrder,
    refreshToken
  };
});
