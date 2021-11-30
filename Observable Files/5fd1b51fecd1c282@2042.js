import define1 from "./357f1a71f976f173@821.js";
import define2 from "./26670360aa6f343b@202.js";
import define3 from "./a2166040e5fb39a6@229.js";
import define4 from "./e93997d5089d7165@2303.js";
import define5 from "./de1508b1ec37e4b2@1405.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["cleanFires.csv",new URL("./files/655a2604ace0ae829d7ce08db8471e9bbd4474be65205095b92e8da5dce184b98086512c1a965a06384aaf7e7d60b071d4dc1600bc31c95aae18b4f56b7db354",import.meta.url)],["NEWjoinedTable@1.csv",new URL("./files/d292dd0b1e16440c216bb4178825c003428fb96d9721b8556a79310746a13ea62aec93de4cebfcb1d1022aae675972a2d6722df0bae0bc66a1daef14faf9bca0",import.meta.url)],["neighborhoods@1.topojson",new URL("./files/2610c71a3a2ecdf5e4eb1e1e8fec7a2c3ba0003185dd6aa44b89d8a99b043f720a910fbc9de412c2415ab75bc9b673fb578d1e172f46755f9ce54747d3b6f26b",import.meta.url)],["joinedTable-9.csv",new URL("./files/3a1763080d6d3f511f903204adb3dc30d5516951318de2a45b058d16ffd852a740d0773289ee458e06e48edbcdb40efa840f11f2545be7866d43bdee4428a692",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Fire Incidents in the City of Pittsburgh`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`By Fernanda Molina and Andrea Wan`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<hr>
## Overview`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Introduction`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Recently (in October) it was Fire Prevention Month, a month dedicated to raising awareness about fire safety. While the elementary school slogan "stop, drop, and roll" is both memorable and useful, there are additional fire safety techniques that can come in handy depending on each specific situation.

