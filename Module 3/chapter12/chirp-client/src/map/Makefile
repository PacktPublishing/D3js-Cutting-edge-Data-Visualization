# LAND_URL = http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/physical/ne_50m_land.zip
# LAND_URL = http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/110m/physical/ne_110m_land.zip

ADMIN0 = http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/110m/cultural/ne_110m_admin_0_countries.zip

ne_110m_admin_0_countries.zip:
	curl -LO $(ADMIN0)

ne_110m_admin_0_countries.shp: ne_110m_admin_0_countries.zip
	unzip ne_110m_admin_0_countries.zip
	touch ne_110m_admin_0_countries.shp

countries.geojson: ne_110m_admin_0_countries.shp

	# Remove the Antartica
	ogr2ogr -f GeoJSON countries.geojson ne_110m_admin_0_countries.shp -where "sov_a3 != 'ATA'"

countries.json: countries.geojson
	topojson -o countries.json countries.geojson

clean:
	rm ne_110m_admin_0_countries*
	rm countries.*