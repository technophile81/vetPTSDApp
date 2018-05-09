
//Assessment set up

$(document).ready(function () {

    //set variable
    var countAssessment = 0;
    var yes = 0;
    var no = 0;
    var array = [];
    $("#yes").hide();
    $("#no").hide();

    var assessments = {
        start: function () {
            $("#yes").show();
            $("#no").show();
            $("#assessmentstart").hide();
            callAssessments();
        }
    }





    $("#assessmentstart").on("click", assessments.start);


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
        } else {
            no++;
            console.log("no: " + no);
        }

        nextAssessments();
    });

    // Call next question
    function nextAssessments() {
        countAssessment++;
        console.log("count: " + countAssessment);
        if (countAssessment == questions.length) {
            $("#assessmentsq").html("Let's begin behavior analysis");
            $("#yes").hide();
            $("#no").hide();


        } else {
            callAssessments();
        }
    };

    function reset() {
        var countAssessment = 0;
        var yes = 0;
        var no = 0;
        var array = [];
        $("#yes").hide();
        $("#no").hide();
        $("#assessmentstart").show();

    };

})

// Below is the code to use with the graphs. Each graph already has an id on the index.html page, included in the "canvas" tag

// var ctxD = document.getElementById("doughnutChart").getContext('2d');
// var myLineChart = new Chart(ctxD, {
//     type: 'doughnut',
//     data: {
//         labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
//         datasets: [
//             {
//                 data: [300, 50, 100, 40, 120],
//                 backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
//                 hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
//             }
//         ]
//     },
//     options: {
//         responsive: true
//     }    
// });
            

