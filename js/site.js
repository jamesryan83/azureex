
// setup highlight.js for syntax highlighting
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
});


$(document).ready(function () {

    var sidebarEls = $("#sidebar ul li a");
    var contentElTops = $("#content h4").map(function (index, el) { return $(el).offset().top });

    // setup initial sidebar/content scroll state
    setSidebarItemSelected(sidebarEls, location.hash || "#1");
    scrollSidebarToHeading(sidebarEls, location.hash);
    scrollContentToHeading(location.hash);

    // scroll to item in #content when #sidebar a is clicked
    $('#sidebar a').on('click', function () {
        var id = $(this)[0].hash;
        setSidebarItemSelected(sidebarEls, id);
        scrollContentToHeading(id);
    });

    // update sidebar selected item when content area is scrolled
    // $("#content").on("scroll", function (event) {
    //     var id = getCurrentSidebarScrolledItem(contentElTops, event.target.scrollTop);
    //     setSidebarItemSelected(sidebarEls, id);
    // });
});


function getCurrentSidebarScrolledItem(contentElTops, currentY) {
    for (var i = 0, size = contentElTops.length - 1; i < size; i++) {
        if (currentY < contentElTops[0]) {
            return "#1";
        } else if (currentY >= contentElTops[0] && currentY < contentElTops[i + 1]) {
            return "#" + (i + 1);
        } else {
            continue;
        }
    }
    return "#" + size;
}

function setSidebarItemSelected(sidebarEls, id) {
    if (!id) return;

    sidebarEls.removeClass("selected")
    var sidebarEl = getSidebarElementByHref(sidebarEls, id);
    $(sidebarEl).addClass("selected");
}

function scrollSidebarToHeading(sidebarEls, id) {
    if (!id) return;

    var el = getSidebarElementByHref(sidebarEls, id);
    el.scrollIntoView();
}

function scrollContentToHeading(id) {
    if (!id) return;

    $(id)[0].scrollIntoView();
}

function getSidebarElementByHref(sidebarEls, id) {
    if (!id) return;

    for (var i = 0; i < sidebarEls.length; i++) {
        if (sidebarEls[i].hash === id) {
            return sidebarEls[i];
        }
    }
}
