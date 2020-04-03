import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);
export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: '#00a0af',
                secondary: '#00d3e9',
                accent: '#ec00e0',
                error: '#d80202',
            }, dark: {
                primary: '#00a0af',
            },
        },
    },
    icons: {
        iconfont: 'mdi',
    },
});