<template>
  <div>
    <div style="background: grey; padding: 25px;">
      <h1>Date & time Picker with America/Anchorage TZ</h1>
      <div style="display: flex; justify-content: space-around">
        <functional-calendar
            :is-separately="true"
            :change-month-function="true"
            :change-year-function="true"
            :changeYearStep="1"
            :is-multiple="true"
            :is-date-picker="true"
            :is-multiple-date-picker="false"
            :is-date-range="false"
            :with-time-picker="true"
            :calendars-count="2"
            :is-modal="true"
            v-model="calendarWithTimePicker"
            :click-and-swipe-selection="false"
            date-format="YYYY-MM-DDTHH:mm:ss[Z]"
            :limits="{min: '2021-02-11', max: '2022-01-01'}"
            :marked-dates="markedDates"
            :disabled-dates="disabledDates"
            timezone="America/Anchorage"
            :display-format="DateTime.DATETIME_FULL"
        ></functional-calendar>
      </div>

    </div>
    <div style="background: white; padding: 25px">
      <h1>Date picker multiple</h1>
      <functional-calendar
          :is-separately="true"
          :change-month-function="true"
          :change-year-function="true"
          :changeYearStep="1"
          :is-multiple="false"
          :is-date-picker="false"
          :is-multiple-date-picker="true"
          with-time-picker
          :calendars-count="2"
          :is-modal="false"
          v-model="calendarData"
          :click-and-swipe-selection="true"
          date-format="YYYY-MM-DDTHH:mm:ss[Z]"
          :disabled-days="disabledDays"
          :limits="{min: '2021-02-11', max: '2022-01-01'}"
          :marked-dates="markedDates"
          :disabled-dates="disabledDates"
      ></functional-calendar>
    </div>
    <div style="background: grey; padding: 25px;">
      <h1>Range Pickers</h1>
      <div style="display: flex; justify-content: space-around">
        <functional-calendar
            :is-separately="true"
            :change-month-function="true"
            :change-year-function="true"
            :changeYearStep="1"
            :is-multiple="true"
            :is-date-picker="false"
            :is-multiple-date-picker="false"
            :is-date-range="true"
            :with-time-picker="false"
            :calendars-count="2"
            :is-modal="true"
            :is-typeable="false"
            v-model="calendar2Data"
            :click-and-swipe-selection="false"
            date-format="YYYY-MM-DDTHH:mm:ss[Z]"
            :limits="{min: '2021-02-11', max: '2022-01-01'}"
            :marked-dates="markedDates"
            :disabled-dates="disabledDates"
        ></functional-calendar>
        <functional-calendar
            locale="ru"
            :is-separately="true"
            :change-month-function="true"
            :change-year-function="true"
            :changeYearStep="1"
            :is-multiple="true"
            :is-date-picker="false"
            :is-multiple-date-picker="false"
            :is-date-range="true"
            :with-time-picker="false"
            :calendars-count="2"
            :is-modal="false"
            v-model="calendar2Data"
            :click-and-swipe-selection="false"
            date-format="YYYY-MM-DDTHH:mm:ss[Z]"
            :limits="{min: '2021-02-11', max: '2022-01-01'}"
            :marked-dates="markedDates"
            :disabled-dates="disabledDates"
        ></functional-calendar>
      </div>

    </div>
  </div>
</template>

<script>
import { FunctionalCalendar } from '../index'
import { DateTime } from 'luxon'
/* eslint-disable */
export default {
  components: { FunctionalCalendar },
  data() {
    return {
      disabledDays: [6,7], // Sunday and saturday
      rangesData: {
        multipleDateRange: [{ end: '17/7/2020', start: '3/7/2020' }]
      },
      demoCalendar1: {
        dateRange: {
          start: '20/5/2020',
          end: '25/5/2020'
        }
        // selectedDate: '26/5/2020'
      },
      events: [
        {
          id: 1,
          title: 'Meeting with new client',
          date: '18/4/2020',
          class: 'has-background-color1'
        },
        {
          id: 2,
          title: 'Meeting with new client',
          date: '24/4/2020',
          class: 'has-background-color2'
        },
        {
          id: 3,
          title: 'Meeting with new client 2',
          date: '24/4/2020',
          class: 'has-background-color3'
        },
        {
          id: 4,
          title: 'Meeting with new client 3',
          date: '24/4/2020',
          class: 'has-background-color4'
        }
      ],
      calendarData: {},
      calendar2Data: {},
      calendarWithTimePicker: {},
      markedDates: [
        {
          date: '2021-02-12',
          class: 'rol-highlight',
          tooltip: 'ceci est un tooltip'
        }
      ],
      markedDates2: [],
      disabledDates: ['2021-02-24'],
      enabledDates: ['27/10/2020', '28/10/2020'],
      calendarConfigs: {
        isMultipleDatePicker: true,
        dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
      }
    }
  },
  computed: {
    DateTime() {
      return DateTime
    }
  },
  methods: {
    test() {
      console.log(this.$refs.demoCalendar1.rangeIsSelected)
    },
    eventItemHover(event) {
      console.log(event.date, event.title)
    },
    dayClicked(item) {
      console.log('clicked:' + JSON.stringify(item))
    },
    getEventsByDate(date) {
      return this.events.filter(event => event.date === date)
    },
    get(val) {
      console.log(val)
    },
    opened() {
      console.log('open')
    },
    closed() {
      console.log('close')
    },
    changedMonth(value) {
      console.log(value)
    },
    choseDay(day) {
      console.log(day)
    },
    preYear() {
      this.$refs.calendar.ChooseDate('10/10/2020')
    },
    nextYear() {
      this.$refs.calendar.NextYear()
    },
    preMonth() {
      this.$refs.calendar.PreMonth()
    },
    nextMonth() {
      this.$refs.calendar.NextMonth()
    }
  }
}
</script>

