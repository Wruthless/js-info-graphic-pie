# js-info-graphic-pie

We are attempting to reduce our dependency on many 3rd party libraries. In addition, high-quality info graphics as imagery adds significant weight to the page, and does not provide the possbility for interactivity. I did a quick exploration of generating an info graphic (Pie Chart) using nothing but JavaScript and svg's.

If you would like to play around with just the configuration, utilize the code starting on line 72 of _jsPie.js__.

<pre>
document.querySelector("#chart").append(pieChart({
    width: 640, height:400,    // size of the chart
    cx: 200, cy: 200, r: 180,  // center and radius of the pie
    lx: 400, ly: 10,           // position of the legend
    data: {                    // data to chart
        "JavaScript": 71.5,
        "Java": 45.4,
        "Bash/Shell": 40.4,
        "Python": 37.9,
        "C#": 35.3,
        "PHP": 31.4,
        "C++": 24.6,
        "C": 22.1,
        "TypeScript": 18.3,
        "Ruby": 10.3,
        "Swift": 8.3,
        "Objective-C": 7.3,
        "Go": 7.2,
    }
}));
</pre>

All attributes are set starting on line 44.

<pre>
    let slice = document.createElementNS(svg, 'path');
    slice.setAttribute("d", path);
    slice.setAttribute("fill", color);
    slice.setAttribute("stroke", "black");
    slice.setAttribute("stroke-width", "1");
    chart.append(slice);
        
    // draw a matching square for the key
    let icon = document.createElementNS(svg, "rect");
    icon.setAttribute("x", lx);              // position
    icon.setAttribute("y", ly + 30*i);
    icon.setAttribute("width", 20);          // size 
    icon.setAttribute("height", 20);
    icon.setAttribute("fill", color);        // same 
    icon.setAttribute("stroke", "black");    // outline
    icon.setAttribute("stroke-width", "1");
    chart.append(icon);                      // add to the chart

    // add a label to the right of the rectangle
    let label = document.createElementNS(svg, "text");
    label.setAttribute("x", lx + 30);        // position
    label.setAttribute("y", ly + 30*i + 16);
    label.append(`${labels[i]} ${value}`);   // add text to label
    chart.append(label);                     // add label to the chart
</pre>
