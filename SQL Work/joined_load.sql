DROP TABLE IF EXISTS joined;
CREATE TABLE joined (
column00	INTEGER,	
call_no	    VARCHAR	,
incident_type float8,
type_description	VARCHAR	,
address	       VARCHAR,
alarm_time	  TIMESTAMP,	
alarms	  INTEGER	,
primary_unit	VARCHAR,	
census_tract	float8,
neighborhood	Text	,
council_district	float8	,
ward	float8	,
tract	float8	,
public_works_division	float8	,
pli_division	float8	,
police_zone	float8,
fire_zone	VARCHAR	,
latitude	float8	,
longitude	float8,
year       integer,
total       integer	
);

\copy joined FROM 'joinedTable.csv'  delimiter ','  csv header encoding 'ISO8859-1'