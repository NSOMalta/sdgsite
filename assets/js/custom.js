<script>
  const button = document.getElementById('map-4');
  const button2 = document.getElementById('map-8');
  const updateMap = document.getElementById('updateMap');

  button.addEventListener('click', function() {
    updateMap.innerHTML =  `
      <iframe src="https://msa-mt.maps.arcgis.com/apps/instant/basic/index.html?appid=752d577fddc946e3876d21dbb6e73ff4&level=11" 
              frameborder="0" 
              style="border:0; width:100%; height:600px;" 
              allowfullscreen>
        iFrames are not supported on this page.
      </iframe>`;
  });
  
  button2.addEventListener('click', function() {
    updateMap.innerHTML =  `
      <iframe src="https://msa-mt.maps.arcgis.com/apps/instant/basic/index.html?appid=567a7e5073ca486fa6979dc7e9f27022&level=11" 
              frameborder="0" 
              style="border:0; width:100%; height:600px;" 
              allowfullscreen>
        iFrames are not supported on this page.
      </iframe>`;
  });
</script>

