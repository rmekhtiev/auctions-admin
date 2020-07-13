<template>
  <v-form>
    <v-text-field v-model="value.title" label="Название" />
    <v-autocomplete
      v-model="value.organizer_id"
      label="Организатор"
      :items="counterparties"
      item-text="attributes.display_name"
      item-value="id"
    />
    <v-autocomplete
      v-model="value.seller_id"
      label="Продавец"
      :items="counterparties"
      item-text="attributes.display_name"
      item-value="id"
    />
    <v-dialog
      ref="dialog_date"
      v-model="modal_date"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Дата торгов"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        locale="ru"
        scrollable
        :min="$moment().add(1, 'd').format('YYYY-MM-DD')"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal_date = false">Отмена</v-btn>
        <v-btn text color="primary" @click="$refs.dialog_date.save(date)"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      ref="dialog_start"
      v-model="modal_start"
      :return-value.sync="starts_at"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="starts_at"
          label="Время начала торгов"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="modal_start"
        v-model="starts_at"
        full-width
        min="10:00"
        max="18:00"
        format="24hr"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal_start = false">Отмена</v-btn>
        <v-btn text color="primary" @click="$refs.dialog_start.save(starts_at)"
          >OK</v-btn
        >
      </v-time-picker>
    </v-dialog>
    <v-dialog
      ref="dialog_end"
      v-model="modal_end"
      :return-value.sync="ends_at"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="ends_at"
          label="Время окончания торгов"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="modal_end"
        v-model="ends_at"
        full-width
        min="10:00"
        max="18:00"
        format="24hr"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal_end = false">Отмена</v-btn>
        <v-btn text color="primary" @click="$refs.dialog_end.save(ends_at)"
          >OK</v-btn
        >
      </v-time-picker>
    </v-dialog>
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'

export default {
  name: 'AuctionForm',
  mixins: [resourceForm],
  fetch: ({ store }) => {
    return Promise.all([store.dispatch('counterparties/loadAll')])
  },
  data: () => ({
    modal_start: false,
    modal_end: false,
    modal_date: false,
    date: null,
    starts_at: '10:00',
    ends_at: '18:00',
  }),
  computed: {
    counterparties() {
      return this.$store.getters['counterparties/all']
    },
  },
  watch: {
    date() {
      this.recalculateDatetimes()
    },
    starts_at() {
      this.recalculateDatetimes()
    },
    ends_at() {
      this.recalculateDatetimes()
    },
  },
  created() {
    console.log(this.value)
    this.date = this.value.starts_at
      ? this.$moment(this.value.starts_at).format('YYYY-MM-DD')
      : null
    this.starts_at = this.value.starts_at
      ? this.$moment(this.value.starts_at).format('HH:mm')
      : '10:00'
    this.ends_at = this.value.ends_at
      ? this.$moment(this.value.ends_at).format('HH:mm')
      : '18:00'
    this.recalculateDatetimes()
  },
  methods: {
    recalculateDatetimes() {
      const startsAt = this.$moment(this.date + ' ' + this.starts_at).clone()
      const endsAt = this.$moment(this.date + ' ' + this.ends_at).clone()

      this.value.starts_at = startsAt
      this.value.ends_at = endsAt
    },
  },
}
</script>
