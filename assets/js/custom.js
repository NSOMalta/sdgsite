// Sample jQuery function to display the sources based on the selected series
$(document).ready(function() {
    // Assuming you have a dropdown or selection for series
    $('#series-select').on('change', function() {
        var selectedSeries = $(this).val();
        
        // Hide all sources first
        $('.source-block').hide();

        // Show the sources for the selected series
        $('.source-block[data-series="' + selectedSeries + '"]').show();
    });
});

