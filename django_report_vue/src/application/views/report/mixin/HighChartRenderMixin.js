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
        chartType: null,
        chartTypes: [
            {text: 'Line Chart', value: 'line'},
            {text: 'Area Chart', value: 'area'},
            {text: 'Bar Chart', value: 'bar'},
            {text: 'Stacked Bar Chart', value: 'stack_bar'},
            {text: 'Column Chart', value: 'column'},
            {text: 'Stacked Column Chart', value: 'stack_column'},
            {text: 'Pie Chart', value: 'pie'},
        ],
        chartGroup: null,
        chartGroups: [],
        xColumn: null,
        xColumns: [],
        yColumn: null,
        yColumns: [],
        chartOptions: {
            chart: {
                type: 'line',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                accessibility: {
                    rangeDescription: null
                },
                categories: [],
                tickmarkPlacement: 'on',
                lineWidth: 0,
            },
            yAxis: {
                title: {
                    text: null
                },
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            pane: {
                size: '80%'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    stacking: 'normal',
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
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                },
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                },
            },
            series: [],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 600
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        },
                        pane: {
                            size: '70%'
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
            if (oldVal !== null) {
                this.renderChart();
            }
        },
        xColumn: function (newVal, oldVal) {
            if (oldVal !== null) {
                this.renderChart();
            }
        },
        yColumn: function (newVal, oldVal) {
            if (oldVal !== null) {
                this.renderChart();
            }
        },
        chartType: function (newVal, oldVal) {
            if (newVal.value === 'stack_bar') {
                this.chartOptions.chart.type = 'bar';
                this.chartOptions.plotOptions.series.stacking = 'normal';
            } else if (newVal.value === 'stack_column') {
                this.chartOptions.chart.type = 'column';
                this.chartOptions.plotOptions.column.stacking = 'normal';
            } else {
                this.chartOptions.plotOptions.series.stacking = null;
                this.chartOptions.plotOptions.column.stacking = null;
                this.chartOptions.chart.type = this.chartType.value;
            }
            this.renderChart();
        },
    },
    methods: {
        renderChart: function () {
            if (this.chartType.value === 'pie')
                this.renderPieChart();
            else
                this.renderLineChart();
        },
        renderLineChart: function () {
            // Prepare X-Series values and format data to generate Y-Series values
            let groupDataFormatter = {};
            let xDataFormatter = {};
            for (let index = 0; index < this.data.length; index++) {
                let _key = this.data[index][this.xColumn.value];
                let _groupKey = this.data[index][this.chartGroup.value];
                // X-Axis Data
                if (!xDataFormatter.hasOwnProperty(_key))
                    xDataFormatter[_key] = {};
                if (!xDataFormatter[_key].hasOwnProperty(_groupKey))
                    xDataFormatter[_key][_groupKey] = this.data[index][this.yColumn.value];
                else
                    xDataFormatter[_key][_groupKey] += this.data[index][this.yColumn.value];
                // Grouping Data
                if (!groupDataFormatter.hasOwnProperty(_groupKey))
                    groupDataFormatter[_groupKey] = {};
                if (!groupDataFormatter[_groupKey].hasOwnProperty(_key))
                    groupDataFormatter[_groupKey][_key] = this.data[index][this.yColumn.value];
                else
                    groupDataFormatter[_groupKey][_key] += this.data[index][this.yColumn.value];
            }
            let groupData = Object.keys(groupDataFormatter);
            let xSeriesData = Object.keys(xDataFormatter);
            let ySeriesData = [];
            for (let depth = 0; depth < groupData.length; depth++) {
                let _key = groupData[depth];
                let _ySeriesItem = {
                    name: _key,
                    data: [],
                    pointPlacement: 'on',
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
            this.chartOptions.xAxis.categories = xSeriesData;
            this.chartOptions.series = ySeriesData;
        },
        renderPieChart: function () {
            // Prepare X-Series values and format data to generate Y-Series values
            let groupDataFormatter = {};
            for (let index = 0; index < this.data.length; index++) {
                let _groupKey = this.data[index][this.chartGroup.value];
                // Grouping Data
                if (!groupDataFormatter.hasOwnProperty(_groupKey))
                    groupDataFormatter[_groupKey] = this.data[index][this.yColumn.value];
                else
                    groupDataFormatter[_groupKey] += this.data[index][this.yColumn.value];
            }
            let groupData = Object.keys(groupDataFormatter);
            let pieSeriesData = {
                name: 'Brands',
                colorByPoint: true,
                data: []
            };
            for (let depth = 0; depth < groupData.length; depth++) {
                let _key = groupData[depth];
                let _ySeriesItem = {name: _key, y: 0,};
                try {
                    _ySeriesItem.y = parseFloat(groupDataFormatter[_key]);
                } catch (e) {
                    _ySeriesItem.y = 0;
                }
                pieSeriesData.data.push(_ySeriesItem);
            }
            // Prepare Y-Series values
            console.log(groupDataFormatter, [pieSeriesData]);
            this.chartOptions.series = [pieSeriesData];
        },
    },
    created() {
    },
    mounted() {
    }
}
