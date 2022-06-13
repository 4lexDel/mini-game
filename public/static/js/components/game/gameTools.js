$(window).resize(function resizeCanvas() {
    console.log("resize");
    let widthElement = $("#canvasGame").parent().width();
    let heightElement = $("#canvasGame").parent().height();
    heightElement = document.documentElement.clientHeight * 8 / 10;


    $("#canvasGame").width(widthElement).height(heightElement);
})