$(document).ready(function () {

    var urlArray = [];
    var responseArray = [];

    function processImage() {

        // Replace the subscriptionKey string value with your valid subscription key.
        var subscriptionKey = "b23434428c4d49d8a925cf2c0d434cbc";

        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

        // Request parameters.
        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "emotion",
        };

        // Display the image.
        var sourceImageUrl = document.getElementById("URLInput").value;
        // document.querySelector("#sourceImage").src = sourceImageUrl;
        urlArray.push(sourceImageUrl);
        // console.log(urlArray);




        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            // $("#responseTextArea").val(JSON.stringify(data, null, 2));
          
            // variable that goes deeper into response data
            var emotionData = data[0].faceAttributes.emotion;
            // console.log(emotionData);

            // variable to set threshold for alert
            var threshold = parseFloat(.49);
            responseArray.push(emotionData);

            

            // array with only pertinent emotional data collected from response
            var emotionalTriggers = [emotionData.anger, emotionData.contempt, emotionData.disgust, emotionData.fear, emotionData.neutral, emotionData.sadness];
        

            // looping through selected response data
            for (var i = 0; i < emotionalTriggers.length; i++){
                  var emotionCheck = emotionalTriggers[i]
                

            // iterating through array to find what data falls above or below the threshold declared above
           
                if( emotionCheck < threshold){
                    console.log("yaaaay!!")
                } else {
                    console.log("NO!");
                };
            };
            
        })
    

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };

    $("#imgSub").on("click",function(){
        processImage();
    });

});