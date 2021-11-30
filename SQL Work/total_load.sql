DROP TABLE IF EXISTS totalPerNeigh;
CREATE TABLE totalPerNeigh (
neighborhood	Text	,
totalperneigh       integer,
year       integer	
);

\copy totalPerNeigh FROM 'totalPerNeigh.csv'  delimiter ','  csv header encoding 'ISO8859-1'