<style lang="scss">
$color1: rgba(38, 109, 211, 1);
$color2: rgba(52, 64, 85, 1);
$color3: rgba(136, 128, 152, 1);
$color4: rgba(207, 179, 205, 1);
$color5: rgba(223, 194, 242, 1);
$color6: rgb(208, 217, 208);

html,
body {
  background-color: #000;
  padding: 0;
  margin: 0;
}

.demo-calendar {
  width: 600px;
  margin: 100px;

  &.dateRangeInputs {
    label {
      position: relative;
      display: inline-flex;
      align-items: center;

      svg {
        position: absolute;
        width: 16px;
        left: 5px;
      }

      input {
        border-radius: unset;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin: 0 5px 5px 0;

    .button {
      background-color: #4caf50; /* Green */
      border: none;
      color: white;
      padding: 5px 27px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;

      &:hover {
        cursor: pointer;
        -moz-box-shadow: inset 0 0 10px #436562;
        -webkit-box-shadow: inset 0 0 10px #436562;
        box-shadow: inset 0 0 10px #436562;
      }

      &.is-blue {
        background-color: #008cba;
      }
    }
  }
}

.demo-custom-calendar {
  width: 800px;
  margin: 100px;

  .vfc-main-container {
    .vfc-calendars-container {
      .vfc-calendars {
        .vfc-calendar {
          div {
            &.vfc-content {
              margin: 0;

              .vfc-week {
                display: grid;
                grid-template-columns: repeat(7, 1fr);

                &:nth-child(1n + 2) {
                  .vfc-day {
                    border-top: none;
                  }
                }

                .vfc-day {
                  border-left: 1px solid $color3;
                  border-bottom: 1px solid $color3;
                  border-top: 1px solid $color3;
                  margin-top: 0 !important;

                  &:nth-child(7n) {
                    border-right: 1px solid $color3;
                    box-sizing: border-box;
                  }

                  .custom-day-container {
                    margin: 0 5px;

                    .custom-day {
                      .events {
                        display: grid;
                        height: 80px;
                        padding: 5px;

                        overflow-x: hidden;
                        overflow-y: auto;
                        /* width */
                        &::-webkit-scrollbar {
                          width: 2px;
                        }

                        /* Track */
                        &::-webkit-scrollbar-track {
                          background: $color5;
                        }

                        /* Handle */
                        &::-webkit-scrollbar-thumb {
                          background: $color3;
                        }

                        /* Handle on hover */
                        &::-webkit-scrollbar-thumb:hover {
                          background: $color3;
                        }

                        .event-item {
                          position: relative;
                          padding: 5px;
                          border: 0;
                          // width: 100%;
                          border-radius: 5px;
                          background-color: transparent;
                          color: #ffffff;
                          font-size: 15px;
                          margin: 3px 0;

                          &.has-background-color1 {
                            background-color: $color1;
                          }

                          &.has-background-color2 {
                            background-color: $color2;
                          }

                          &.has-background-color3 {
                            background-color: $color3;
                          }

                          &.has-background-color4 {
                            background-color: $color4;
                          }
                        }
                      }
                    }
                  }

                  .vfc-today {
                    .custom-day-container {
                      .custom-day {
                        color: #ff8498;
                        font-weight: bold;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

.demo-calendar2 {
  width: 635px;
}

pre {
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  margin-bottom: 10px;
  overflow: auto;
  width: auto;
  padding: 5px;
  background-color: #eee;
  padding-bottom: 20px;
  max-height: 600px;
}

.green-line {
  width: 20px;
  position: absolute;
  height: 2px;
  background-color: #45cc0d;
  bottom: 3px;
  left: calc(50% - 10px);
}

.green-point {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #45cc0d;
  bottom: 3px;
  left: calc(50% - 4px);
}

.orange-point {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #eb9800;
  bottom: 3px;
  left: calc(50% - 4px);
}
</style>
