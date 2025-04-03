opensdg.chartTypes.bar = function (info) {
    var config = opensdg.chartTypes.base(info); // base configuration
    var overrides = {
        type: 'bar',
    };

    // Check if 'graph_types' exists and if stacking is applied to this series.
    // Iterate over all series in 'graph_types' and check the 'stacked' flag.
    var graphTypes = info.graph_types || [];
    graphTypes.forEach(function (seriesConfig) {
        if (seriesConfig.graph_type === 'stacked') {
            // If the series is marked as stacked, apply stacking settings.
            overrides.options = {
                scales: {
                    x: { stacked: true },
                    y: { stacked: true },
                },
            };

            // Group datasets into stacks based on the disaggregation.
            config.data.datasets.forEach(function (dataset) {
                var disaggregation = $.extend({}, dataset.disaggregation);
                // Ensure that the disaggregation gets correctly grouped.
                if (typeof disaggregation[info.stackedDisaggregation] !== 'undefined') {
                    disaggregation[info.stackedDisaggregation] = 'samestack';
                }
                dataset.stack = JSON.stringify(disaggregation);
            });
        } else {
            // If the series is not stacked, make sure the scales are not stacked.
            overrides.options = {
                scales: {
                    x: { stacked: false },
                    y: { stacked: false },
                },
            };
        }
    });

    // Manually set the borderWidths to 0 to avoid a weird border effect on the bars.
    config.data.datasets.forEach(function (dataset) {
        dataset.borderWidth = 0;
    });

    // Add these overrides onto the normal config, and return it.
    _.merge(config, overrides);
    return config;
};
