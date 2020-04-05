import {INPUT_TYPE} from './ModelInfoConstants';

export default {
    props: {},
    data: () => ({}),
    computed: {},
    watch: {},
    methods: {
        convertToModelList: function (response) {
            let result = [];
            let models = response.results;
            for (let index = 0; index < models.length; index++) {
                result.push(models[index]._meta);
            }
            return result;
        },
        convertToFieldMap: function (response) {
            let result = {
                dimensions: [],
                measures: [],
                relations: [],
            };
            let fields = response.results._meta.fields;
            for (let index = 0; index < fields.length; index++) {
                if (this.getFieldCategory(fields[index]) === 'measure')
                    result.measures.push(fields[index]);
                else if (this.getFieldCategory(fields[index]) === 'relation')
                    result.relations.push(fields[index]);
                else
                    result.dimensions.push(fields[index]);
            }
            return result;
        },
        getFieldCategory: function (field) {
            if (['number', 'datetime'].indexOf(INPUT_TYPE[field._python_type]) >= 0) {
                return 'measure';
            } else if (['relation'].indexOf(INPUT_TYPE[field._python_type]) >= 0) {
                return 'relation';
            }
            return 'dimension';
        },
    },
    created() {
    },
    mounted() {
    }
}
