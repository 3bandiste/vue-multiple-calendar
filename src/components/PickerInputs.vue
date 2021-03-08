<template>
  <div>
    <div
      class="vfc-multiple-input"
      :class="{ 'vfc-dark': fConfigs.isDark }"
      v-if="fConfigs.isModal && fConfigs.isDateRange"
    >
      <slot
        name="dateRangeInputs"
        :startDate="dateRangeSelectedStartDate"
        :endDate="dateRangeSelectedEndDate"
        :isTypeable="fConfigs.isTypeable"
      >
        <input
          type="text"
          title="Start Date"
          :value="dateRangeSelectedStartDate"
          placeholder="Start Date"
          :readonly="!fConfigs.isTypeable"
          :maxlength="fConfigs.dateFormat.length"
        />
        <input
          type="text"
          title="End Date"
          :value="dateRangeSelectedEndDate"
          placeholder="End date"
          :readonly="!fConfigs.isTypeable"
          :maxlength="fConfigs.dateFormat.length"
        />
      </slot>
    </div>
    <div
      :class="{ 'vfc-dark': fConfigs.isDark }"
      v-else-if="fConfigs.isModal && fConfigs.isDatePicker"
    >
      <slot
        name="datePickerInput"
        :selectedDate="singleSelectedDate"
        :isTypeable="fConfigs.isTypeable"
      >
        <input
          class="vfc-single-input"
          type="text"
          title="Date"
          v-model="singleSelectedDate"
          :placeholder="fConfigs.placeholder"
          :readonly="!fConfigs.isTypeable"
          :maxlength="fConfigs.dateFormat.length"
        />
      </slot>
    </div>
    <div
      v-else-if="fConfigs.isModal && fConfigs.isMultipleDatePicker"
      class="vfc-tags-input-root"
      :class="{ 'vfc-dark': fConfigs.isDark }"
    >
      <slot name="datePickerMultipleInput">
        <div class="vfc-tags-input-wrapper-default vfc-tags-input">
          <span
            class="vfc-tags-input-badge vfc-tags-input-badge-pill vfc-tags-input-badge-selected-default"
            v-for="(date, index) in calendar.selectedDates"
            :key="index"
          >
            <span v-html="date.date"></span>
            <a
              href="#"
              class="vfc-tags-input-remove"
              @click.prevent="removeFromSelectedDates(index)"
            ></a>
          </span>

          <input
            v-model="calendar.selectedDatesItem"
            @keydown.enter.prevent="$parent.addToSelectedDates"
            type="text"
            placeholder="Add a date"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import {DateTime} from "luxon";

export default {
  name: 'PickerInputs',
  props: {
    fConfigs: {
      type: Object,
      required: true
    },
    singleSelectedDate: {
      type: String,
      required: true
    },
    calendar: {
      type: Object,
      required: true
    },
    displayFormat: {
      type: Object,
      default() {
        return DateTime.DATETIME_MED
      }
    }
  },
  computed: {
    dateRangeSelectedStartDate: {
      get() {
        return this.calendar.dateRange.start
          ? DateTime.fromISO(this.calendar.dateRange.start).toLocaleString(this.displayFormat)
          : null
      },
      set(newValue) {
        newValue = DateTime.fromISO(newValue)
        if (newValue.isValid) {
          this.calendar.dateRange.start = newValue.toISO()
        }
      }
    },
    dateRangeSelectedEndDate: {
      get() {
        return this.calendar.dateRange.end
            ? DateTime.fromISO(this.calendar.dateRange.end).toLocaleString(this.displayFormat)
            : null
      },
      set(newValue) {
        newValue = DateTime.fromISO(newValue)
        if (newValue.isValid) {
          this.calendar.dateRange.end = newValue.toISO()
        }
      }
    }
  }
}
</script>

<style scoped></style>
