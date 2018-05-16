

$(document).ready(function () {


    


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCYNlGC77cCnZMyrMiKKB4TZnx6qApfqP0",
    authDomain: "vetptsdapp.firebaseapp.com",
    databaseURL: "https://vetptsdapp.firebaseio.com",
    projectId: "vetptsdapp",
    storageBucket: "vetptsdapp.appspot.com",
    messagingSenderId: "773708000915"
  };
  firebase.initializeApp(config);

    var database = firebase.database();




    /////////////////////////////////////// facial recognition API //////////////////////////////////////////////////
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




        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })

            .done(function (data) {
                // Show formatted JSON on webpage.
                responseArray.push(JSON.stringify(data, null, 2));

                var emotionData = data[0].faceAttributes.emotion;
                console.log(emotionData)

                database.ref().set({
                    results: emotionData,
                    url: urlArray
                });

                console.log(responseArray);
            })

            .fail(function (jqXHR, textStatus, errorThrown) {
                // Display error message.
                var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
                errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
                alert(errorString);
            });
        $(document).on("click", "#imgSub", processImage());
    };


    ///////////////////////////////////////////// Assessment set up ////////////////////////////////////////////////////

//Google authentication Signinwithpopup
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().useDeviceLanguage();
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    
  });


//Assessment set up



    //set variable
    var countAssessment = 0;
    var assessmentResult = 0;
    var yes = 0;
    var no = 0;
    var array = [];
    $("#yes").hide();
    $("#no").hide();
    $("#resetbutton").hide();
    




    // Set up buttons to show or hide when click on start button
    var assessments = {
        start: function () {
            countAssessment = 0;
            assessmentResult = 0;
            yes = 0;
            no = 0;
            array = [];
           
            $("#assessmentsq").show();
            $("#yes").show();
            $("#no").show();
            $("#resetbutton").hide();
            
            $("#assessmentstart").hide();
            $("#assessment-result-graph").hide();
            callAssessments();
            
        }

    
    };


    // When clicking "start" button, Assessment begins
    $("#assessmentstart").on("click", assessments.start);

    // Assessment start again when clicked "Start Again" button
    $("#resetbutton").on("click", assessments.start);
        

    // Assessment questions
    var questions = [
        {
            Q: "Have you, or a loved one experienced or witnessed a life-threatening event that caused intense fear, helplessness or horror?"
        },

        {
            Q: "Repeated, distressing memories and/or dreams?"
        },

        {
            Q: "Acting or feeling as if the event were happening again (flashbacks or a sense of reliving it)? "
        },

        {
            Q: "Intense physical and/or emotional distress when you are exposed to things that remind you of the event?"
        },

        {
            Q: "Avoiding thoughts, feelings, or conversations about it?"
        },

        {
            Q: "Avoiding activities, places, or people who remind you of it?"
        },

        {
            Q: "Blanking on important parts of it?"
        },

        {
            Q: "Losing interest in significant activities of you life?"
        },

        {
            Q: "Feeling detached from other people?"
        },

        {
            Q: "Feeling your range of emotions is restricted?"
        },

        {
            Q: "Sensing that your future has shrunk (for example, you don't expect to have a career, marriage, children, or a normal life span)?"
        },

        {
            Q: "Problems sleeping?"
        },

        {
            Q: "Irritability or outbursts of anger?"
        },

        {
            Q: "Problems concentrating?"
        },

        {
            Q: " Feeling on guard?"
        },

        {
            Q: "An exaggerated startle response?"
        },

        {
            Q: "Have you, or a loved one experienced changes in sleeping or eating habits?"
        },

        {
            Q: "Sad or depressed?"
        },

        {
            Q: "Disinterested in life?"
        },

        {
            Q: "Worthless or guilty?"
        },

        {
            Q: "Resulted in your failure to fulfill responsibilities with work, school, or family?"
        },

        {
            Q: "Placed you in a dangerous situation, such as driving a car under the influence?"
        },

        {
            Q: "Gotten you arrested?"
        },

        {
            Q: "Continued despite causing problems for you and/or your loved ones?"
        }
    ];

    //Call question
    function callAssessments() {
        array = questions[countAssessment];
        $("#assessmentsq").html(array.Q);

    };


    // count yes numbers and no numbers

    $("#assessment-div").on("click", "button", function () {
        if (this.id == "yes") {
            yes++;
            console.log("yes: " + yes);
            nextAssessments();
        } else if (this.id == "no") {
            no++;
            console.log("no: " + no);
            nextAssessments();
        }


    });

    // Call next question
    function nextAssessments() {
        countAssessment++;
        console.log("count: " + countAssessment);
        if (countAssessment == questions.length) {
            
            $("#assessmentsq").hide();
            $("#yes").hide();
            $("#no").hide();
            
            assessmentResult = (yes / countAssessment) * 100;
            console.log(assessmentResult);
            drawResultGraph(assessmentResult, "#assessment-result-graph", "assessment-result-graph");
            $("#assessment-result-graph").show();
            // Push AssessmentResult into overallResultArray
            overallResultArray.push(assessmentResult);
            console.log(overallResultArray);
            
            
            // Reset all varaible when assessment is done
            // countAssessment = 0;
            // assessmentResult = 0;
            // yes = 0;
            // no = 0;
            // array = [];

                      
            
            // Click button to restart assessment
            $("#resetbutton").show();
            




        } else {
            callAssessments();
            
        }
    };

    

    



    /////////////////////////////////////////////////// Result Functions ///////////////////////////////////////////////////

    //face recognition API -------------------------------------------------------------------------------------------------------->
    // stupid bullshit change


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
    



    //You can use this function as a callback wherever you are calculating the results of your analysis to generate your graph
    //variable = whatever your variable your result is stored in, id = the canvas id for where you want your graph to appear 
    //in "#id" form, and idName = the same id, but in "id" form with out the hashtag

    function drawResultGraph(variable, id, idName) {

        console.log("result graph working")
        var remainder = 100 - variable;

        //pass the canvas id name down through arguments instead of using it here
        $(id).attr("data-result-value", variable);

        var ctxD = document.getElementById(idName).getContext('2d');
        var myLineChart = new Chart(ctxD, {
            type: 'doughnut',
            data: {
                labels: ["Concern", "Non-concern"],
                datasets: [
                    {
                        data: [variable, remainder],
                        backgroundColor: ["blue", "gray"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
                    }
                ]
            },
            options: {
                responsive: true
            }
        });
    }

    //////////To calculate group average and print results - Incomplete as of now, but push to the array below in your function//////////////


    //push your final average from your section's analysis into this array
    var overallResultArray = [];

    function calculateRecommendationAverage() {

        for (var k = 0; k < overallResultArray.length; k++) {
            overallResultArray += overallResultArray[k];

        };

        overallPercentage = overallResultArray / overallResultArray.length;

        if (overallPercentage > 50) {
            // this is where we can write the code for what we want to print to the results div based on our overall average
        } else {

        };

    }

    
    database.ref().set({
        test: "test2"
    });



});
// //HEAD

