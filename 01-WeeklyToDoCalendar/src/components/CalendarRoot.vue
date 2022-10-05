<template>
  <div
    id="calendar-root"
    class="w-fit h-auto flex flex-col items-center sm:(flex-row items-start)"
    :style="getEventBackgroundColor">
    <div id="calendar-month" class="min-w-[12rem] mr2">
      <h1 v-if="!this.monthedit" @click="editMonth">{{ sharedState.setting.month }}</h1>
      <select
        v-if="this.monthedit"
        v-model="newMonth"
        @change="updateMonth(newMonth)"
        id="select-month"
        ref="selectMonth"
        class="bg-transparent">
        <option value="JAN">JAN</option>
        <option value="FEB">FEB</option>
        <option value="MAR">MAR</option>
        <option value="APR">APR</option>
        <option value="MAY">MAY</option>
        <option value="JUN">JUN</option>
        <option value="JUL">JUL</option>
        <option value="AUG">AUG</option>
        <option value="SEP">SEP</option>
        <option value="OCT">OCT</option>
        <option value="NOV">NOV</option>
        <option value="DEC">DEC</option>
      </select>
      <div id="week" class="flex gap2 items-center">
        <div>WEEK</div>
        <div class="px8 h8 w-[5rem] border-b-2 border-black flex items-center" @click="editWeek()">
          <span v-if="!this.weekedit">{{ sharedState.setting.week }}</span>

          <input
            type="number"
            :placeholder="parseInt(sharedState.setting.week)"
            v-if="this.weekedit"
            v-model="newWeek"
            @keyup.enter="updateWeek(sharedState.setting.week, newWeek)"
            ref="inputWeek"
            min="1"
            max="4"
            class="w-[2rem]" />
        </div>
        <div
          v-if="this.weekedit"
          @click="updateWeek(sharedState.setting.week, newWeek)"
          class="m1 i-fa-check !w3 !h3 p1 hover:cursor-pointer"></div>
      </div>
    </div>
    <div id="calendar-week">
      <CalendarDay v-for="day in sharedState.data" :key="day.id" :day="day" />
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';
import CalendarDay from './CalendarDay.vue';

export default {
  name: 'CalendarRoot',
  data() {
    return {
      sharedState: store.state,
      newWeek: '',
      newMonth: store.state.setting.month.toUpperCase(),
      weekedit: false,
      monthedit: false,
    };
  },
  computed: {
    getEventBackgroundColor() {
      const colors = ['#FF9999', '#85D6FF', '#eaff7b', '#00ffab', '#29bdc1'];
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      return `background-color: ${randomColor}`;
    },
  },
  components: {
    CalendarDay,
  },
  methods: {
    editMonth() {
      this.monthedit = true;
      this.$nextTick(() => {
        this.$refs.selectMonth.focus();
      });
    },
    updateMonth(monthUpdated) {
      this.monthedit = false;
      store.updateMonth(monthUpdated);
    },
    editWeek() {
      this.weekedit = true;
      this.$nextTick(() => {
        this.$refs.inputWeek.focus();
      });
    },
    updateWeek(weekOriginal, weekUpdated) {
      if (weekUpdated === '' || weekUpdated > 4 || weekUpdated < 1) weekUpdated = weekOriginal;
      store.updateWeek(weekUpdated);
      this.weekedit = false;
      this.newWeek = '';
    },
  },
};
</script>

<style lang="scss" scoped>
#calendar-root {
  --at-apply: 'rounded-xl m6 px8 py6 max-w-[124rem]';
}

#calendar-month {
  --at-apply: 'mb6';
  h1 {
    --at-apply: 'w48 h24 text-[5rem] leading-none text-black font-700 text-center sm:text-left uppercase mb2';
  }
  select {
    --at-apply: 'w48 h24 text-[4rem] leading-none text-black font-700 text-center sm:text-left uppercase mb2';
  }
  #week {
    --at-apply: 'text-[1.5rem] leading-loose text-black text-center sm:text-left';
  }
}

#calendar-week {
  --at-apply: 'flex-1 grid grid-cols-[repeat(1,auto)] md:grid-cols-[repeat(2,auto)] lg:grid-cols-[repeat(3,auto)] xl:grid-cols-[repeat(4,auto)] gap8';
}

input[type='number'] {
  --at-apply: 'bg-transparent text-white focus:outline-none';
  &::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
