<template>
	<v-data-table
			:headers="headers"
			:items="desserts"
			:single-select="singleSelect"
			class="elevation-1"
			item-key="name"
			show-select
			v-model="selected">
	</v-data-table>
</template>

<script>
    export default {
        name: 'Refiner',
        components: {},
        mixins: [],
        data() {
            return {
                singleSelect: true,
                selected: [],
                headers: [
                    {
                        text: 'Dessert (100g serving)',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {text: 'Calories', value: 'calories'},
                    {text: 'Fat (g)', value: 'fat'},
                    {text: 'Carbs (g)', value: 'carbs'},
                    {text: 'Protein (g)', value: 'protein'},
                    {text: 'Iron (%)', value: 'iron'},
                ],
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
                ],
            }
        },
        methods: {},
        mounted() {
        }
    };
</script>

<style lang="scss" scoped>
</style>
