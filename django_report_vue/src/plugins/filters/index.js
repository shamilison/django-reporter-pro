import titleCase from './title_case';

export default {
    install(Vue) {
        Vue.filter("title_case", function (value) {
            return titleCase(value);
        });
    }
};