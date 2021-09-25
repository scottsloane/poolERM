
# wget  http://download.geofabrik.de/
# wget http://download.geofabrik.de/north-america/us/california/socal-latest.osm.pbf -OutFile ./osrm/socal-latest.osm.pbf
docker run -t -v d:/work/poolERM/osrm:/data osrm/osrm-backend osrm-extract -p /opt/car.lua /data/socal-latest.osm.pbf

# docker run -t -v D:\work\poolERM\osrm:/data osrm/osrm-backend osrm-partition /data/socal-latest.osrm
# docker run -t -v D:\work\poolERM\osrm:/data osrm/osrm-backend osrm-customize /data/socal-latest.osrm