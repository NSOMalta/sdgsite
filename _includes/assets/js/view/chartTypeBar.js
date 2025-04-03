opensdg.chartTypes.bar = function (info) {
    var config = opensdg.chartTypes.base(info);
    var overrides = {
        type: 'bar',
    };
    // Manually set the borderWidths to 0 to avoid a weird border effect on the bars.
    config.data.datasets.forEach(function(dataset) {
        dataset.borderWidth = 0;
    });
    // Add these overrides onto the normal config, and return it.
    _.merge(config, overrides);
    return config;
}
