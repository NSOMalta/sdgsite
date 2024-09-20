$(document).ready(function() {
    // Define sources for each series
    var sources = {
        'Obesity rate by body mass index': {
            organisation: 'Eurostat',
            link: 'https://exampleB.com'
        },
        'Percentage of children aged 11,13 and 15 years who are obese or overwieght ': {
            organisation: 'Health Behaviour in School-aged Children study (2023)',
            link: 'https://exampleB.com'
        }
        // Add more series here
    };

    // Loop through each label (series) and add the source information
    $('#serieses fieldset label').each(function() {
        var seriesName = $(this).text().trim();  // Get the text inside the label, i.e., the series name

        // Check if we have a source for this series
        if (sources[seriesName]) {
            var sourceInfo = sources[seriesName];
            // Create a div with the source information
            var sourceHtml = '<div class="series-source">Source: ' +
                sourceInfo.organisation + ' (<a href="' + sourceInfo.link + '">Link</a>)</div>';

            // Append the source information to this label
            $(this).append(sourceHtml);
        }
    });
});
