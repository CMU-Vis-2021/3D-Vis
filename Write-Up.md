# Narrative-Based Interactive Visualization Using Data on Fire Incidents in the City of Pittsburgh

## Introduction
It was Fire Prevention Month in October, a month dedicated to improving fire safety awareness. This interactive narrative visualization attempts to investigate the many fire occurrences that have happened in Pittsburgh. Understanding the many types of fires that occur, as well as where and how frequently they occur, sheds insight on why fires occur in our community. The data analysis presented here reveals which fire incidents are the most prevalent, and hence which fire safety methods are most important to the community. The data we're looking at comes from the Western Pennsylvania Regional Data Center and contains a variety of criteria linked to fires that the Pittsburgh Bureau of Fire has responded to since January 2013.

## Related Work
Data-driven storytelling has increased in popularity in recent years. Various journalism outlets, including *The New York Times* and *Wall Street Journal*, have dedicated graphics departments that consistently develop new and interesting methods for data visualization. Many of these methods include some manner of interaction and animation, which are deployed via Javascript libraries. 

*The New York Times* has made available interactive map visualizations to track wildfires, including [one which allows their readers to track wildfires in the West](https://www.nytimes.com/interactive/2021/us/wildfires-air-quality-tracker.html).

*The Wall Street Journal* published [an interactive, scroll-based visual storytelling article which helped to visualize and explain the post-fire repair process of the Notre Dame cathedral](https://www.wsj.com/graphics/notre-dame-fix/), as well as its ongoing progress during the coronavirus pandemic.

These example narrative visualizations are intriguing because they are educational, and because they are meant to educate the general public about the nature of fires and how they impact our society and our daily lives. We chose a similar topic, looking at a dataset close to home because we felt that understanding the types of fire incidents that occur in our community is instrumental to the goals of raising awareness and improving general public knowledge regarding fire safety.

## Methods
The narrative visualization makes use of a variety of different techniques. We first began by looking at the raw dataset in the fires.csv to understand how we wanted to manipulate the data using DuckDB/SQL. From an initial glance at the dataset, we knew that incident_type, type_description, alarm_time, neighborhood, as well as longitude and latitude, were going to be the most useful variables for us to be able to have a good narrative.

For the DuckDB/SQL, we extracted the year from the date_time column as it has the month, day, year all in one. From there, we queried the number of total incidents per year and type. From there we began to make the heatmap that had cross-filtering with the scatterplot. As we were working on that visualization, we realized we needed a count of the total incidents per year and neighborhood for the neighborhood, so that was the second query we made. The incidents per neighborhood and year came in handy when making visualization two that allows users to filter the average total incidents per neighborhood by year. 

In order to use the calculation for the number of incidents per type, year, and neighborhood, we needed to make those additional columns in the original dataset. To do that, we had to create load files and connect our SQL query to psycopg through a jupyter notebook. 

The calculation for the counter in the 3D animation was done manually based on the “by type” table. Although the data was mostly clean, there were certain category type descriptions that were only used in certain years, and there were also similar descriptions that could have been consolidated due to their similar nature. As far as trash fires, we included “outside rubbish, trash, or waste fire,” “dumpster or other outside trash receptacle fire,” “outside stationary compactor/compacted trash fire,” and other similar categories. This would have been difficult to do via SQL due to the variability and the dataset was small enough such that we could manually determine the sum based on existing queries.
 
Overall, the process of calculating and extracting specific data from the original dataset through SQL queries required us to have to constantly upload new CSV files with the added columns. Furthermore, in the process of creating the visualizations, we had to reference other examples of making basic bar charts, heatmaps, and scatterplots in Vega-lite. After making the big picture of our visualizations, substantial time was spent figuring out how to add tooltips, change color, or fix the filtering functions.

In addition to the use of Vega-Lite and DuckDB for SQL queries, we utilized a viewer which displayed molecular files (MDL Molfile) in 3D. Originally this was created manually in Maya, and we sought to implement it via Three.js. However, due to time constraints and technical difficulties with displaying OBJ files and GLTF files with materiality (for some reason Observable does not always load .mtl files), we opted to include it with the help of an existing tool.

The video animation was also initially supposed to be a Three.js implementation, with interactive components, such that it would activate on-scroll, similar to most “scrollytelling” methods employed in narrative visualization. The model is modified from a Google Poly model available online, and the fire simulation is created using fluid effects in Maya, which allows for the simulation of fire, liquids, and gases. Since fluid effects is a tool specific to Maya, in order to export the 3d model to a WebGL-friendly format, we would have to export it as polygons. Ideally, the fluid simulation would have been converted to polygons, and the shader/material would have been something that could have been baked as a texture and exported as an image. However, this did not work as intended, so the animation was instead rendered as a video, and the counter was added using Adobe Premiere Pro.

### Graphic Representation and Chart Typology
A large portion of data visualization is focused on the different methods of visual encoding. In the consideration of visual properties, we took care to choose appropriate chart typology for the representation of the data, use reasonable ratios in length and width of each graph and chart, select colors which are visually appropriate and accessibility-friendly (blue and orange are good colors for color-blind people), and vary opacities and select appropriate line weights for better readability. 

We also experimented with a few less conventional graphic representation methods, including an animation that combines a simple simulation and a counter, and an interactive 3D representation of a chemical compound.

#### Visualization 1 - Fire Incidents in Pittsburgh from 2013 - 2021
The use of bar charts to display comparative data throughout the years is not only appropriate but desirable because of its familiarity and readability. We have added tooltips that display the year and total count of fire incidents for each year on hover. This basic interaction further enhances the ease of access and readability of the chart.

Because the visualization utilizes a total count from the data, it provides an important overview as far as the range of the data, and its general trend (negative) throughout the years. Providing such an overview is equivalent to providing background information and context, which is crucial for understanding more detailed information. It is the precursor to “drilling down” data.

#### Visualization 2 - Fire Incidents by Year and Neighborhood
The second visualization is also a bar chart. It shows the number of fire incidents by neighborhood and year. We have included tooltips that display the total count of fire incidents for each neighborhood during a particular year on hover so as to improve the readability and ease of access to information.

The subject matter of the visualization itself is more specific than the first visualization; it offers the possibility of “filtering” and “zooming” into the data, both of which enhance the reader’s understanding and comprehension of the information presented.

#### Visualization 3/4 - Combined Visualization Showing Relationships Between Neighborhood, Year, and Fire Type
The third and fourth graphs form a combined visualization that allows the reader to better explore and understand the relationships between the different parameters in the dataset. We chose to include a heatmap, which more broadly represents when and where fire incidents occur, and a scatterplot, which provides more specific information about the type of fire - an important part of understanding which causes of fire are more common and which fire safety techniques are more relevant to the local community.

As with before, we have included tooltips that provide additional information and make the visualization more easily readable. On the heatmap, this includes information such as the year, total incidents in the neighborhood, and the name of the neighborhood, and on the scatterplot, it includes the neighborhood, type of fire, number of incidents, and year. We have also included a second feature that enables users to click on the heatmap; in doing so, they are able to filter to a specific year and neighborhood. This allows for data exploration by the readers, and also allows them to focus on areas of greater interest - such as neighborhoods and years which have abnormally high or low counts

#### Visualization 5 - Map Showing Location of Different Fires Throughout the Years
The fifth visualization consists of a map that shows the geographical location of individual fire incidents. Map visualizations are helpful for understanding distances and clustering of fire incidents (if they exist). Because the dataset includes latitude and longitude, it seemed appropriate to overlay these relative locations on a map showing the different neighborhoods in Pittsburgh. For people who are familiar with the geographical layout or relative locations of different neighborhoods, seeing a map can help them form associations with existing knowledge about where they personally reside or which places they frequent, and therefore, which types of fire incidents they should look out for.

## Results
Beginning with our initial visualization, we discovered that the year 2015 had the most fire incidences (1,027), while the year 2021 had the least. The data for 2021, however, does not include the entire month of November or the entire month of December. As a result, 2019 is the second year with the fewest fire incidences. This illustrates how the number of fire occurrences has reduced over time. As a result, this shows that individuals are taking more precautions, and it's possible that the City of Pittsburgh has been working to update the community's fire safety rules.

We were curious about the breakdown of fire incidents by neighborhood in Pittsburgh after seeing this visualization. The average total incidents per neighborhood, sorted by year, is the topic of visualization number two. Carrick is in the top three neighborhoods with the highest average total incidents for all years except 2020, while Squirrel Hill South is in the top 10. This might imply that a large number of residences or apartment complexes are prone to fires. However, these areas may have a high concentration of restaurants, making fires more likely.

To further dig into this topic of incidents in neighborhoods, visualization three with the heatmap and scatterplot allows us to understand the types of fire incidents these neighborhoods are facing each year. The most prevalent forms of fire incidents in communities, according to this visualization, are "cooking fire," "building fire," and "passenger car fire." This is not surprising, given that driving and cooking are normal day-to-day activities for most individuals, and more people are spending longer amounts of time indoors, especially in recent years owing to the pandemic. Furthermore, the heatmap revealed that from 2013 to 2016, two districts - the Central Business District and the South Side Flats - saw the highest number of fires. 

We also thought that it would be interesting for the user to be able to visualize the incident types in the neighborhood on a map of Pittsburgh. The map shows that there aren't any neighborhoods with a disproportionately high number of fire events. The bulk of neighborhoods with fire incidences have fires all over the place. This implies that people who live in the same neighborhood or who own and operate restaurants and other businesses in the same area are at roughly the same risk of being involved in a fire.

Based on previous visualizations, it was clear that one of the most common fire incident types were rubbish, dumpster, and fires, which make up a vast majority of fires in Class A. Additionally, this was a category which had many different descriptions in the dataset. By consolidating the information manually and creating an animated, pictorial representation with a single number, we were able to highlight the significance of trash fires and bring it to the attention of the readers.

## Discussion
A common thought when it comes to fires is to follow the “stop, drop, and roll” technique. However, from our dataset, we can see that there are other fire safety techniques that come in handy depending on the type of incident. While different neighborhoods in Pittsburgh face a trend of different incident types, the fire safety guidelines given out by the City of Pittsburgh should be rather lengthy.

After analyzing the various types of incidents the neighborhoods of Pittsburgh face, we were able to craft a basic guide of fire safety that has various prevention techniques. We broke down the fire incident types into six classes (A, B, C, D,  E, F, K). Through the map and heatmap/scatter plot visualization, we found that Class A fires are most common as they are common household fires. In order to stop these fires, water is the key “ingredient.” We also found Class B, C, E, F, and K fires to be common too, but for these types of fires, water could make the flammable liquids or gases more dangerous or increase the fires if electricity is involved. Lastly, we found Class D fires to be less common as they involve combustible metals, which can be found in laptops or mobile phones.

Another major insight we found from our exploration was that the number of fire incidents has decreased since 2013 and most neighborhoods have an average of 10-20 fire incidents per year, with some outliers having about 40 fire incidents in a year. Overall, regardless of the neighborhood, fire incidents of all types are highly likely anywhere. Therefore, it is important for community members and the community to be aware of the different ways to tackle these incidents.

## Further Work
The Observable notebook contains various examples of how charts and graphs become interactive and animated in a way that is more engaging and easy to understand for readers. Data can be presented in a manner which tells a story.

Given time and feasibility constraints (as well as limitations with programming skills and familiarity with JQuery), we were unable to implement a full website in scrollytelling format and Three.js as we tried to initially.

Further work would include using HTML and CSS to create the basic layout and style of a website (most likely with Bootstrap and JQuery), and the use of a scrollytelling library such as scrollama.js, scrollstory, waypoints, graph-scroll.js, or two-step.js (from Wall Street Journal). If we were to place the text portions in articles/section tags and implement the Vega-Lite visualizations in separate divs which would activate or animate on scroll, we would have a more cohesive article where the website itself was interactive as well, in addition to having individual, interactive modules.

As far as the venture into 3D for narrative visualization, it would be nice to create an interactive visualization where there was a pictorial representation of different types of fires in 3D,  and a drag-and-drop mouse interaction with water, fire extinguishers, etc., which would be a fun way to quiz the user and test their knowledge. The mouse interactions could be done using event listeners without too much difficulty, but the difficulty with the 3D portion would be in handling fire, which would not be represented in polygons, but as part of a particle simulation, which is quite expensive and difficult to do on the web. Future work probably would entail using something like Unity to make a WebGL version of this, rather than manual coding in Javascript, due to the complexity involved.