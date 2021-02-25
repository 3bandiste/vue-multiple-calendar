const undefinedGenerator = () => undefined
import {DateTime, Info, Settings} from 'luxon'
export const propsAndData = {
  props: {
    highlightToday: {
      type: Boolean,
      default: true
    },
    locale: {
      default: 'en'
    },
    clickAndSwipeSelection: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: ''
    },
    displayTimeInput: {
      type: Boolean,
      default: false
    },
    configs: {
      type: Object,
      default: () => {}
    },
    sundayStart: {
      type: Boolean,
      default: undefinedGenerator
    },
    placeholder: {
      type: [String, Boolean],
      default: undefinedGenerator
    },
    dateFormat: {
      type: String,
      validator(format) {
        let timeFormat = format.split(' ')[1]
        if (!timeFormat) {
          return true
        }
        const validFormats = ['HH:MM', 'HH:mm', 'hh:MM', 'hh:mm']
        return !!~validFormats.indexOf(timeFormat)
      }
    },
    displayFormat: {
      type: Object,
      default() {
        return DateTime.DATETIME_MED
      }
    },
    canClearRange: {
      type: Boolean,
      default: false
    },
    isMultiple: {
      type: Boolean,
      default: undefinedGenerator
    },
    isSeparately: {
      type: Boolean,
      default: undefinedGenerator
    },
    isDatePicker: {
      type: Boolean,
      default: undefinedGenerator
    },
    isMultipleDatePicker: {
      type: Boolean,
      default: undefinedGenerator
    },
    isMultipleDateRange: {
      type: Boolean,
      default: undefinedGenerator
    },
    isDateRange: {
      type: Boolean,
      default: undefinedGenerator
    },
    withTimePicker: {
      type: Boolean,
      default: undefinedGenerator
    },
    calendarsCount: {
      type: Number
    },
    isModal: {
      type: Boolean,
      default: undefinedGenerator
    },
    isTypeable: {
      type: Boolean,
      default: undefinedGenerator
    },
    changeMonthFunction: {
      type: Boolean,
      default: undefinedGenerator
    },
    changeYearFunction: {
      type: Boolean,
      default: undefinedGenerator
    },
    changeYearStep: {
      type: Number,
      default: () => 3
    },
    newCurrentDate: {
      type: [Date, String]
    },
    markedDates: {
      type: Array,
      default: () => []
    },
    markedDateRange: {
      type: [Object, Array]
    },
    // @deprecated use disabledDays instead
    disabledDayNames: {
      type: Array
    },
    disabledDays: {
      type: Array,
      default() {
        return []
      }
    },
    disableWeekends: {
      type: Boolean,
      default: false
    },
    disabledDates: {
      type: Array
    },
    enabledDates: {
      type: Array
    },
    limits: {
      type: [Object, Boolean],
      default: undefinedGenerator
    },
    minSelDays: {
      type: [Number, Boolean],
      default: undefinedGenerator
    },
    maxSelDays: {
      type: [Number, Boolean],
      default: undefinedGenerator
    },
    showWeekNumbers: {
      type: Boolean,
      default: undefinedGenerator
    },
    value: {
      type: Object
    },
    transition: {
      type: Boolean,
      default: undefinedGenerator
    },
    hiddenElements: {
      type: Array
    },
    isAutoCloseable: {
      type: Boolean,
      default: undefined
    },
    isDark: {
      type: Boolean,
      default: undefined
    },
    isLayoutExpandable: {
      type: Boolean,
      default: undefined
    },
    titlePosition: {
      type: String,
      default: 'center'
    },
    arrowsPosition: {
      type: String,
      default: 'space-between'
    }
  },
  created() {
    Settings.defaultLocale = this.locale;
    this.fConfigs.dayNames= Info.weekdays('short')
    this.fConfigs.monthNames= Info.months()
    this.fConfigs.shortMonthNames= Info.months("short")
  },
  data() {
    return {
      isMousedownSelectionActive: false,
      temporarySelectedDates: [],
      mousedownSelectionAction: 'SELECT',
      mousedownSelectionStartDate: null,
      popoverElement: '',
      defaultDateFormat: {
        date: false,
        dateTime: false,
        hour: '00',
        minute: '00'
      },
      hoveredObject: null,
      calendar: {
        currentDate: new Date(),
        selectedDate: false,
        selectedDateTime: false,
        selectedHour: '00',
        selectedMinute: '00',
        selectedDatesItem: '',
        selectedDates: [],
        dateRange: {
          start: '',
          end: ''
        },
        multipleDateRange: []
      },
      transitionPrefix: 'left',
      showCalendar: true,
      showMonthPicker: false,
      showYearPicker: false,
      showTimePicker: false,
      allowPreDate: true,
      allowNextDate: true,
      listCalendars: [],
      fConfigs: {
        sundayStart: false,
        placeholder: false,
        dateFormat: 'YYYY-MM-DDTHH:mm:ss[Z]',
        displayFormat: DateTime.DATETIME_MED,
        isMultipleDateRange: false,
        isDatePicker: false,
        isMultipleDatePicker: false,
        isDateRange: false,
        withTimePicker: false,
        isMultiple: false,
        calendarsCount: 1,
        isSeparately: false,

        isModal: false,
        isTypeable: false,

        changeMonthFunction: false,
        changeYearFunction: false,
        changeYearStep: 3,

        markedDates: [],
        markedDateRange: {
          start: false,
          end: false
        },

        limits: false,
        minSelDays: false,
        maxSelDays: false,

        disabledDates: [],
        enabledDates: [],
        disabledDayNames: [],
        disabledDays: [],

        dayNames: Info.weekdays('short'),
        monthNames: Info.months(),
        shortMonthNames: Info.months("short"),

        showWeekNumbers: false,
        transition: true,
        hiddenElements: [],
        isAutoCloseable: false,
        isDark: false,
        isLayoutExpandable: false,

        titlePosition: 'center',
        arrowsPosition: 'space-between'
      }
    }
  }
}
