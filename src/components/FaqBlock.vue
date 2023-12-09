<template>
  <div class="faq" id="faq">
    <div class="faq-container">
      <h2>Часто задаваемые вопросы</h2>
      <div class="faq-wrapper">
        <div class="faq-question" @click="open">
          <h3>Наши конфигурации</h3>
          <IconArrow />
        </div>
        <div class="faq-answer">
          <p>
            CPU: Intel Xeon W-2145 <br />
            Memory: 256 ГБ DDR4 <br />
            SSD: 2 x 1.92 TB NVMe (RAID 1)
          </p>
          <p>Бекапы сервера происходят каждые 30 минут. Мы дорожим вашим прогрессом игры.</p>
          <p>Хранение бекапов сервера - последние 15 дней.</p>
        </div>
        <div class="faq-question" @click="open">
          <h3>Какие настройки сервера?</h3>
          <IconArrow />
        </div>
        <div class="faq-answer">
          <p>
            - Уровень сложности: максимальный;<br />
            - Множитель сбора ресурсов: 3Х;<br />
            - Множитель опыта: 2Х;<br />
            - Множитель приручения существ: 2Х;<br />
            - Множитель времени инкубации существ: 3х;<br />
            - Множитель роста существ: 3Х;<br />
            - Качество лута в контейнерах/рыбалке - 2Х;<br />
            - Множитель шестиугольников Genesis ( Part 1, Part 2) - 2Х;<br />
            - Отображение нанесённого урона: включено;<br />
            - Игнорирование коллизий: включено;<br />
            - Параметр gamma: включен;<br />
            - Прицел: включен;<br />
            - Вид от 3-го лица: включен;<br />
            - Урон по своим: включен;<br />
            - Отображение местоположения на карте: включено;<br />
            - Отображение места смерти: включено;<br />
            - Любой соплеменник может проявить заботу о детеныше: включено;<br />
            - Длительность суток (дня/ночи): стандарт;<br />
            - Получение тек сета на Gen 2 – включено;<br />
            - Использование тек сета на Genesis 1 – выключено;<br />
            - Застройка зон миссий на Genesis 1 – запрещено;
          </p>
          <p>Множители на время ивентов могут быть изменены администрацией сервера.</p>
        </div>
        <div class="faq-question" @click="open">
          <h3>Что такое таймер на разрушение/клеймление?</h3>
          <IconArrow />
        </div>
        <div class="faq-answer">
          <p>
            Если владелец постройки не появляется в прорисовке (в сети), то их можно будет разрушить
            через:<br />
            - Солома - 8 дней<br />
            - Дерево - 16 дня<br />
            - Камень - 24 дней<br />
            - Металл - 32 дней<br />
            - Тек - 40 дней
          </p>
          <p>
            Если владелец дино не появляется в прорисовке (в сети), то их можно будет заклеймить
            через:<br />
            - 35 дней
          </p>
        </div>
        <div class="faq-question" @click="open">
          <h3>Что такое кристаллы?</h3>
          <IconArrow />
        </div>
        <div class="faq-answer">
          <p>
            Кристаллы — это система поощрения игроков за активное участие в жизни игровых серверов.
          </p>
        </div>
        <div class="faq-question" @click="open">
          <h3>Как получить кристаллы?</h3>
          <IconArrow />
        </div>
        <div class="faq-answer">
          <p>
            1. за онлайн (1 час = от 2 кристаллов) <br />
            2. за активное участие в событиях сервера (конкурсы)<br />
            3. за материальную поддержку нашего проекта <br />
            4. за помощь администрации - мы поощряем предложения по развитию сервера
          </p>
        </div>
        <div class="faq-question" @click="open">
          <h3>Какие есть быстрые команды игрока?</h3>
          <IconArrow />
        </div>
        <div class="faq-answer">
          <p>
            В чате игры есть быстрые команды:<br />
            /auth - получить код для авторизации на сайте<br />
            /balance - узнать свой баланс<br />
            /kit - получить кит-набор (бесплатно, не ограниченно)<br />
            /kitdino - получить дино-набор (бесплатно, единоразово)<br />
            /killme - убить себя<br />
            /set1 - сохранить координаты для быстрого телепорта в первую ячейку<br />
            /tp1 - телепортирует игрока по сохраненным координатам из первой ячейки<br />
            /set2 - сохранить координаты для быстрого телепорта во вторую ячейку<br />
            /tp2 - телепортирует игрока по сохраненным координатам из второй ячейки<br />
            /set3 - сохранить координаты для быстрого телепорта в третью ячейку<br />
            /tp3 - телепортирует игрока по сохраненным координатам из третьей ячейки
          </p>
        </div>
        <div class="faq-question" @click="open">
          <h3>Зачем нужно авторизироваться на сайте?</h3>
          <IconArrow />
        </div>
        <div class="faq-answer">
          <p>
            На сайте необходимо авторизоваться через Steam для идентификации Вас в игровом мире для
            возможности выдачи заказаных Вами товаров за кристаллы.
          </p>
          <p>
            Так же есть возможность авторизироваться на сайте через код, который можно получить,
            введя в игровом чате: /auth
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconArrow from '@icons/IconArrow.vue';

