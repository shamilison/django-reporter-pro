export default {
    props: {
        headers: {
            type: Array,
            default: function () {
                return [];
            }
        },
        data: {
            type: Array,
            default: function () {
                return [];
            }
        },
    },
    data: () => ({
        chartGroup: null,
        chartGroups: [],
        xColumn: null,
        xColumns: [],
        yColumn: null,
        yColumns: [],
        chartOptions: {
            chart: {
                type: 'area'
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            xAxis: {
                accessibility: {
                    rangeDescription: null
                },
                categories: [],
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                },
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                },
            },
            series: [],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        },
    }),
    computed: {},
    watch: {
        headers: function (newVal) {
        },
        chartGroup: function (newVal, oldVal) {
            if (oldVal !== null)
                this.renderLineChart();
        },
        xColumn: function (newVal, oldVal) {
            if (oldVal !== null)
                this.renderLineChart();
        },
        yColumn: function (newVal, oldVal) {
            if (oldVal !== null)
                this.renderLineChart();
        },
    },
    methods: {
        renderLineChart: function () {
            // Prepare X-Series values and format data to generate Y-Series values
            let groupDataFormatter = {};
            let xDataFormatter = {};
            for (let index = 0; index < this.data.length; index++) {
                let _key = this.data[index][this.xColumn];
                let _groupKey = this.data[index][this.chartGroup];
                // X-Axis Data
                if (!xDataFormatter.hasOwnProperty(_key))
                    xDataFormatter[_key] = {};
                if (!xDataFormatter[_key].hasOwnProperty(_groupKey))
                    xDataFormatter[_key][_groupKey] = this.data[index][this.yColumn];
                else
                    xDataFormatter[_key][_groupKey] += this.data[index][this.yColumn];
                // Grouping Data
                if (!groupDataFormatter.hasOwnProperty(_groupKey))
                    groupDataFormatter[_groupKey] = {};
                if (!groupDataFormatter[_groupKey].hasOwnProperty(_key))
                    groupDataFormatter[_groupKey][_key] = this.data[index][this.yColumn];
                else
                    groupDataFormatter[_groupKey][_key] += this.data[index][this.yColumn];
            }
            let groupData = Object.keys(groupDataFormatter);
            let xSeriesData = Object.keys(xDataFormatter);
            let ySeriesData = [];
            for (let depth = 0; depth < groupData.length; depth++) {
                let _key = groupData[depth];
                let _ySeriesItem = {
                    name: _key,
                    data: [],
                };
                for (let index = 0; index < xSeriesData.length; index++) {
                    try {
                        _ySeriesItem.data.push(parseFloat(groupDataFormatter[_key][xSeriesData[index]]));
                    } catch (e) {
                        _ySeriesItem.data.push(0);
                    }
                }
                ySeriesData.push(_ySeriesItem);
            }
            // Prepare Y-Series values
            console.log(xSeriesData, ySeriesData);
            this.chartOptions.xAxis.categories = xSeriesData;
            this.chartOptions.series = ySeriesData;
        },
    },
    created() {
    },
    mounted() {
        this.chartGroups = this.headers;
        this.xColumns = this.headers;
        this.yColumns = this.headers;
        if (this.headers.length >= 3) {
            if (this.chartGroup == null)
                this.chartGroup = this.headers[1].value;
            if (this.xColumn == null)
                this.xColumn = this.headers[2].value;
            if (this.yColumn == null)
                this.yColumn = this.headers[3].value;
        }
        this.renderLineChart();
    }
}
