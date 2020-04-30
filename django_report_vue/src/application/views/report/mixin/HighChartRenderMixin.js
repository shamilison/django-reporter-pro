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
        livePreview: {
            type: Boolean,
            default: function () {
                return true;
            }
        },
        renderKey: {
            type: String,
            default: function () {
                return null;
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
                options3d: {
                    enabled: true,
                    alpha: 0,
                    beta: -15,
                    depth: 45,
                }
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
                enabled: true,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'bottom',
                borderWidth: 0,
                useHTML: true,
                labelFormatter: function () {
                    if (this.is_total === true) {
                        return '<div class="mt-1 pt-1" style="width:200px; border-top: 1px solid darkgrey;">' +
                            '<span style="float:left">' + this.name +
                            '</span><span style="float:right">' + this.y_label +
                            '</span></div>';
                    } else {
                        return '<div style="width:200px"><span style="float:left">' + this.name +
                            '</span><span style="float:right"> (' +
                            this.percentage.toFixed(1) + '%) ' + this.y_label + ' </span></div>';
                    }
                },
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
                    showInLegend: true,
                    innerSize: 30,
                    depth: 45,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)'
                    }
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
                            size: '80%'
                        }
                    }
                }]
            },
            credits: {
                enabled: false
            },
        },
    }),
    computed: {},
    watch: {
        headers: function (newVal) {
        },
        renderKey: function (newVal, oldVal) {
            this.renderChart();
        },
        chartGroup: function (newVal, oldVal) {
            if (oldVal !== null && this.livePreview) {
                this.renderChart();
            }
        },
        xColumn: function (newVal, oldVal) {
            if (oldVal !== null && this.livePreview) {
                this.renderChart();
            }
        },
        yColumn: function (newVal, oldVal) {
            if (oldVal !== null && this.livePreview) {
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
            if (this.livePreview)
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
            let chartSubTitle = null;
            for (let index = 0; index < this.data.length; index++) {
                let _groupKey = this.data[index][this.chartGroup.value];
                // Grouping Data
                if (!groupDataFormatter.hasOwnProperty(_groupKey))
                    groupDataFormatter[_groupKey] = this.data[index][this.yColumn.value];
                else
                    groupDataFormatter[_groupKey] += this.data[index][this.yColumn.value];
                chartSubTitle = this.data[index][this.xColumn.value]
            }
            let groupData = Object.keys(groupDataFormatter);
            let pieSeriesData = {
                name: this.yColumn.text,
                colorByPoint: true,
                data: []
            };
            let _total = 0;
            for (let depth = 0; depth < groupData.length; depth++) {
                let _key = groupData[depth];
                let _ySeriesItem = {name: _key, y: 0, y_label: 0,};
                try {
                    _ySeriesItem.y = parseFloat(groupDataFormatter[_key]);
                    _ySeriesItem.y_label = _ySeriesItem.y;
                    _total += _ySeriesItem.y;
                } catch (e) {
                    _ySeriesItem.y = 0;
                    _ySeriesItem.y_label = 0;
                }
                pieSeriesData.data.push(_ySeriesItem);
            }
            pieSeriesData.data.push({
                'name': 'Total', 'y': null, is_total: true, 'y_label': _total, 'color': 'transparent'
            })
            // Prepare Y-Series values
            console.log(groupDataFormatter, [pieSeriesData]);
            this.chartOptions.series = [pieSeriesData];
            this.chartOptions.title.text = this.reportSchema.information.title;
            this.chartOptions.subtitle.text = chartSubTitle;
        },
    },
    created() {
    },
    mounted() {
    }
}
