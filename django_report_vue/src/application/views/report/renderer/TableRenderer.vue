<template>
    <v-card class="pt-3 pb-3 pa-3">
        <v-data-table :custom-filter="filterOnlyCapsText" :headers="headers"
                      :items="desserts" :search="search" item-key="name">
            <template v-slot:top>
                <v-text-field class="mx-0`" label="Search (UPPER CASE ONLY)" v-model="search"></v-text-field>
            </template>
            <template v-slot:body.append>
                <tr>
                    <td></td>
                    <td>
                        <v-text-field label="Less than" type="number" v-model="calories"></v-text-field>
                    </td>
                    <td colspan="4"></td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import Test_model_list from "@/application/tests/data/test_model_list";

    export default {
        name: 'TableRenderer',
        components: {},
        mixins: [],
        data() {
            return {
                search: '',
                calories: '',
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1%',
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: '1%',
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: '7%',
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        iron: '8%',
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        iron: '16%',
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: '0%',
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        iron: '2%',
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        iron: '45%',
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        iron: '22%',
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: '6%',
                    },
                ],
            }
        },
        computed: {
            headers() {
                return [
                    {
                        text: 'Dessert (100g serving)',
                        align: 'start',
                        sortable: true,
                        value: 'name',
                    },
                    {
                        text: 'Calories',
                        value: 'calories',
                        filter: value => {
                            if (!this.calories) return true

                            return value < parseInt(this.calories)
                        },
                    },
                    {text: 'Fat (g)', value: 'fat'},
                    {text: 'Carbs (g)', value: 'carbs'},
                    {text: 'Protein (g)', value: 'protein'},
                    {text: 'Iron (%)', value: 'iron'},
                ]
            },
        },
        methods: {
            filterOnlyCapsText(value, search, item) {
                return value != null &&
                    search != null &&
                    typeof value === 'string' &&
                    value.toString().toLocaleUpperCase().indexOf(search) !== -1
            },
        },
        mounted() {
        },
    };
</script>

<style lang="scss" scoped>
</style>
