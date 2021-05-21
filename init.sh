#! bin/bash
#

# wget  http://download.geofabrik.de/
docker run -t -v d:/Dev/poolERM/osrm:/data osrm/osrm-backend osrm-extract -p /opt/car.lua /data/socal-latest.osm.pbf

docker run -t -v d:/Dev/poolERM/osrm:/data osrm/osrm-backend osrm-partition /data/socal-latest.osrm
docker run -t -v d:/Dev/poolERM/osrm:/data osrm/osrm-backend osrm-customize /data/socal-latest.osrm