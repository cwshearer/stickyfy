(function () {

    this.Stickyfy = function () {

        var defaults = {
            toggleClass: "stuck",
            onStuck: null,
            onUnStuck: null,
            selector: ".stickyfy"
        }

        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        Stickyfy.prototype.init = function () {
            //abort if IE because position:sticky is not supported anyways ¯\_(ツ)_/¯
            ua = window.navigator.userAgent;
            var isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
            if (isIE || !window.IntersectionObserver) {
                return;
            }
            //run code for proper browsers
            observeStickyElements(defaults);
        }

        function observeStickyElements() {
            var all = defaults.selector ? document.querySelectorAll(defaults.selector) : document.getElementsByTagName("*");
            var allArray = Array.from(all);
            //looping through all tags to find sticky elements
            for (i = 0; i < allArray.length; i++) {
                var elem = allArray[i];
                var styles = window.getComputedStyle(elem, null);
                if (styles.getPropertyValue("position") === "sticky") {
                    //applying an intersectionobserver to the sticky element
                    setObserver(elem, elem.offsetHeight, styles.getPropertyValue("top"), styles.getPropertyValue("bottom"));
                }
            }
        }

        function setObserver(target, height, top, bottom) {
            //setting bounds for the intersections rect based on attributes set in css
            var options = {};
            var topString = "0px";
            var bottomString = "0px";
            if (parseInt(top) > 0) {
                var unit = top.indexOf("px") > 0 ? "px" : "%";
                topString = ((parseInt(top) + height + 1) * -1) + unit;
            }
            if (parseInt(bottom) > 0) {
                var unit = bottom.indexOf("px") > 0 ? "px" : "%";
                bottomString = ((parseInt(bottom) + height + 1) * -1) + unit;
            }
            options.rootMargin = topString + " 0px " + bottomString + " 0px";

            var className = defaults.toggleClass;

            //creating the observer
            var observer = new IntersectionObserver((entries) => {
                entries.forEach(function (entry) {
                    if (!entry.target.classList.contains(className) && entry.intersectionRatio === 0) {
                        //is intersecting
                        if ((parseInt(top) && (Math.floor(entry.boundingClientRect.y) === parseInt(top))) || (parseInt(bottom) && Math.ceil(entry.boundingClientRect.y) === (window.innerHeight - parseInt(bottom) - height))) {
                            //is locked in top or bottom
                            entry.target.classList.add(className);
                            if (defaults.onStuck && typeof defaults.onStuck == "function") {
                                defaults.onStuck(entry.target);
                            }
                        }
                    } else {
                        if (entry.target.classList.contains(className)) {
                            if (defaults.onUnStuck && typeof defaults.onUnStuck == "function") {
                                defaults.onUnStuck(entry.target);
                            }
                            entry.target.classList.remove(className);
                        }
                    }
                });
            }, options);
            observer.observe(target);
        }
    }

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

}());