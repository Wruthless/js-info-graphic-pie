function pieChart(options) {
    let {width, height, cx, cy, r, lx, ly, data} = options;
    let svg = "http://www.w3.org/2000/svg";

    let chart = document.createElementNS(svg, "svg");
    chart.setAttribute("width", width);
    chart.setAttribute("height", height);
    chart.setAttribute("viewBod", `0 0 ${width} ${height}`);

    chart.setAttribute("font-family", "sans-serif");
    chart.setAttribute("font-size", "18");

    let labels = Object.keys(data);
    let values = Object.values(data);
    // add up the values to properly scale chart.
    let total = values.reduce((x,y) => x + y)

    // figuring out the angles for the slices.
    let angles = [0];
    values.forEach((x,i) => angles.push(angles[i] + x/total * 2 * Math.PI))

    values.forEach((value, i) => {
        // start i
        let x1 = cx + r * Math.sin(angles[i]);
        let y1 = cx - r * Math.cos(angles[i]);
        // end i+1
        let x2 = cx + r * Math.sin(angles[i+1]);
        let y2 = cx - r * Math.cos(angles[i+1]);

        // angles larger than half a circle needed for arcs
        let big = (angles[i+1] - angles[i] > Math.PI) ? 1 : 0;

        // describe how to draw a slice of the pie chart:
        let path = `M${cx},${cy}` +     // move to circle center.
            `L${x1},${y1}` +            // draw line to (x1,y1).
            `A${r},${r} 0 ${big} 1` +   // draw an arc of radius r...
            `${x2},${y2}` +             // ...ending at to (x2,y2).
            "Z";                        // close path back to (cx,cy).

        // compute the CSS color for a slice.
        let color = `hsl(${(i*40)%360},${90-3*i}%,${50+2*i}%)`;

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
    });

    return chart;
}

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