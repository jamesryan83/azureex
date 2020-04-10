
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
});


$(document).ready(function () {

    setSidebarItemSelected(location.hash);
    scrollSidebarToHeading(location.hash);
    scrollContentToHeading(location.hash);

    // scroll to item in #content when #sidebar a is clicked
    $('#sidebar a').on('click', function () {
        var id = $(this)[0].hash;
        setSidebarItemSelected(id);
        scrollContentToHeading(id);
    });

});


function setSidebarItemSelected(id) {
    if (!id) return;

    $("#sidebar ul li a").removeClass("selected");

    var sidebarEl = getSidebarElementByHref(id);
    $(sidebarEl).addClass("selected");
}

function scrollSidebarToHeading(id) {
    if (!id) return;

    var el = getSidebarElementByHref(id);
    el.scrollIntoView();
}

function scrollContentToHeading(id) {
    if (!id) return;

    $(id)[0].scrollIntoView();
}

function getSidebarElementByHref(id) {
    if (!id) return;

    var sidebarEls = $("#sidebar ul li a");
    for (var i = 0; i < sidebarEls.length; i++) {
        if (sidebarEls[i].hash === id) {
            return sidebarEls[i];
        }
    }
}
