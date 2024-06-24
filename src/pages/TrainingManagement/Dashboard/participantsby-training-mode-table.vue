<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <v-card style="text-align: center" :loading="isLoading">
          <label style="color: #1976d2">
            <span>{{ chartTitle }}</span>
          </label>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="startDate"
                :append-icon="menu ? 'mdi-calendar' : 'mdi-calendar'"
                :label="$t('Enter Start Date')"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="startDate"
              no-title
              scrollable
              @input="onDateChange"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="resetDate">
              {{ $t('Reset') }}
            </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(startDate)">
              {{ $t('Ok') }}
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="6">
        <v-select
            :label="$t('Select Program')"
            :items="programList"
            v-model="selectedProgram"
            item-text="name"
            item-value="id"
            clearable
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-simple-table class="bordered-table">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-center" colspan="2" style="background-color: #f0f0f0;">Participant Name & Modules Trained</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th class="text-center">Participants Name</th>
              <th class="text-center">No of Module Trained</th>
            </tr>
            <tr v-for="(data, index) in participantsData" :key="index">
              <td>{{ data.name }}</td>
              <td>{{ data.no_of_module_trained }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      startDate: '',
      chartTitle: 'Participants by Mode',
      isLoading: false,
      programList: [
        { id: 1, name: 'Program A' },
        { id: 2, name: 'Program B' },
        { id: 3, name: 'Program C' }
      ],
      participantsData: [
        { id: 1, name: 'Program A',no_of_module_trained:5},
        { id: 1, name: 'Program B',no_of_module_trained:9},
        { id: 1, name: 'Program C',no_of_module_trained:3},
        { id: 1, name: 'Program D',no_of_module_trained:8},
        { id: 1, name: 'Program E',no_of_module_trained:2},
        { id: 1, name: 'Program F',no_of_module_trained:1},
      ]
    };
  },
  methods: {
    resetDate() {
      this.startDate = '';
      this.menu = false;
      this.fetchData();
    },
    onDateChange() {
      this.fetchData();
    },
    fetchData() {
      // Implement data fetching logic if needed
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.v-menu__content {
  max-width: 300px;
}
.bordered-table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  width: 100%;
}

.bordered-table th,
.bordered-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.bordered-table th {
  background-color: #f0f0f0;
}
</style>
