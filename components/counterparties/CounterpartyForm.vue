<template>
  <v-form>
    <v-select
      v-model="value._type"
      label="Тип"
      placeholder="Введите тип"
      :items="types"
      item-text="name"
      item-value="value"
      :rules="rules.type"
    />
    <legal-entity-form
      v-if="value._type === 'UL'"
      v-model="value"
      :final="final"
    />
    <individual-entrepreneur-form
      v-if="value._type === 'IP'"
      v-model="value"
      :final="final"
    />
    <individual-form
      v-if="value._type === 'FL'"
      v-model="value"
      :final="final"
    />
  </v-form>
</template>

<script>
import resourceForm from '~/mixins/resourceForm'
import LegalEntityForm from '~/components/counterparties/LegalEntityForm'
import IndividualEntrepreneurForm from '~/components/counterparties/IndividualEntrepreneurForm'
import IndividualForm from '~/components/counterparties/IndividualForm'
import formRules from '~/mixins/formRules'

export default {
  name: 'CounterpartyForm',
  components: { IndividualForm, IndividualEntrepreneurForm, LegalEntityForm },
  mixins: [resourceForm, formRules],
  data: () => ({
    menu: false,

    types: [
      { value: 'UL', name: 'Юридическое лицо' },
      { value: 'IP', name: 'Индивидуальный предприниматель' },
      { value: 'FL', name: 'Физическое лицо' },
    ],
  }),
}
</script>
