opensdg.chartTypes.bar = function (info) {
    var config = opensdg.chartTypes.base(info);
    var overrides = {
        type: 'bar',
        options: {
            scales: {
                x: { stacked: false },
                y: { stacked: false }
            }
        }
    };
    
    // Check for series-specific stacking
    var hasStackedSeries = false;
    var hasNonStackedSeries = false;
    
    // Check if we have series-specific settings in the metadata
    if (info.options && info.options.series_stacking) {
        config.data.datasets.forEach(function(dataset) {
            // Find if this series should be stacked
            var seriesName = dataset.label;
            var shouldStack = false;
            
            // Look for this series in the stacking configuration
            info.options.series_stacking.forEach(function(seriesConfig) {
                if (seriesConfig.series === seriesName && seriesConfig.stacked === true) {
                    shouldStack = true;
                }
            });
            
            if (shouldStack) {
                // Mark this dataset for stacking
                dataset.stack = 'stacked-series';
                hasStackedSeries = true;
            } else {
                // Ensure this dataset is not stacked
                dataset.stack = 'series-' + seriesName; // Each non-stacked gets unique stack
                hasNonStackedSeries = true;
            }
        });
    } 
    // Handle global stacking settings if no series-specific settings
    else if (info.graphType === 'stacked' || info.stackedDisaggregation) {
        // Everything is stacked
        if (info.stackedDisaggregation) {
            config.data.datasets.forEach(function(dataset) {
                var disaggregation = $.extend({}, dataset.disaggregation);
                if (typeof disaggregation[info.stackedDisaggregation] !== 'undefined') {
                    disaggregation[info.stackedDisaggregation] = 'samestack';
                }
                dataset.stack = JSON.stringify(disaggregation);
            });
        } else {
            config.data.datasets.forEach(function(dataset) {
                dataset.stack = 'default-stack';
            });
        }
        hasStackedSeries = true;
    } else {
        hasNonStackedSeries = true;
    }
    
    // Configure scales based on whether we have stacked series
    if (hasStackedSeries) {
        overrides.options.scales.x.stacked = true;
        overrides.options.scales.y.stacked = true;
    }
    
    // Manually set the borderWidths to 0
    config.data.datasets.forEach(function(dataset) {
        dataset.borderWidth = 0;
    });
    
    _.merge(config, overrides);
    return config;
};
