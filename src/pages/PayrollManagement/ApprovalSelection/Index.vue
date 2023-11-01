<script>
export default {
    name: 'ApprovalSelection',

    data() {
        return {
            // offices: [{ id: 1, name: "Head Office" }, { id: 2, name: "Division Office" }, { id: 3, name: " District Office" }],
        ofiiceTypes:[]
        };
    },
    computed:{
        filteredOptions() {
            // Apply your filter logic here, e.g., filtering out options with 'Option 2' label
            return this.ofiiceTypes.filter(
                (option) => option.value_en !== "Ministry" && option.value_en !== "UCD" && option.value_en !== "Upazila" && option.value_en !== "Upazila UCD" && option.value_en !== "Circle Social Service"
            );
        },
    },

    mounted() {
        
        this.$store
            .dispatch("getLookupByType", 3)
            .then((res) => (this.ofiiceTypes = res));

    },

    methods: {

    },
};
</script>
<template>
    <div id="approval_selection">
        <v-row class="mx-5 mt-4">
            <v-col cols="12">


                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col lg="6" md="6" cols="12">
                                <v-select label="Select Office" outlined clearable :items="filteredOptions" item-text="value_en"
                                    item-value="id">

                                </v-select>
                            </v-col>
                            <v-col lg="6" md="6" cols="12">
      <v-btn elevation="2" class="btn mr-2" color="success">{{ $t("container.list.update") }}</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>


            </v-col>
        </v-row>
    </div>
</template>