DROP TABLE IF EXISTS incidentSum;
CREATE TABLE incidentSum (
year    float8,
type_description   text,
incident_type   float8,
total  Integer);

\copy incidentSum FROM 'incidentSum.csv'  delimiter ','  csv header encoding 'ISO8859-1'