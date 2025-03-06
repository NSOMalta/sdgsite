$(document).ready(function() {
  // Get the indicator ID from the page
  var indicatorId = $('meta[name="indicator-id"]').attr('content');
  
  // Define your series-to-tabs mapping in JavaScript
  // You could also fetch this from a separate data file if you prefer
  var seriesTabsMapping = {
    // For indicator 1.1.1
    '6-3-2': {
      'Percentage of groundwater bodies exceeding the nitrate quality standard of 50mg/L': {
        'tab_1': 'chart',
        'tab_2': 'table',
        'tab_3': 'hide',
        'tab_4': 'hide'
      },
      'Percentage of total number of groundwater bodies with quantitative status having a good chemical status': {
        'tab_1': 'embed',
        'tab_2': 'table',
        'tab_3': 'hide',
        'tab_4': 'hide'
      }
    },
    // Add more indicators as needed
  };
  
  // When the series selection changes
  $('.selection-series').on('change', function() {
    var selectedSeries = $(this).val();
    
    // If we have mappings for this indicator and series
    if (seriesTabsMapping[indicatorId] && 
        seriesTabsMapping[indicatorId][selectedSeries]) {
      
      var tabsConfig = seriesTabsMapping[indicatorId][selectedSeries];
      
      // Apply the tab configuration for this series
      Object.keys(tabsConfig).forEach(function(tabKey) {
        var tabValue = tabsConfig[tabKey];
        var tabNumber = parseInt(tabKey.replace('tab_', ''));
        
        if (tabValue === 'hide') {
          // Hide this tab
          $('.nav-tabs li:nth-child(' + tabNumber + ')').hide();
          
          // If the hidden tab is active, switch to the first visible tab
          if ($('.nav-tabs li:nth-child(' + tabNumber + ')').hasClass('active')) {
            $('.nav-tabs li:visible:first a').tab('show');
          }
        } else {
          // Show this tab
          $('.nav-tabs li:nth-child(' + tabNumber + ')').show();
          
          // You could also change the tab type here if needed
          // This would depend on the specific implementation of Open SDG
        }
      });
    }
  });
});
