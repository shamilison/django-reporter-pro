<template>
    <v-list dense :key="uniqueKey">
        <template v-for="item in reportSchema['filters']">
            <FilterAndList :filters="item" :reportSchema="reportSchema" @click="">
            </FilterAndList>
            <div class="text-center">
                <v-btn @click="addItem" outlined small>
                    <v-icon left small>mdi-pencil</v-icon>
                    Or
                </v-btn>
            </div>
        </template>
    </v-list>
</template>

<script>
    import FieldPicker from "@/application/views/report/pickers/FieldPicker";
    import FilterAndList from "@/application/views/report/filters/FilterAndList";

    export default {
        name: 'FilterList',
        props: {
            reportSchema: {
                type: Object,
                default: function () {
                    return {};
                }
            },
        },
        components: {FilterAndList, FieldPicker},
        mixins: [],
        data() {
            return {
                fields: [],
                uniqueKey: this.$uuid.v4(),
            }
        },
        computed: {},
        watch: {
            'reportSchema.filters': function (newVal) {
                if (newVal.length === 0)
                    this.addItem();
                this.uniqueKey = this.$uuid.v4();
            }
        }, created() {
        },
        methods: {
            addItem() {
                this.reportSchema['filters'].push({});
            },
        },
        mounted() {
            if (this.reportSchema['filters'].length === 0)
                this.addItem();
        }
    };
</script>

<style lang="scss" scoped>
</style>
