export function resizeCanvas() {
    let canvas = document.getElementById("canvasGame");

    console.log("Canvas resize");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}