//         //Closing the accordion+collapseOne+
//         var clo = document.getElementsByClassName("collapseOne");
//         var i;
//         var open = null;
        
//         for (i = 0; i < clo.length; i++) {
//           clo[i].addEventListener("click", function() {
//             if (open == this) {
//               open.classList.toggle("active");
//               open = null;
//             } else {
//               if (open != null) {
//                 open.classList.toggle("active");
//               }
//               this.classList.toggle("active");
//               open = this;
//             }
//           });
//         }

//         var clos = document.getElementsByClassName("collapseTwo");
//         var i;
//         var wide = null;
        
//         for (i = 0; i < clos.length; i++) {
//           clos[i].addEventListener("click", function() {
//             if (wide == this) {
//               wide.classList.toggle("active");
//               wide = null;
//             } else {
//               if (wide != null) {
//                 wide.classList.toggle("active");
//               }
//               this.classList.toggle("active");
//               wide = this;
//             }
//           });
//         }


//         var closer = document.getElementsByClassName("collapseThree");
//         var i;
//         var wider = null;
        
//         for (i = 0; i < closer.length; i++) {
//           closer[i].addEventListener("click", function() {
//             if (wider == this) {
//               wider.classList.toggle("active");
//               wider = null;
//             } else {
//               if (wider != null) {
//                 wider.classList.toggle("active");
//               }
//               this.classList.toggle("active");
//               wider = this;
//             }
//           });
//         }

//         var closers = document.getElementsByClassName("collapseFour");
//         var i;
//         var opens = null;
        
//         for (i = 0; i < closers.length; i++) {
//           closers[i].addEventListener("click", function() {
//             if (opens == this) {
//               opens.classList.toggle("active");
//               opens = null;
//             } else {
//               if (opens != null) {
//                 opens.classList.toggle("active");
//               }
//               this.classList.toggle("active");
//               opens = this;
//             }
//           });
//         }



    //Show final result when user finishes all required parts

    $("#results-button-div").on("click", "button", function(){
        if (countAssessment == questions.length){
            
            console.log(countAssessment == questions.length);
            
            $("#assessment-column").animate({right: '1000px'}, "slow");
            var finalresults = $("#results-preview");
            finalresults.animate({right: '851px'}, "slow");
        
        

        
            $("#previewcontent").html("<h1>Results</h1>");
        
            $("#advise").html("<p>Candy canes liquorice liquorice gingerbread chocolate cake lollipop ice cream. Ice cream chocolate jelly.Croissant brownie halvah chocolate bar ice cream cake cake. Jujubes jujubes soufflé. Cheesecake macaroon wafer liquorice sweet halvah toffee. Tart chocolate cake gummi bears gingerbread donut gingerbread cookie. Bonbon candy canes cookie. Lollipop fruitcake candy icing toffee sugar plum pie donut</p>");
        
        
        }



        
        
        


        

        

        
        
        
        
        
        
        
        // $("#results-preview").animate({
            
        //     right: '250px',
        //     height: '200px',
        //     width: '200px'

        // });
        
        
        
        // $("#assessment-column").toggle("slide");
        // $("#previewcontent").hide();
        // $("#results-preview").html("<h1>Results</h1>");
        // $("#")

        
        // if (countAssessment == questions.length){
        //     $("#results-preview").toggle("slide", {direction: "left"}, 2000);
        //     console.log(countAssessment == questions.length);
        // }
    })


//changing aria-expanded to "false"
// function killAria() {
// var why = document.getElementById("p2").getAttribute("aria-expanded");
// if (why = "true")
// console.log(killAria)
// {
// why = "false"
// } if (
//     why = "true"
// ){
// document.getElementById("p2").setAttribute("aria-expanded", why);
//   document.getElementById("p2").innerHTML = "aria-expanded =" + why;
//  }
//  }

