$(window).resize(function resizeCanvas() {
    console.log("resize");
    let widthElement = $(window).width();
    let heightElement = $(window).height();
    widthElement *= 9 / 10;
    heightElement *= 4 / 5;

    $("#canvasGame").width(widthElement).height(heightElement);
})