// Wait until the webpage has fully loaded
window.addEventListener('load', () => {

    // When the 'Upload Cat Photos' button is clicked
//     document.getElementById('photo-upload-btn').addEventListener('click', () => {
//         console.log("photo-upload-btn clicked");
//         // Show the photo upload section
//         document.getElementById('photo-upload-section').style.display = 'block';
//         // Hide the map section
//         // document.getElementById('map-section').style.display = 'none';

//         // document.getElementById('submit-photo').addEventListener('click', () => {
//         //     console.log("submit-photo worked");
//         //     let photos = document.getElementById('cat-photo-input').files;
//         //     console.log(photos);
//         //     // * send 'photos' object over to server using post request. 

//         // });
//     });

    // When the 'Submit Photos' button is clicked
//     document.getElementById('submit-photo').addEventListener('click', () => {
//         console.log("submitted")
//         // Get the files (photos) object
//         let userPhotoObj = document.getElementById('cat-photo-input').files[0];
//         console.log(userPhotoObj);

//         // object convert to blob
//         let photoURL = URL.createObjectURL(userPhotoObj);
//         console.log(photoURL);


//         // * send 'photos' object over to server using post request. 
//         fetch('/objects', {
//             method: 'POST',
//             header: { 'Content-Type': 'application/json' },
//             body: photoURL
//         }).then(response => response.json())

//     });
  
  let latlng;
  
  
    function addPointToMap(latlng) {
      const marker = L.marker(latlng).addTo(map)
        .bindPopup('<b>Hello world!</b><br />I am a popup.');
    }


    function onMapClick(e) {
      latlng = e.latlng;
      addPointToMap(latlng);
      
    }
  
  map.on('click', onMapClick);


    // When the 'submit information' button is clicked
    document.getElementById('submit-cat-info').addEventListener('click', async () => {
        let Description = document.getElementById('cat-description-input')
        console.log(Description.value)
        let healthCondition = document.getElementById('cat-health-input')
        console.log(healthCondition.value)
      
        const base64 = await convertToBase64('cat-photo-input')

        let infoObj = {
            desData: Description.value,
            healthData: healthCondition.value,
            photo: base64,
            latlng,
        }
        console.log(infoObj)

        //convert the object into a string
        let jsonData = JSON.stringify(infoObj);
        //console.log(jsonData)

        // * send cat info over to server using post request. 

     // *** send collected data back to server
      
      document.getElementById('submit-cat-info').disabled = true;
      
     fetch('/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // sending
        body: jsonData
    })
        .then(response => response.json())
        .then(data => {
         if (data.result === 'success') {
           window.location = '/results.html';
         } else {
           alert('cannot save data');
         }
       
         document.getElementById('submit-cat-info').disabled = false;
        })


    });




    //mayuqian
    //function submitDescription({
    //cons intoEL= document.getElementById('description')});
    //console.log(inputEL.value);

    //let obj = {
    //"title" : "The" + selectedAdj +""+ selectedNoun,
    //"description": inputEl.value,
    // "img": canvas.toDataURL('image/jpeg')
    //};

    //stringfy the object
    // let jsonData = JSON.stringify(obj);




    //app.js:save user input:health/location/description as three variables 
    //     function saveUserInput() {
    //         var catDescription = document.getElementById('cat-description-input').value;
    //         var catHealth = document.getElementById('cat-health-input').value;
    //         var catLocation = document.getElementById('cat-location-input').value;

    //         // Now you have the inputs saved in variables
    //         console.log("Description:", catDescription);
    //         console.log("Health Conditions:", catHealth);
    //         console.log("Location:", catLocation);


    //         var submitButton = document.getElementById('submit-cat-info');
    //         if (submitButton) {
    //             submitButton.addEventListener('click', function () {
    //                 saveUserInput();
    //             });
    //         } else {
    //             console.error("Submit button not found");
    //         }
    //     }

    //     //index.js save it as obj let obj={} yes
    //     //index.js db.push yes

});

async function convertToBase64(imgId) {
    return new Promise((resolve, reject) => {
        var fileInput = document.getElementById(imgId);
        if (!fileInput.files[0]) {
            reject("No file selected");
            return;
        }

        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onloadend = function() {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}