This interactive narrative visualization seeks to explore the different fire incidents which have occurred in the city of Pittsburgh. Understanding which types of fire incidents occur, as well as where and how often they occur, shed light on why fire incidents happen in our local community.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Purpose and Intended Audience`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Understanding why and how fire incidents occur is instrumental to our goals of raising awareness on fire safety and educating the public on relevant safety techniques. The data analysis provided here makes clear which fire incidents are most common, and subsequently, which fire safety techniques are most relevant to the local community. `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Data`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The data we are analyzing is provided by the Western Pennsylvania Regional Data Center and includes various parameters related to incidents of fire responded to by the Pittsburgh Bureau of Fire beginning in January 2013 (and updated as late as November 2021). It includes information about the type of incident, the number of alarms, as well as location information such as longitude, latitude, and neighborhood.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Research Questions`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The questions we will be answering in this article are the following:
1. How have fire incidents changed throughout the years? Have there been improvements?
2. How do fire incidents vary from neighborhood to neighborhood? Are there certain types of incidents which occur more commonly in certain areas?
3. What types of fire incidents are more common, and where do they occur?`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<hr>
## Visualizations`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The total count of fire incidents in Pittsburgh throughout the years fluctuates. Looking at the chart below we can see that 2015 has the most amount of fire incidents totaling 1,027, while 2021 has the least amount of fire incidents. However, the data for 2021 does not include the full month of November or the month of December. Therefore, 2019 is the second year that has the least amount of fire incidents.`
)});
  main.variable(observer("vis4")).define("vis4", ["vl","incidentSumPerYear"], function(vl,incidentSumPerYear){return(
vl.markBar()
  .width(500)
  .height(500)
  .data(incidentSumPerYear)
  .encode(
    vl.x().fieldN('year').scale({zero: false}),
    vl.y().fieldQ('total'),
    vl.tooltip([
      { field: "total", type: "quantitative" },
      { field: "year", type: "quantitative" }
    ])
  )
  .render()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**This highlights how the frequency of fire incidents has decreased throughout the years. Thus, this suggests that people are taking better precautions and this may indicate that the City of Pittsburgh has been working to amend the fire safety guidelines that are communicated to the community.**`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`To explore the chart above, hover over each bar chart to see the total number of fire incidents per year.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**What is the breakdown of fire incidents per neighborhood in the City of Pittsburgh?**`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`In the city of Pittsburgh, there are around 90 neighborhoods, and the amount of fires they encounter each year varies. We queried the data to categorize the incidents by neighborhood and year because the original dataset did not record the total incidents by neighborhood.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Use the "Select" button to see the average total incidents per neighborhood filtered by year.`
)});
  main.variable(observer("vis1")).define("vis1", ["vl","yearArr","newJoined"], function(vl,yearArr,newJoined)
{ 
  const selectYear = vl.selectPoint('Select')
    .fields('year')          // limit selection by one value for now
    .bind(vl.menu(yearArr));  
  
  return vl.markBar()
    .data(newJoined)
    .params(selectYear)
    .transform(vl.filter(selectYear))
    .encode(
      vl.y().average("totalIncidentsperneigh")
       .scale({type: 'linear', domain: [0, 45]})
       .title('Average Total Incidents Per Neighborhood'),
      vl.x().fieldN("neighborhood")
        .sort(vl.average("totalIncidentsperneigh").order('descending'))
       .title('Neighborhood'),
      vl.tooltip().average("totalIncidentsperneigh"),
      //vl.opacity().if(selectYear, vl.value(0.9)).value(0.2)
    )
    .width(1070)
    .height(400)
    .render();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`For all years except 2020, Carrick is in the top three neighborhoods with the highest average total incidents, while Squirrel Hill South is among the top ten. This might imply that a large number of residences or apartment complexes are prone to fires. However, these areas may have a high concentration of restaurants, making fires more likely.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**This raises the question: what types of fire incidents are these neighborhoods facing each year? **

Since the dataset did not show the total number of incidents by type, year, or neighborhood, SQL queries were created to look for this information.

Take a look at the heatmap below; it shows the year that neighborhoods have the highest number of fire incidents and clicking on a specific neighborhood and year filters the scatterplot below. The scatterplot specifically shows what type of fire incident that neighborhood faced that year. Hovering over the fire incident type shows how many incidents of that type there were that year.`
)});
  main.variable(observer("vis2")).define("vis2", ["VegaLite","newJoined"], function(VegaLite,newJoined){return(
VegaLite({
  data: {values: newJoined},
  vconcat: [
    //heatmap
    {
      data: {values: newJoined},
      layer: [{ 
          mark: {type: "rect"}, // The tooltip shows the data as a pop-up
          selection: {
            pts: {type: "multi", on:"click", encodings:["x", "y"]} // "mouseover" will allow for hovering; "click" is just a click
          },
          encoding: {
            y: {field: "year", type: "nominal", title: "Year"}, // y axis
            x: {field: "neighborhood", type: "nominal", title: "Type"}, // x axis
            tooltip:[
              {field: "year", type: "nominal"},
              {field: "totalIncidentsperneigh", type: "quantitative", title: "Total Incidents Per Neighborhood"},
              {field: "neighborhood", type: "nominal", title: "Neighborhood"}
              ],
            color: {
              condition: {
                selection: "pts", // if cell is clicked, it is in "pts" and will be coloured
                field: "totalIncidentsperneigh", type: "quantitative",
                scale: {scheme: "blueorange"},
                legend: {orient: 'top'}
              }, // condition
              value: "gray" // everything else is gray
            }
        //color
          }, //encoding 
            width: 800

      }] // layer,layer
    },
    //------------------------------------------------------------------------
    //scatterplot
    {
      layer: [{  
        transform: [ {filter: {selection: "pts"}}],
        mark: {type:"square", filled:true},
        selection: {brush: {type: "interval"}},
        encoding: {
          x: {field: "totalIncidentsPerType", type: "quantitative", scale: "linear", "domain": [0, 27], title:'Total Incidents Per Neighborhood'}, // y axis
          y: {field: "type_description", type: "nominal", title: "Type"}, // x axis
          tooltip: [
            {field: "neighborhood", type: "nominal", title: "Neigborhood"},
            {field: "type_description", type: "nominal", title: "Type Description"},
            {field: "totalIncidentsPerType", type: "quantitative", title: "Total Incidents Per Type"},
            {field: "year", type: "nominal"}
        ]
        },
        width: 800,
        height: 800
      }]
    }] //hconcat, vegalite
  //------------------------------------------------------------------------
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`From the scatterplot, it can be seen that "Cooking fire", "Building fire", and "Passenger vehicle fire" are the most common types of fire incidents in neighborhoods. This is not surprising as driving and cooking are common day-to-day activities for most people, and - especially in more recent times due to the pandemic - more people spend longer periods of time isolating indoors.

Furthermore, the heatmap shows 2016 was the year in which two neighborhoods - Central Business District and South Side Flats" faced the most amount of fires from 2013-2021. `
)});
  main.variable(observer("vis3")).define("vis3", ["vl","yearArr","neighborhoods","newJoined"], function(vl,yearArr,neighborhoods,newJoined)
{
  const selectYear = vl.selectPoint('Select')
    .fields('year')
    .bind(vl.menu(yearArr));
  
  const bg = vl.markGeoshape({stroke: "grey", fill: "lightgrey"})
  .data(vl.topojson(neighborhoods).feature("neighborhoods"))
  .encode(vl.tooltip("properties.hood"))

  const incidents = vl.markPoint({filled: true, size: 12})
  .data(newJoined)
  .params(selectYear)
  .transform(vl.filter(selectYear))
  .encode(
    vl.latitude().fieldQ("latitude"),
    vl.longitude().fieldQ("longitude"),
    vl.color().fieldN("type_description"),
    vl.tooltip().fieldN("type_description")
  )

  return vl
    .layer(bg, incidents)
    .project(vl.projection("mercator"))
    .width(720)
    .height(720)
    .render();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`From the map, it can be seen that there are not drastically high concentrations of fire incidents within neighborhoods. The majority of neighborhoods that have fire incidents have them throughout the neighborhood. This means that in general, people living within the same neighborhood, or operating restaurants and other businesses in the same vicinity, experience nearly the **same risks of encountering a fire incident.**

Therefore, it is important to educate everyone in the community about fire safety and awareness.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<hr>
## Basic Guide to Fire Safety`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`In fire incidents, mere seconds can mean the difference between a safe escape and a tragedy. In the following section, we will introduce the different types of fire incidents that have occurred in the city of Pittsburgh, and discuss fire safety and prevention techniques.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Fire Classes`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Fires can be classified based on the materials that are burning. Fires of different classes use different fire extinguishers, and may have different safety techniques involved.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Class A Fires`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Class A fires are the most common type of fires in everyday households, and the most easy to put out. These fires occur when commonly flammable material, such as wood, plastics, paper, and rubbish catch on fire.

These fires can be put out with water.`
)});
  main.variable(observer()).define(["htl"], function(htl){return(
htl.html`<iframe width="560" height="315" src="https://www.youtube.com/embed/sSXzD0-AjWg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`*A short video counter of the total number of dumpster/rubbish-related fires in the dataset*`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Class B Fires`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Class B fires are fires that occur when flammable liquids or gases - such as petroleum-based oils and paints, kerosene, gasoline, butane, and propane - catch on fire. This type of fire is more common in industry settings, where such ingredients are more likely to be present.

Do NOT use water on Class B fires! Using water on class B fires can be extremely dangerous. Instead, when putting out Class B fires, the goal should be to reduce the amount of oxygen feeding the fire. Class B Fire extinguishers use dry chemicals such as ammonium phosphate, whose chemical composition is shown below.`
)});
  main.variable(observer()).define(["htl"], function(htl){return(
htl.html`<iframe style="width: 500px; height: 300px;" frameborder="0" src="https://embed.molview.org/v1/?mode=balls&cid=24402"></iframe>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`*Use the 3D viewer above to explore the chemical composition of Ammonium dihydrogen phosphate, which is used in fire extinguishers for this class!*`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Class C or E Fires `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Class C fires (Class E in Australia) are electrical fires which occur due to malfunction of appliances and equipment. This can include common household items such as toasters, washers, and dryers, as well as industrial equipment in business settings.

As with Class B fires, Class C fires should not be put out with water, because water conducts electricity. Instead, use a fire extinguisher (multipurpose fire extinguishers for Classes A, B, and C are commonly available).`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Class D Fires`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Class D fires are less common in everyday settings as they involve combustible metals, but can still happen.

An example of a possible cause for class D fires would include electronic devices, such as mobile phones, laptops, and desktop computers, which contain lithium.

Class D fire extinguishers are different from multi-purpose Class A, B, and C fire extinguishers, and are typically only required for industrial settings, although regional ordinances may vary. In the city of Pittsburgh, Class D fire extinguishers are not required for residential settings.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Class K or F Fires`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Class K fires (Class F in Europe and Australia) are cooking fires, which typically occur as the result of cooking oils like grease, vegetable oil or animal fats.

Water should not be used to put out Class K fires. Streams of water may further disperse the fuel, causing the fire to spread. Instead, the goal should be to reduce the spread of fuel and oxygen intake.

Class K fire extinguishers are common in commercial kitchens, and are used to prevent the further spread of fire in the food service and restaurant industry.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<hr>
## Imports`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### DuckDB`
)});
  const child1 = runtime.module(define1);
  main.import("DuckDBClient", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`### Vega-Lite`
)});
  const child2 = runtime.module(define2);
  main.import("vl", child2);
  main.variable(observer("VegaLite")).define("VegaLite", ["require"], function(require){return(
require("vega-embed@5")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### D3`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6', 'd3-geo-projection', "d3-dsv@1")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Three.js`
)});
  main.variable(observer("THREE")).define("THREE", ["require"], async function(require)
{
  const THREE = window.THREE = await require("three@0.96/build/three.min.js");
  await require("three@0.96/examples/js/controls/OrbitControls.js").catch(() => {});
  await require("three@0.96/examples/js/loaders/MTLLoader.js").catch(() => {});
  await require("three@0.96/examples/js/loaders/OBJLoader.js").catch(() => {});
  return THREE;
}
);
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Additional Utilities`
)});
  const child3 = runtime.module(define3);
  main.import("printTable", child3);
  const child4 = runtime.module(define3);
  main.import("uniqueValid", child4);
  const child5 = runtime.module(define4);
  main.import("select", child5);
  const child6 = runtime.module(define5);
  main.import("youtubePlayer", child6);
  main.variable(observer("yearArr")).define("yearArr", function(){return(
["2013", "2014", "2015","2016", "2017", "2018","2019", "2020", "2021"]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Inserting Data`
)});
  main.variable(observer("fires")).define("fires", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("cleanFires.csv").csv({typed: true})
)});
  main.variable(observer("neighborhoods")).define("neighborhoods", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("neighborhoods@1.topojson").json()
)});
  main.variable(observer()).define(["Inputs","fires"], function(Inputs,fires){return(
Inputs.table(fires)
)});
  main.variable(observer("test")).define("test", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("joinedTable-9.csv").csv()
)});
  main.variable(observer("newJoined")).define("newJoined", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("NEWjoinedTable@1.csv").csv()
)});
  main.variable(observer()).define(["Inputs","newJoined"], function(Inputs,newJoined){return(
Inputs.table(newJoined)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<hr>
## Data Wrangling using DuckDB and SQL`
)});
  main.variable(observer()).define(["client1"], function(client1){return(
client1.describe('cleanFires')
)});
  main.variable(observer("client1")).define("client1", ["DuckDBClient","FileAttachment"], async function(DuckDBClient,FileAttachment){return(
DuckDBClient.of([
  await FileAttachment('cleanFires.csv')
  ])
)});
  main.variable(observer("client2")).define("client2", ["DuckDBClient","FileAttachment"], async function(DuckDBClient,FileAttachment){return(
DuckDBClient.of([
  await FileAttachment("joinedTable-9.csv")
  ])
)});
  main.variable(observer()).define(["client2"], function(client2){return(
client2.describe('joinedTable@9')
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<hr>
### By Type`
)});
  main.variable(observer()).define(["client1"], function(client1){return(
client1.table(`SELECT date_part('year', alarm_time) as year, type_description, incident_type, count(column00) as total 
                FROM 'cleanFires'
                GROUP BY year, type_description, incident_type
                ORDER BY Year ASC`)
)});
  main.variable(observer("incidentSumPerType")).define("incidentSumPerType", ["client1"], function(client1){return(
client1.query(`SELECT date_part('year', alarm_time) as year, type_description, incident_type, count(column00) as total 
                FROM 'cleanFires'
                GROUP BY year, type_description, incident_type
                ORDER BY Year ASC`)
)});
  main.variable(observer()).define(["md"], function(md){return(
md` <hr>
### By Neighborhood`
)});
  main.variable(observer()).define(["client2"], function(client2){return(
client2.table(`SELECT year, neighborhood, count(column00) as totalPerNeigh
                FROM 'joinedTable@9' 
                GROUP BY year, neighborhood
                ORDER BY totalPerNeigh DESC`)
)});
  main.variable(observer("incidentSumPerNeigh")).define("incidentSumPerNeigh", ["client2"], function(client2){return(
client2.query(`SELECT year, neighborhood, count(column00) as totalPerNeigh
                FROM 'joinedTable@9' 
                GROUP BY year, neighborhood
                ORDER BY totalPerNeigh DESC`)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<hr>
### By Year`
)});
  main.variable(observer()).define(["client2"], function(client2){return(
client2.table(`SELECT year, count(column00) as total
              FROM 'joinedTable@9'
              GROUP BY year`)
)});
  main.variable(observer("incidentSumPerYear")).define("incidentSumPerYear", ["client2"], function(client2){return(
client2.query(`SELECT year, count(column00) as total
              FROM 'joinedTable-9'
              GROUP BY year`)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<hr>
## References`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.uclahealth.org/safety/classes-of-fires--fire-extinguishers`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://pittsburghpa.gov/pli/pli-top-ten-violations`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.ehs.pitt.edu/fire-safety`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.ehs.pitt.edu/section-ii-fire-safety`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.ready.gov/home-fires`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://vanguard-fire.com/what-are-the-5-different-classes-of-fires/`
)});
  return main;
}
