<template>
    <div id="information_tracking">
        <v-row class="mx-5 mt-4">
            <v-col cols="12">
      <!-- Expantion panels start -->
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header color=#8C9EFF>
                            <h3 class="white--text">
                                {{ $t("container.list.search") }}
                            </h3>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="elevation-0 transparent mt-10">

                            <ValidationObserver ref="form" v-slot="{ invalid }">
                                <form @submit.prevent="">
                                    <v-row>
                                        <v-col lg="6" md="6" cols="12">

                                            <v-select outlined menu-props="top" clearable
                                                :label="$t('container.list.reason')">
                                            </v-select>
                                        </v-col>


                                        <v-col lg="6" md="6" cols="12">
                                            <ValidationProvider name="Division" vid="division" rules="required"
                                                v-slot="{ errors }">
                                                <v-text-field outlined clearable @input="onChangeDivision($event)"
                                                    v-model="data.division_id" :label="$t(
                                                        'container.list.reason_details'
                                                    )
                                                        " :items="divisions" item-text="name_en"
                                                    item-value="id" required :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]">
                                                </v-text-field>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col lg="6" md="6" cols="12">
                                            <ValidationProvider name="District" vid="district" rules="required"
                                                v-slot="{ errors }">
                                                <v-autocomplete outlined v-model="data.district_id"
                                                     :label="$t(
                                                        'container.beneficiary_management.beneficiary_list.search_by'
                                                    )
                                                        " :items="districts" item-text="name_en"
                                                    item-value="id" required :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]"></v-autocomplete>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col lg="6" md="6" cols="12">
                                            <ValidationProvider name="Location Type" vid="location_type" rules="required"
                                                v-slot="{ errors }">
                                                <
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col v-if="data.location_type == 1" lg="6" md="6" cols="12">
                                            <ValidationProvider name="thana" vid="district_pouro_id" rules="required"
                                                v-slot="{ errors }">
                                                <v-autocomplete v-model="data.district_pouro_id" outlined :label="$t('container.system_config.demo_graphic.ward.pouro')
                                                    " :items="district_pouros" item-text="name_en"
                                                    item-value="id" required :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]"></v-autocomplete>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">
                                            <ValidationProvider name="Upazila" vid="thana_id" rules="required"
                                                v-slot="{ errors }">
                                                <v-autocomplete v-model="data.thana_id" outlined :label="$t('container.system_config.demo_graphic.thana.thana')
                                                    " @change="onChangeUpazila($event)" :items="thanas"
                                                    item-text="name_en" item-value="id" required
                                                    :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]"></v-autocomplete>
                                            </ValidationProvider>
                                        </v-col>
                                        <v-col v-if="data.location_type == 2" lg="6" md="6" cols="12">
                                            <ValidationProvider name="union" vid="union_id" rules="required"
                                                v-slot="{ errors }">
                                                <v-autocomplete v-model="data.union_id" outlined :label="$t('container.system_config.demo_graphic.ward.union')
                                                    " :items="unions" item-text="name_en" item-value="id"
                                                    required :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]"></v-autocomplete>
                                            </ValidationProvider>
                                        </v-col>

                                        <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">
                                            <ValidationProvider name="city" vid="city_id" rules="required"
                                                v-slot="{ errors }">
                                                <v-autocomplete v-model="data.city_id" @change="onChangeCity($event)"
                                                    outlined :label="$t('container.system_config.demo_graphic.ward.city')
                                                        " :items="cities" item-text="name_en"
                                                    item-value="id" required :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]"></v-autocomplete>
                                            </ValidationProvider>
                                        </v-col>

                                        <v-col v-if="data.location_type == 3" lg="6" md="6" cols="12">
                                            <ValidationProvider name="thana" vid="city_thana_id" rules="required"
                                                v-slot="{ errors }">
                                                <v-autocomplete v-model="data.city_thana_id" outlined :label="$t('container.system_config.demo_graphic.ward.thana')
                                                    " :items="city_thanas" item-text="name_en"
                                                    item-value="id" required :error="errors[0] ? true : false"
                                                    :error-messages="errors[0]"></v-autocomplete>
                                            </ValidationProvider>
                                        </v-col>

                                    </v-row>

                                    <div class="d-inline d-flex justify-end ">
                                        <v-btn elevation="2" class="btn mr-2" color="success">{{
                                            $t("container.list.search") }}</v-btn>
                                        <v-btn elevation="2" class="btn">{{ $t("container.list.reset") }}</v-btn>
                                    </div>
                                </form>
                            </ValidationObserver>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                </v-expansion-panels>
                <!-- Expantion panels end -->


            </v-col>



            <v-col cols="12">
                <v-card>
                    <v-card-title class="font-weight-bold justify-center">
                        {{ $t("container.beneficiary_management.beneficiary_exit.title")
                        }}
                    </v-card-title>
                    <v-data-table :loading="loading" item-key="id" :headers="headers" :items="divisions"
                        :items-per-page="pagination.perPage" hide-default-footer
                        class="elevation-0 transparent row-pointer">
                        <template v-slot:item.id="{ item, index }">
                            {{
                                (pagination.current - 1) * pagination.perPage +
                                index +
                                1
                            }}
                        </template>
                        <template v-slot:item.name_en="{ item }">
                            {{ item.name_en }}
                        </template>
                        <template v-slot:item.name_bn="{ item }">
                            {{ item.name_bn }}
                        </template>

                        <!-- Action Button -->
                        <template v-slot:item.actions="{ item }">

                            <v-btn v-on="on" color="success" elevation="0" router
                                to="/beneficiary-management/digital-id-car">
                                {{ $t("container.beneficiary_management.digital_id.digital_id_card") }}
                            </v-btn>


                        </template>
                        <!-- End Action Button -->

                        <template v-slot:footer="item">
                            <div class="text-center pt-2 v-data-footer justify-center pb-2">
                                <v-select style="
                              position: absolute;
                              right: 25px;
                              width: 149px;
                              transform: translate(0px, 0px);
                            " :items="items" hide-details dense outlined @change="onPageChange"
                                    v-model="pagination.perPage"></v-select>
                                <v-pagination circle primary v-model="pagination.current" :length="pagination.total"
                                    @input="onPageChange" :total-visible="11" class="custom-pagination-item"></v-pagination>
                            </div>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>







        </v-row>

    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
