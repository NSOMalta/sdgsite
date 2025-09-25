var accessibilitySwitcher = function () {

    // Utility functions
    function getActiveContrast() {
        return $('body').hasClass('contrast-high') ? 'high' : 'default';
    }

    function createCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length);
        }
        return null;
    }

    function imageFix(contrast) {
        var doNotSwitchTheseSuffixes = ['.svg'];
        if (contrast === 'high') {
            $('img').each(function() {
                var $img = $(this);
                var src = $img.attr('src').toLowerCase();
                if (src.includes('high-contrast')) return;
                if (doNotSwitchTheseSuffixes.some(s => src.endsWith(s))) return;
                $img.attr('src', src.replace('img/', 'img/high-contrast/'));
            });
        } else {
            $('img[src*=high-contrast]').each(function() {
                $(this).attr('src', $(this).attr('src').replace('high-contrast/', ''));
            });
        }
    }

    function broadcastContrastChange(contrast, elem) {
        var event = new CustomEvent('contrastChange', {
            bubbles: true,
            detail: contrast
        });
        elem.dispatchEvent(event);
    }

    // Centralized contrast setter
    function setContrast(contrast) {
        // Apply body class once
        $('body').removeClass('contrast-default contrast-high')
                 .addClass(contrast === 'high' ? 'contrast-high' : 'contrast-default');

        // Update label efficiently
        document.getElementById('contrast-label').textContent = contrast === 'high' ? 'Light Mode' : 'Dark Mode';

        // Defer heavy DOM operations
        requestAnimationFrame(() => {
            imageFix(contrast);
        });

        // Update switcher attributes
        var title, gaAttributes, newSwitchTo;
        if (contrast === 'high') {
            title = translations.header.disable_high_contrast;
            newSwitchTo = 'default';
            gaAttributes = opensdg.autotrack('switch_contrast', 'Accessibility', 'Change contrast setting', 'default');
        } else {
            title = translations.header.enable_high_contrast;
            newSwitchTo = 'high';
            gaAttributes = opensdg.autotrack('switch_contrast', 'Accessibility', 'Change contrast setting', 'high');
        }

        $('[data-contrast-switch-to]')
            .attr('data-contrast-switch-to', newSwitchTo)
            .attr('title', title)
            .attr('aria-label', title)
            .attr(gaAttributes);

        // Save cookie
        createCookie('contrast', contrast, 365);
    }

    // Event listener for toggle buttons
    $('[data-contrast-switch-to]').click(function () {
        var newContrast = $(this).attr('data-contrast-switch-to');
        if (newContrast === getActiveContrast()) return;

        setContrast(newContrast);
        broadcastContrastChange(newContrast, this);
    });

    // On page unload, persist contrast
    window.onunload = function () {
        createCookie('contrast', getActiveContrast(), 365);
    }

    // Initialize based on cookie
    var cookie = readCookie('contrast');
    setContrast(cookie === 'high' ? 'high' : 'default');

    // Dynamic aria labels on navbar toggle
    $('#navbarSupportedContent').on('shown.bs.collapse', function() {
        $('.navbar-toggler').attr('aria-label', translations.header.hide_menu);
    });
    $('#navbarSupportedContent').on('hidden.bs.collapse', function() {
        $('.navbar-toggler').attr('aria-label', translations.header.show_menu);
    });
};
