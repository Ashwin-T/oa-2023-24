const graphDiv = document.getElementById("graph");

fetch(
    "http://localhost:3000/",
    {
        method: "GET",
        headers: {
            "Origin": "http://localhost:5500"
        }
    }
)
.then(async res => {
    if (res.ok) {
        const data = await res.json();

        // Extract data from the response
        const aCountPerTerm = data.aCountPerTerm;
        const totalPeoplePerTerm = data.totalPeoplePerTerm;

        // Generate years since 2018 as x-axis values
        const yearsSince2018 = Array.from({ length: aCountPerTerm.length }, (_, i) => 0 + i);

        // Create traces for the two graphs
        const aCountTrace = {
            x: yearsSince2018,
            y: aCountPerTerm,
            type: 'scatter',
            name: 'A Count of CS 400'
        };

        const totalPeopleTrace = {
            x: yearsSince2018,
            y: totalPeoplePerTerm,
            type: 'scatter',
            name: 'Total People Taking CS 400'
        };

        // Create a layout for the graphs
        const layout = {
            title: 'The Number of A\'s in CS 400 Over Time',
            xaxis: {
                title: 'Semester since Spring 2018'
            },
            yaxis: {
                title: 'Values'
            }
        };

        // Create the Plotly graph with the traces and layout
        Plotly.newPlot(graphDiv, [aCountTrace, totalPeopleTrace], layout);
    } else {
        console.error("Failed to fetch data:", res.statusText);
        // Handle the error as needed
    }
})
.catch(error => {
    console.error("Error while fetching data:", error);
    // Handle the error as needed
});