export default {
    name: 'DigitalIndex',
    title: "CTM - Digital ID Card",

    data() {
        return {
            data: {
                division_id: null,
                district_id: null,
                city_id: null,
                city_thana_id: null,
                union_id: null,
                thana_id: null
            },



            loading: false,
            search: "",
            divisions: [],
            districts: [],
            locationType: [],
            thanas: [],
            cities: [],
            unions: [],
            city_thanas: [],
            district_pouros: [],


            pagination: {
                current: 1,
                total: 0,
                perPage: 10,
            },
            items: [5, 10, 15, 20, 40, 50, 100],
        };
    },
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    computed: {
        headers() {
            return [
                {
                    text: this.$t("container.list.sl"),
                    value: "id",
                    align: "start",
                    sortable: false,
                },


                {
                    text: this.$t(
                        "container.beneficiary_management.beneficiary_list.beneficiary_id"
                    ),
                    value: "name_bn",
                },
                {
                    text: this.$t(
                        "container.system_config.demo_graphic.union.union"
                    ),
                    value: "name_bn",
                },
                {
                    text: this.$t(
                        "container.list.mobile"
                    ),
                    value: "name_bn",
                },

                {
                    text: this.$t("container.list.action"),
                    value: "actions",
                    align: "center",
                    sortable: false,
                },
            ];
        },


    },



    methods: {
        async onChangeDivision(event) {
            await this.$axios
                .get(`/admin/district/get/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.districts = result.data.data;
                });
        },
        async onChangeDistrict(event) {
            await this.$axios
                .get(`/admin/thana/get/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.LocationType(this.data.location_type);
                    this.thanas = result.data.data;
                });
        },

        async LocationType($event) {
            if (this.data.district_id != null && this.data.location_type != null) {
                if ($event === 2) {
                    await this.$axios
                        .get(`/admin/thana/get/${this.data.district_id}`, {
                            headers: {
                                Authorization: "Bearer " + this.$store.state.token,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((result) => {
                            this.thanas = result.data.data;
                        });
                }
                if ($event === 3) {
                    await this.$axios
                        .get("/admin/city/get/" + this.data.district_id + "/" + $event, {
                            headers: {
                                Authorization: "Bearer " + this.$store.state.token,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((result) => {
                            this.cities = result.data.data;
                        });
                }
                if ($event === 1) {
                    await this.$axios
                        .get("/admin/city/get/" + this.data.district_id + "/" + $event, {
                            headers: {
                                Authorization: "Bearer " + this.$store.state.token,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((result) => {
                            this.district_pouros = result.data.data;
                        });
                }
            }
        },

        async onChangeThana(event) {
            await this.$axios
                .get(`/admin/union/get/${event}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.unions = result.data.data;
                });
        },
        async onChangeCity(event) {
            await this.$axios
                .get(`/admin/thana/get/city/${this.data.city_id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.city_thanas = result.data.data;
                });
        },
        async onChangeUpazila(event) {
            await this.$axios
                .get(`/admin/union/get/${this.data.thana_id}`, {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    this.unions = result.data.data;
                });
        },


        onPageChange($event) {
            // this.pagination.current = $event;
            this.Getbeneficiary();
        },

        async Getbeneficiary() {
            const queryParams = {
                searchText: this.search,
                perPage: this.pagination.perPage,
                page: this.pagination.current,
            };

            this.$axios
                .get("/admin/division/get", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    this.divisions = result.data.data;
                    this.pagination.current = result.data.meta.current_page;
                    this.pagination.total = result.data.meta.last_page;
                    this.pagination.grand_total = result.data.meta.total;
                });


        },

        updateHeaderTitle() {
            const title = this.$t(
                "container.beneficiary_management.beneficiary_exit.title"
            );
            this.$store.commit("setHeaderTitle", title);
        },
    },
    watch: {
        "$i18n.locale": "updateHeaderTitle",
        value(val) {
    
        }
    },

    beforeMount() {
        this.updateHeaderTitle();
    },
    mounted() {
        this.Getbeneficiary();

        this.$store
            .dispatch("getLookupByType", 1)
            .then((res) => (this.locationType = res));
    }
};
</script>