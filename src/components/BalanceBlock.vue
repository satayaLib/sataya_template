<template>
  <div class="balance-modal">
    <h3>Пополнить баланс</h3>
    <p>Выберите платежную систему:</p>
    <div class="balance-option">
      <label for="freekassa">
        <input
          type="radio"
          name="payment"
          id="freekassa"
          value="freekassa"
          checked
          @click="payment = 'freekassa'"
        />
        <span>Freekassa (Visa, MasterCard, Btc, etc.)</span>
      </label>
    </div>
    <p>
      Минимальная сумма <br />пополнения:
      <span class="balance-icon"> {{ minimalCount }} <IconMoney /> </span>
    </p>
    <form class="balance-form" @submit.prevent="addBalance">
      <input class="modal-input" v-model="amount" />
      <button
        class="modal-btn"
        :class="submitLoader ? 'modal-btn--disabled' : ''"
        :disabled="submitLoader"
      >
        Пополнить
      </button>
      <p class="modal-error" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconMoney from '@icons/IconMoney.vue';
import { useProfileStore } from '@stores/profile';

const storeProfile = useProfileStore();

const amount = ref(100);
const minimalCount = ref(100);
const submitLoader = ref(false);
const payment = ref('freekassa');
const error = ref(false);

const addBalance = async () => {
  error.value = false;
  submitLoader.value = true;

  if (amount.value < minimalCount.value || !+amount.value) {
    error.value = `Укажите сумму больше или равную ${minimalCount.value}`;
    submitLoader.value = false;
    return;
  }

  const res = await storeProfile.createPayment(payment.value, amount.value);

  if (res.status === 200) {
    return (window.location.href = res.data.paymentUrl);
  }

  submitLoader.value = false;
  error.value = res.data.message;
};
</script>

<style lang="scss" scoped>
.balance {
  &-modal {
    max-width: rem(300px);
    margin: 0 auto;
    text-align: center;
    @include mobile {
      max-width: rem(250px);
    }
  }

  &-icon {
    display: inline-flex;
    align-items: center;

    svg {
      width: rem(20px);
      fill: map-get($theme-color, 'white');
    }
  }

  &-option {
    display: flex;
    flex-direction: column;
    padding: rem(10px) 0;

    label {
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    input {
      visibility: hidden;
      position: absolute;
      left: -1000px;

      &:checked + span {
        border-color: map-get($theme-color, 'active');
      }
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: rem(35px);
      padding: 0 rem(10px);
      font-size: rem(16px);
      border: rem(1px) solid map-get($theme-color, 'blockBorder');
      text-align: center;
      border-radius: rem(3px);
      transition:
        opacity 0.5s,
        border-color 0.5s;
      margin: rem(5px) 0;
      &:hover {
        opacity: 0.8;
      }

      @include mobile {
        font-size: rem(12px);
      }
    }
  }
}
</style>
