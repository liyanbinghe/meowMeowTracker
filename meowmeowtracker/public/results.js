function addPointToMap(latlng) {
      const marker = L.marker(latlng).addTo(map)
        .bindPopup('<b>Hello world!</b><br />I am a popup.');
    }


async function showPoints() {
  const res = await fetch('/info');
    const points = await res.json();
  console.log(points);
    points.forEach(p => {
      addPointToMap(p.latlng);
    });
}

showPoints();
