const coordinates = mapCoordinates?.geometry?.coordinates;

if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    console.error("Cannot display map: listing coordinates are missing or invalid.");
} else {
    const map = new mapboxgl.Map({
        accessToken: maptoken,
        style: 'mapbox://styles/mapbox/streets-v12',
        container: 'map',
        center: coordinates,
        zoom: 10
    });

    const popup = new mapboxgl.Popup({offset: 25})
        .setHTML(`<h1>${mapCoordinates.location}</h1><p>Exact location will be provided after booking</p>`)
        .setMaxWidth("300px");

    new mapboxgl.Marker({
        color: "#d86e12",
        draggable: true
    }).setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map);
}