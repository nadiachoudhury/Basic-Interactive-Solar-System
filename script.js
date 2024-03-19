document.addEventListener('DOMContentLoaded', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const svg = d3.select("#solar-system").append("svg")
                  .attr("width", width)
                  .attr("height", height);

    // Define the data for the planets, including name, image URL, orbit radius, size, and facts.
    const planets = [
        { name: "Mercury", url: "https://science.nasa.gov/wp-content/uploads/2023/11/mercury-messenger-globe-pia15162.jpg", orbitRadius: 175, size: 20, facts: "Mercury is 36.04 million miles from the sun."}, 
        { name: "Venus", url: "https://science.nasa.gov/wp-content/uploads/2023/09/Venus.jpg?w=4096&format=jpeg", orbitRadius: 265, size: 32, facts: "Venus is 67.24 million miles from the sun." }, 
        { name: "Earth", url: "https://media-cldnry.s-nbcnews.com/image/upload/msnbc/Components/Photo_StoryLevel/080708/080708-earth%20hmed-10a.jpg", orbitRadius: 375, size: 33, facts: "Earth is 92.96 million miles from the sun."}, 
        { name: "Mars", url: "https://science.nasa.gov/wp-content/uploads/2016/05/1-mars-nasa-gov-jpg.webp?w=4096&format=png&crop=1", orbitRadius: 490, size: 22, facts: "Mars is 141.6 million miles from the sun." }, 
        { name: "Jupiter", url: "https://cdn.mos.cms.futurecdn.net/Cvzdqd7AxLzjzQNoZaQVhC.jpg", orbitRadius: 625, size: 205, facts: "Jupiter is 483.8 million miles from the sun." }, 
        { name: "Saturn", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/800px-Saturn_during_Equinox.jpg", orbitRadius: 790, size: 195, facts: "Saturn is 890.8 million miles from the sun." },
        { name: "Uranus", url: "https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg", orbitRadius: 940, size: 60, facts: "Uranus is 1.784 billion miles from the sun." }, 
        { name: "Neptune", url: "https://science.nasa.gov/wp-content/uploads/2023/09/PIA01492.jpg", orbitRadius: 1080, size: 50, facts: "Neptune is 2.793 billion miles from the sun." },
    ];
    
    const sunSize = 300; 
    const sunUrl = "https://cdn.mos.cms.futurecdn.net/7JwpfUpwtJMzQnjqPjHAqS-1200-80.jpg";

    // Create a tooltip div for displaying planet names on hover.
    const tooltip = d3.select("#solar-system").append("div")
                      .attr("class", "tooltip");

    // Append an image element to the SVG for the sun, positioning it at the center of the screen.
    svg.append("image")
        .attr("xlink:href", sunUrl)
        .attr("x", 0) 
        .attr("y", height / 2 - sunSize / 2) 
        .attr("width", sunSize)
        .attr("height", sunSize);

    // Iterate over the planets array to draw each planet and its orbit.
    planets.forEach(planet => {
        svg.append("circle")
            .attr("cx", sunSize / 2)
            .attr("cy", height / 2)
            .attr("r", planet.orbitRadius)
            .style("fill", "none")
            .style("stroke", "white")
            .style("stroke-dasharray", "3,14");

        // Calculate the starting X position for the planet image on its orbit.
        const orbitStartX = sunSize / 2 + planet.orbitRadius - planet.size / 2;
        
        // Append an image element for the planet, positioning it on its orbit.
        const planetNode = svg.append("image")
                .attr("xlink:href", planet.url)
                .attr("x", orbitStartX)
                .attr("y", height / 2 - planet.size / 2)
                .attr("width", planet.size)
                .attr("height", planet.size)
                .on("mouseover", (event) => {
                    // Show the tooltip with the planet's name on mouseover.
                    tooltip.html(planet.name) 
                        .style("opacity", 0.9)
                        .style("left", `${event.pageX}px`)
                        .style("top", `${event.pageY - 28}px`);
                })
                .on("mouseout", () => {
                    tooltip.style("opacity", 0);
            });

            // Add a click event listener to open a new window with the planet's facts.
            planetNode.on("click", () => {
                // Check if the facts window for this planet has already been opened
                if (!planet.opened) {
                    const factsWindow = window.open("", planet.name, "width=400,height=200");
                    factsWindow.document.write(`<h1>${planet.name}</h1><p>${planet.facts}</p>`);
                    planet.opened = true; // Set the flag to true after opening the window
                }
            });
            
    });

    
});
