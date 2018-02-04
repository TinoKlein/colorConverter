// is color bright or dark? 0 -255
function bright(r, g, b) {
    return Math.ceil(Math.sqrt(0.299 * Math.pow(r, 2) + 0.587 * Math.pow(g, 2) + 0.114 * Math.pow(b, 2)));
}

// convert color to param (Hex-String or rgb)
function parse(color,param){

    let result;

    // convert to Hex string
    if(param === "toStr"){
        let hex = "#";
        for(let i = 0; i < color.length; i++){
            hex += parseInt(color[i]).toString(16);
        }

        result = hex;

    // convert to rgb
    }else if(param === "toNum") {
        const cR = parseInt(color.substring(0, 2), 16);
        const cG = parseInt(color.substring(2, 4), 16);
        const cB = parseInt(color.substring(4, 6), 16);

        result = {
            'r': cR,
            'g': cG,
            'b': cB
        }
    }

    return result;
}

// convert input value to opposite color-code
function convert(){
    let cTmp; let rgb; let colorStr; let output; let lum; let fontColor; let bgColor; let c1; let c2; let bg1; let bg2;

    // get color from input
    const color = document.getElementById('color').value;

    // if color string doesn`t contain "rgb" but ","
    if(color.indexOf("rgb") === -1 && color.indexOf(",") === -1){
        // if color string doesn`t contain "#"
        if(color.indexOf("#") !== -1){
            cTmp = color.split("#");

            if(cTmp[1].length === 3) {
                cTmp[1] += cTmp[1];
            }

            colorStr = cTmp[1];
        // if color string contains "#"
        }else{
            colorStr = color;
        }

        // convert hex to rgb
        rgb = parse(colorStr, "toNum");

        // if color not set - set bg color output to white
        if(isNaN(rgb.r) && isNaN(rgb.g) && isNaN(rgb.b)){
            output = "rgb(255,255,255)";
        // set color output to converted color
        }else{
            output = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
    // if color string contains rgb
    }else{
        if(color.indexOf("rgb") !== -1){
            c1 = color.split("(");
            c2 = c1[1].split(")");
            cTmp = c2[0].split(",");
        }else{
            cTmp = color.split(",");
        }
        // convert to hex
        rgb = parse(cTmp, "toStr");

        output = rgb;
    }

    // set background color to converted color
    document.body.style.backgroundColor = output;

    // split background color for bright function parameters
    bg1 = document.body.style.backgroundColor.split("(");
    bg2 = bg1[1].split(")");
    bgColor = bg2[0].split(",");

    // call bright function
    lum = bright(bgColor[0], bgColor[1], bgColor[2]);

    // if color is bright -> set font color variable to black
    if(lum > 125){
        fontColor = "#000";
    // if color is dark -> set font color variable to white
    }else{
        fontColor = "#fff";
    }

    // if color string length is 0 -> don`t show output
    if(document.getElementById('color').value.length === 0){
        document.getElementById("output").innerHTML = "";
    }else{
        document.getElementById("output").innerHTML = output;
    }

    // set font color
    document.body.style.color = fontColor;

}