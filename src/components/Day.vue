<template>
  <div class="vfc-day" @mousedown="$emit('mousedown', day)" @mouseup="$emit('mouseup')">
    <div v-if="startActive" class="vfc-base-start"></div>
    <div v-if="endActive" class="vfc-base-end"></div>
    <span
      v-if="!day.hideLeftAndRightDays"
      :class="getClassNames(day)"
      @click.self="$parent.$parent.clickDay(day)"
      @mouseover="dayMouseOver"
      v-tooltip="{
        content: markedDateTooltip
      }"
    >
      <slot :week="week" :day="day">{{ day.day }}</slot>
      <span v-if="timesShow" @click="clearRange" class="times">&times;</span>
      <span
        v-if="numberShow"
        @mouseover="toolTip && (onNumber = true)"
        @mouseleave="onNumber = false"
        class="number"
        >{{ getDaysNumber }}
        <div v-show="toolTip && onNumber" class="toolTip">
          {{ toolTipTxt().join('&nbsp;') }}
        </div>
      </span>
    </span>
  </div>
</template>

<script>
import dates from "../mixins/dates";
import moment from "moment"
import { VTooltip } from 'v-tooltip'
export default {
  name: 'Day',
  directives: {
    tooltip: VTooltip
  },
  props: {
    day_key: {
      type: Number,
      required: true
    },
    week: {
      type: Object,
      required: true
    },
    day: {
      type: Object,
      required: true
    },
    helpCalendar: {
      type: Object,
      required: true
    },
    fConfigs: {
      type: Object,
      required: true
    },
    calendar: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      toolTip: false,
      onNumber: false
    }
  },
  mixins: [dates],
  computed: {
    startActive() {
      if (!this.fConfigs.isMultipleDateRange)
        return (
          (this.day.isDateRangeStart || this.day.isMouseToLeft) &&
          !this.day.hideLeftAndRightDays
        )

      if (!''.inRange) this.inRangeInit()

      const inAnyRange = this.day.date.inRange(this.calendar.multipleDateRange)

      const lastElement = this.calendar.multipleDateRange[
        this.calendar.multipleDateRange.length - 1
      ]
      if (!lastElement) return inAnyRange
      const lastHasDayStart = ~this.calendar.multipleDateRange
        .map(range => range.start)
        .indexOf(this.day.date)
      const lastHasDayEnd = ~this.calendar.multipleDateRange
        .map(range => range.end)
        .indexOf(this.day.date)

      if (lastHasDayStart === lastHasDayEnd && lastHasDayEnd) return inAnyRange

      if (
        lastHasDayStart &&
        ~lastHasDayStart > -1 &&
        this.calendar.multipleDateRange[~lastHasDayStart].end
      )
        return lastHasDayStart || inAnyRange

      if (!lastElement.start && !lastElement.end) {
        return lastHasDayStart || inAnyRange
      }
      // console.log('lastElement')

      return (
        ((this.day.isDateRangeStart || this.day.isMouseToLeft) &&
          !this.day.hideLeftAndRightDays) ||
        inAnyRange
      )
    },
    endActive() {
      if (!this.fConfigs.isMultipleDateRange)
        return (
          (this.day.isDateRangeEnd || this.day.isMouseToRight) &&
          !this.day.hideLeftAndRightDays
        )

      if (!''.inRange) this.inRangeInit()

      const inAnyRange = this.day.date.inRange(this.calendar.multipleDateRange)

      const lastElement = this.calendar.multipleDateRange[
        this.calendar.multipleDateRange.length - 1
      ]
      if (!lastElement) return inAnyRange

      const lastHasDayStart = ~this.calendar.multipleDateRange
        .map(range => range.start)
        .indexOf(this.day.date)
      const lastHasDayEnd = ~this.calendar.multipleDateRange
        .map(range => range.end)
        .indexOf(this.day.date)

      if (lastHasDayStart === lastHasDayEnd && lastHasDayEnd) return inAnyRange

      if (lastHasDayEnd) return true

      if (!lastElement.start && !lastElement.end) {
        if (lastElement.start === lastElement.end) return false
        return lastHasDayEnd
      }
      return (
        ((this.day.isDateRangeEnd || this.day.isMouseToRight) &&
          !this.day.hideLeftAndRightDays) ||
        inAnyRange
      )
    },
    numberShow() {
      if (!this.fConfigs.isMultipleDateRange) return false

      let endPos = this.calendar.multipleDateRange
        .map(range => range.end)
        .indexOf(this.day.date)

      return !!(~endPos ||
        ~this.calendar.multipleDateRange
          .map(range => range.start)
          .indexOf(this.day.date));
    },
    timesShow() {
      let res = this.calendar.multipleDateRange
        ? ~this.calendar.multipleDateRange
            .map(range => range.end)
            .indexOf(this.day.date)
        : -1
      return this.fConfigs.isMultipleDateRange && res
    },
    getDaysNumber() {
      const endPosFirst = this.calendar.multipleDateRange
        .map(range => range.end)
        .indexOf(this.day.date)
      const startPosFirst = this.calendar.multipleDateRange
        .map(range => range.start)
        .indexOf(this.day.date)
      const endPosLast = this.calendar.multipleDateRange
        .map(range => range.end)
        .lastIndexOf(this.day.date)
      const startPosLast = this.calendar.multipleDateRange
        .map(range => range.start)
        .lastIndexOf(this.day.date)

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.toolTip =
        endPosFirst !== endPosLast ||
        startPosFirst !== startPosLast ||
        (endPosFirst > -1 && startPosFirst > -1) ||
        (startPosFirst > -1 && endPosFirst > -1)

      if (this.toolTip) {
        return '·'
      }

      return (endPosFirst > -1 ? Number(endPosFirst) : 0) || startPosFirst
    },
    markedDateTooltip() {
      try {
        return this.day.markedDateData.tooltip
      } catch (e) {
        console.log('markedDateData: ', this.day.markedDateData)
        return null
      }
    }
  },
  methods: {
    toolTipTxt() {
      const numbers = []
      const endArr = this.calendar.multipleDateRange.map(range => range.end)
      const startArr = this.calendar.multipleDateRange.map(range => range.start)
      let endIndex = 0
      let startIndex = 0
      let ind = endArr.indexOf(this.day.date, endIndex)
      while (~endArr.indexOf(this.day.date, endIndex)) {
        ind = endArr.indexOf(this.day.date, endIndex)

        numbers.push(ind)
        endIndex = ind + 1
      }
      ind = startArr.indexOf(this.day.date, startIndex)
      while (~startArr.indexOf(this.day.date, startIndex)) {
        ind = startArr.indexOf(this.day.date, startIndex)

        numbers.push(ind)
        startIndex = ind + 1
      }
      return numbers.sort((a, b) => a - b)
    },
    inRangeInit() {
      //!!!!\\
      const helpCalendar = this.helpCalendar
      String.prototype.inRange = function(arr) {
        let res = false
        arr.forEach(el => {
          const start = +helpCalendar.getDateFromFormat(el.start.split(' ')[0])
          const end = +helpCalendar.getDateFromFormat(el.end.split(' ')[0])
          const current = +helpCalendar.getDateFromFormat(this.split(' ')[0])
          if (start === end) return
          if (start && end) res = res || (start < current && current < end)
        })
        return res
      }
      //!!!!\\
    },

    clearRange() {
      //$emit
      const removeIndex = this.calendar.multipleDateRange.findIndex(
        range => range.end === this.day.date
      )
      this.calendar.multipleDateRange.splice(removeIndex, 1)
    },
    dayMouseOver() {
      this.$emit('dayMouseOver', this.day)
    },
    hasSlot(name = 'default') {
      return (
        !!this.$parent.$parent.$slots[name] ||
        !!this.$parent.$parent.$scopedSlots[name]
      )
    },
    getClassNames(day) {
      let classes = []

      if (!this.hasSlot('default')) {
        classes.push('vfc-span-day')
      }
      let date = this.helpCalendar.getDateFromFormat(day.date)
      // Disable days of week if set in configuration
      let dateDay = date.getDay()
      const isDayDisabled = this.fConfigs.disabledDays.includes(dateDay)
      if (isDayDisabled) {
        day.hide = true
        classes.push('vfc-cursor-not-allowed')
        classes.push('vfc-hide')
      }
      // Disabled dates
      if (this.isDisabledDate(day.date)) {
        classes.push('vfc-disabled')
        classes.push('vfc-cursor-not-allowed')
      }

      if (this.fConfigs.limits) {
        let disabled = false
        if (this.fConfigs.limits.min) {
          let min = moment(this.fConfigs.limits.min, this.helpCalendar.dateFormat)
          if (min.isValid() && day.moment.isBefore(min, 'day')) disabled = true
        }
        if (this.fConfigs.limits.max) {
          if (this.fConfigs.limits.max) {
            let max = moment(this.fConfigs.limits.max, this.helpCalendar.dateFormat)
            if (max.isValid() && day.moment.isAfter(max, 'day')) disabled = true
          }
        }

        if (disabled) {
          classes.push('vfc-disabled')
          classes.push('vfc-cursor-not-allowed')
        }
      }

      // Today date
      if (day.isToday) {
        classes.push('vfc-today')
      }
      if (day.markedDateData.class) {
        classes.push(day.markedDateData.class)
      }
      if (
        !day.hideLeftAndRightDays &&
        !isDayDisabled
      ) {
        // Mark Date
        if (day.isMarked) {
          classes.push('vfc-marked')
        } else if (day.isHovered) {
          classes.push('vfc-hovered')
        }
        if (this.fConfigs.markedDates.includes(day.date)) {
          classes.push('vfc-borderd')
        }

        if (Array.isArray(this.fConfigs.markedDateRange)) {
          this.fConfigs.markedDateRange.forEach(range => {
            if (
              this.helpCalendar.getDateFromFormat(range.start) <=
                this.helpCalendar.getDateFromFormat(day.date) &&
              this.helpCalendar.getDateFromFormat(range.end) >=
                this.helpCalendar.getDateFromFormat(day.date)
            ) {
              classes.push('vfc-marked')
            }
            if (day.date === range.start) {
              classes.push('vfc-start-marked')
            } else if (day.date === range.end) {
              classes.push('vfc-end-marked')
            }
          })
        } else if (
          this.fConfigs.markedDateRange.start &&
          this.fConfigs.markedDateRange.end
        ) {
          // Date Range Marked

          if (
            this.helpCalendar.getDateFromFormat(
              this.fConfigs.markedDateRange.start
            ) <= this.helpCalendar.getDateFromFormat(day.date) &&
            this.helpCalendar.getDateFromFormat(
              this.fConfigs.markedDateRange.end
            ) >= this.helpCalendar.getDateFromFormat(day.date)
          ) {
            classes.push('vfc-marked')
          }
          if (day.date === this.fConfigs.markedDateRange.start) {
            classes.push('vfc-start-marked')
          } else if (day.date === this.fConfigs.markedDateRange.end) {
            classes.push('vfc-end-marked')
          }
        } else {
          // Only After Start Marked
          if (this.fConfigs.markedDateRange.start) {
            if (
              this.helpCalendar.getDateFromFormat(
                this.fConfigs.markedDateRange.start
              ) <= this.helpCalendar.getDateFromFormat(day.date)
            )
              classes.push('vfc-marked')
          }

          // Only Before End Marked
          if (this.fConfigs.markedDateRange.end) {
            if (
              this.helpCalendar.getDateFromFormat(
                this.fConfigs.markedDateRange.end
              ) >= this.helpCalendar.getDateFromFormat(day.date)
            )
              classes.push('vfc-marked')
          }
        }

        classes.push('vfc-hover')
      }
      //Date Multiple Range
      if (this.fConfigs.isMultipleDateRange) {
        if (!''.inRange) this.inRangeInit()
        if (
          day.isMarked ||
          ~this.calendar.multipleDateRange
            .map(range => range.start.split(' ')[0])
            .indexOf(day.date) ||
          ~this.calendar.multipleDateRange
            .map(range => range.end.split(' ')[0])
            .indexOf(day.date) ||
          day.date.inRange(this.calendar.multipleDateRange)
        ) {
          classes.push('vfc-marked')
        }
        // } else if (day.isHovered) {
        // classes.push('vfc-hovered')
        // }
        if (this.fConfigs.markedDates.includes(day.date)) {
          classes.push('vfc-borderd')
        }
        // console.log(
        //   ~this.calendar.multipleDateRange
        //     .map(range => range.start)
        //     .indexOf(day.date)
        // )
        if (
          ~this.calendar.multipleDateRange
            .map(range => range.start.split(' ')[0])
            .indexOf(day.date)
        ) {
          classes.push('vfc-start-marked')
        }

        if (
          ~this.calendar.multipleDateRange
            .map(range => range.end.split(' ')[0])
            .indexOf(day.date)
        ) {
          classes.push('vfc-end-marked')
        }
      }
      // Date Mark With Custom Classes
      if (typeof this.fConfigs.markedDates === 'object') {
        let checkMarked = this.fConfigs.markedDates.find(markDate => {
          return day.moment.isSame(markDate, 'day')
        })

        if (typeof checkMarked !== 'undefined') {
          classes.push(checkMarked.class)
        }
      }
      if (this.calendar.dateRange) {
        if (day.date === this.calendar.dateRange.start.split(' ')[0]) {
          classes.push('vfc-start-marked')
        }

        if (day.date === this.calendar.dateRange.end.split(' ')[0]) {
          classes.push('vfc-end-marked')
        }
      }

      if (
        day.moment.isSame(this.calendar.selectedDate, 'day') ||
        (Array.isArray(this.calendar.selectedDates) &&
          this.calendar.selectedDates.find(sDate => day.moment.isSame(sDate, 'day'))
      )) {
        classes.push('vfc-borderd')
      }

      return classes
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/tooltip.scss';
</style>
<style scoped lang="scss">
.vfc-day {
  position: relative;
  .times {
    position: absolute;
    top: -5px;
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 15px;
    z-index: 20;
    height: 15px;
    line-height: 15px;
    &:hover {
      cursor: pointer;
      background-color: rgb(199, 0, 0);
    }
  }
  .number {
    position: absolute;
    top: -5px;
    right: calc(50% + 7px);
    background-color: green;
    color: white;
    font-size: 10px;
    border-radius: 50%;
    width: 15px;
    z-index: 30;
    height: 15px;
    line-height: 15px;
    &:hover {
      background-color: rgb(0, 94, 0);
    }
  }
  .toolTip {
    position: absolute;
    top: -20px;
    left: 0;
    padding: 5px;
    max-width: 108px;
    word-wrap: break-word;
    border-radius: 5px;
    z-index: 200;
    background-color: rgb(0, 94, 0);
  }
}
</style>
