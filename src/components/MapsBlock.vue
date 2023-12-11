<template>
  <section class="maps" id="maps">
    <h2>Наши сервера</h2>
    <div class="maps-filter" v-if="storeClusters.items.length > 0">
      <template v-for="item in storeClusters.items" :key="item.id">
        <button
          class="maps-filter__item"
          @click="loadMap(item)"
          :class="{ active: activeCluster.id === item.id }"
        >
          {{ item.name }}
        </button>
      </template>
    </div>
    <div
      class="maps-container"
      :class="
        !storeMaps.isLoaded || !storePlayers.isLoaded || !storeMaps.isLoaded ? 'maps--loading' : ''
      "
    >
      <div class="maps-items">
        <div class="maps-row maps-row--nothover">
          <div class="maps-col"><strong>Карта</strong></div>
          <div class="maps-col"><strong>Подключиться</strong></div>
          <div class="maps-col"><strong>Игроки</strong></div>
        </div>
        <div
          class="maps-row"
          v-for="item in storeMaps.items"
          :key="item.id"
          @mouseover="activeMap = item"
          :class="{ active: activeMap?.mapName === item.mapName }"
        >
          <div class="maps-col">{{ item.mapName }}</div>
          <div class="maps-col">{{ item.ip }}:{{ item.port }}</div>
          <div class="maps-col maps-count">
            <template v-if="storePlayers.isLoaded">
              {{ storePlayers.players[item.id] }} / {{ item.maxPlayers }}
            </template>
          </div>
        </div>
      </div>
      <div class="maps-block">
        <div class="maps-row maps-row--nothover">
          <div class="maps-col maps-col-3">
            <strong>Изображение карты</strong>
            <span v-if="activeMap?.mapName">: {{ activeMap.mapName }}</span>
          </div>
        </div>
        <div class="maps-row maps-image maps-row--nothover">
          <div class="maps-image" :class="{ 'maps-image--notmods': activeCluster.mods === '' }">
            <div class="maps-image--mods" v-if="activeCluster.mods !== ''">
              <a class="maps-btn" :href="activeCluster.mods" target="_blank"> Коллекция модов </a>
            </div>
            <img src="@assets/logo.png" alt="sataya" v-if="!mapsImage?.[activeMap.mapName]" />
            <img
              :src="mapsImage[activeMap.mapName]"
              :alt="activeMap.mapName"
              v-if="mapsImage?.[activeMap.mapName]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useClustersStore } from '@stores/clusters';
import { useMapsStore } from '@stores/maps';
import { usePlayersStore } from '@stores/players';

const storeClusters = useClustersStore();
const storeMaps = useMapsStore();
const storePlayers = usePlayersStore();

const activeCluster = ref(false);
const activeMap = ref(false);

onMounted(async () => {
  await storeClusters.load();
  loadMap(storeClusters.items[0]);
});

const mapsImage = reactive({
  TheIsland: 'https://cdn.sataya.ru/maps/TheIsland.jpg',
  Genesis: 'https://cdn.sataya.ru/maps/Genesis_Part_1.jpg',
  Gen2: 'https://cdn.sataya.ru/maps/Genesis_Part_2.jpg',
  Ragnarok: 'https://cdn.sataya.ru/maps/Ragnarok.jpg',
  Extinction: 'https://cdn.sataya.ru/maps/Extinction.jpg',
  ScorchedEarth: 'https://cdn.sataya.ru/maps/ScorchedEarth_P.jpg',
  Aberration: 'https://cdn.sataya.ru/maps/Aberration.jpg',
  CrystalIsles: 'https://cdn.sataya.ru/maps/CrystalIsles.jpg',
  Valguero: 'https://cdn.sataya.ru/maps/Valguero_P.jpg',
  TheCenter: 'https://cdn.sataya.ru/maps/TheCenter.jpg',
  LostIsland: 'https://cdn.sataya.ru/maps/LostIsland.jpg'
});

const loadMap = (cluster) => {
  activeCluster.value = cluster;
  activeMap.value = false;
  storeMaps.load(cluster.id);
  storePlayers.load(cluster.id);
};
</script>

