function handleTabVisibility() {
    // Fetch the currently selected series radio button
    var selectedSeriesInput = document.querySelector('input[name="series"]:checked');
    
    if (selectedSeriesInput) {
        var selectedSeries = selectedSeriesInput.value;

        var targetSeriesName = "Number of local breeds for which sufficient genetic resources are stored for reconstitution";
        console.log('Selected Series:', selectedSeries);
        console.log('Target Series Name:', targetSeriesName);

        var chartTab = document.querySelector('#tab-chartview');
        var mapTab = document.querySelector('#tab-mapview');
        var chartPane = document.querySelector('#chartview');
        var mapPane = document.querySelector('#mapview');

        // Debug output
        console.log('Chart Tab:', chartTab);
        console.log('Map Tab:', mapTab);
        console.log('Chart Pane:', chartPane);
        console.log('Map Pane:', mapPane);

        if (selectedSeries === targetSeriesName) {
            if (chartTab) chartTab.style.display = 'none';
            if (mapTab) mapTab.style.display = 'none';
            if (chartPane) chartPane.style.display = 'none';
            if (mapPane) mapPane.style.display = 'none';
        } else {
            if (chartTab) chartTab.style.display = 'block';
            if (mapTab) mapTab.style.display = 'block';
            if (chartPane) chartPane.style.display = 'block';
            if (mapPane) mapPane.style.display = 'block';
        }
    } else {
        console.error('No series input is currently selected.');
    }
}

// Attach event listener to run the function when the series selection changes
document.querySelectorAll('input[name="series"]').forEach(function(element) {
    element.addEventListener('change', handleTabVisibility);
});

// Run on page load in case a series is pre-selected
document.addEventListener('DOMContentLoaded', handleTabVisibility);