const open = (e) => {
  e.currentTarget.classList.toggle('faq-question--active');
};
</script>

<style lang="scss" scope>
.faq {
  padding: rem(150px) 0 rem(20px) 0;
  color: map-get($theme-color, 'white');

  @include mobile {
    padding: rem(10px) 0;
  }

  &-container {
    @include container;

    position: relative;
    &:before {
      content: '';
      width: rem(556px);
      height: rem(559px);
      background: url(@assets/faq-bg.png) no-repeat center center/contain;
      position: absolute;
      left: rem(-370px);
      top: rem(-340px);
      z-index: 1;

      @include mobile {
        display: none;
      }
    }
  }

  h2 {
    padding: rem(10px) 0;
    margin: 0;
    font-size: rem(37px);
    font-weight: 900;
    text-transform: uppercase;
    text-align: center;

    @include mobile {
      font-size: rem(20px);
      letter-spacing: rem(0.6px);
    }
  }

  &-wrapper {
    margin: rem(50px) 0;
    border-bottom: rem(1px) solid transparentize(map-get($theme-color, 'light'), 0.5);
    position: relative;
    z-index: 2;

    @include mobile {
      margin: rem(10px) 0;
    }
  }

  &-question {
    padding: rem(20px) 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: rem(1px) solid transparentize(map-get($theme-color, 'light'), 0.5);
    cursor: pointer;

    &:hover {
      h3 {
        color: map-get($theme-color, 'active');
      }

      svg {
        fill: map-get($theme-color, 'active');
      }
    }

    h3 {
      font-size: rem(24px);
      margin: 0;
      padding: 0;
      text-transform: uppercase;
      transition: color 0.5s;

      @include mobile {
        font-size: rem(16px);
        letter-spacing: rem(0.48px);
      }
    }

    svg {
      width: rem(25px);
      height: rem(25px);
      fill: map-get($theme-color, 'white');
      transform: rotate(90deg);
      margin: 0 rem(30px);
      transition: fill 0.5s;

      @include mobile {
        width: rem(15px);
        height: rem(15px);
        margin-right: rem(10px);
      }
    }

    & + div {
      display: none;
    }

    &--active {
      padding-bottom: 0;

      h3 {
        color: map-get($theme-color, 'active');
      }
      svg {
        transform: rotate(-90deg);
      }
      & + div {
        display: block;
      }
    }
  }

  &-answer {
    font-size: rem(18px);
    line-height: 1.4;

    @include mobile {
      font-size: rem(14px);

      p {
        margin: rem(10px) 0;
      }
    }

    a {
      color: map-get($theme-color, 'white');
      transition: color 0.5s;
      &:hover {
        color: map-get($theme-color, 'active');
      }
    }
  }
}
</style>