<style lang="scss" scope>
.maps {
  @include container;
  padding: rem(15px) 0;
  color: map-get($theme-color, 'white');

  &--loading {
    position: relative;
    color: transparent !important;
    border-radius: rem(10px);
    overflow: hidden;

    &::before,
    &::after {
      content: '';
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      position: absolute;
      margin: auto;
    }
    &::before {
      z-index: 100;
      background: transparentize(map-get($theme-color, 'block'), 0.1);
    }
  }

  h2 {
    padding: rem(20px) 0;
    margin: 0;
    font-size: rem(37px);
    font-weight: 900;
    text-transform: uppercase;
    color: map-get($theme-color, 'white');
    text-align: center;

    @include mobile {
      font-size: rem(20px);
      letter-spacing: 0.6;
      padding: rem(10px) 0;
    }
  }

  &-filter {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: rem(10px) 0;
    gap: rem(10px);

    @include mobile {
      padding: rem(10px) 0;
    }

    &__item {
      position: relative;
      height: rem(40px);
      max-width: rem(200px);
      padding: 0 rem(20px);
      border-radius: rem(5px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      text-overflow: ellipsis;

      font-size: rem(20px);
      line-height: 1;
      font-weight: 900;
      color: map-get($theme-color, 'white');
      text-shadow: $text-shadow;
      border: rem(1px) solid map-get($theme-color, 'active');
      text-decoration: none;
      background: $bg-circle;
      transition:
        background-color 0.5s,
        border-color 0.5s;

      cursor: pointer;

      &:hover,
      &.active {
        background: darken(map-get($theme-color, 'active'), 20%);
        border-color: lighten(map-get($theme-color, 'active'), 50%);
      }

      @include mobile {
        padding: 0 rem(10px);
        font-size: rem(12px);
        max-width: rem(110px);
        height: rem(30px);
      }
    }
  }

  &-container {
    display: grid;
    grid-template-columns: 50% 50%;
    background: map-get($theme-color, 'block');
    border: rem(1px) solid map-get($theme-color, 'blockBorder');
    border-radius: rem(10px);
    color: map-get($theme-color, 'white');
    font-size: rem(16px);
    margin-top: rem(20px);

    @include mobile {
      grid-template-columns: 100%;
      font-size: rem(15px);
      margin-top: rem(10px);
    }
  }

  &-row {
    width: 100%;
    display: grid;
    grid-template-columns: 25% 50% 25%;
    transition: background-color 0.5s;

    @include mobile {
      grid-template-columns: 40% 60%;
      font-size: rem(13px);
    }

    &:first-child > div {
      @include mobile {
        padding: 1rem 0;
        line-height: 1;
        text-align: center;
      }
    }

    &:last-child > div {
      border: none;
    }

    &:hover,
    &.active {
      background-color: rgba(map-get($theme-color, 'active'), 25%);
    }

    &--nothover:hover,
    &--nothover.active {
      background: none !important;
    }
  }

  &-col {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: rem(1px) solid map-get($theme-color, 'blockBorder');
    line-height: rem(48px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &-3 {
      grid-column: span 3;
    }

    &:last-of-type {
      @include mobile {
        display: none;
      }
    }
  }

  &-block {
    display: flex;
    flex-direction: column;

    @include mobile {
      display: none;
    }
  }

  &-image {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    border-left: rem(1px) solid map-get($theme-color, 'blockBorder');
    min-height: rem(490px);

    &--mods {
      margin-bottom: rem(10px);
      text-align: center;
      padding: rem(10px 0);
    }

    &--notmods {
      justify-content: center;
    }

    img {
      width: 100%;
      max-width: rem(470px);
      display: block;
      padding: rem(10px) 0;
    }
  }

  &-count {
    transition: color 0.5s;

    @at-root .maps-row:hover & {
      color: map-get($theme-color, 'green');
    }
  }

  strong {
    font-weight: normal;
    font-size: rem(18px);

    @include mobile {
      font-size: rem(15px);
      white-space: normal;
    }
  }

  a {
    color: inherit;
    transition: color 0.5s;
    &:hover {
      color: map-get($theme-color, 'active');
    }
  }

  &-btn {
    text-decoration: none;
    line-height: rem(36px);
    border-radius: rem(5px);
    font-size: rem(14.5px);
    min-width: 80%;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    background: lighten(map-get($theme-color, 'active'), 5);
    display: inline-block;
    margin-top: rem(20px);
    padding: 0 rem(20px);
    color: inherit;
    cursor: pointer;
    transition: background-color 0.5s;
    color: map-get($theme-color, 'white') !important;

    &:hover {
      background: map-get($theme-color, 'active');
    }
  }
}
</style>
