$(document).ready(function() {

    // CREATE BIN
    // let req = new XMLHttpRequest();
    //
    // req.onreadystatechange = () => {
    //     if (req.readyState === XMLHttpRequest.DONE) {
    //         $("#connection-div").html(req.responseText);
    //     }
    // };
    //
    // req.open("POST", "https://api.jsonbin.io/v3/b", true);
    // req.setRequestHeader("Content-Type", "application/json");
    // req.setRequestHeader("X-Master-Key", "$2b$10$Yjdr9li351h.kPgEDCFee.R4ctCZ.TR7F/YiooA6Kerkqv60OuyQe");
    // req.send('{"sample": "Hello World"}');


    // READ BIN

    let req = new XMLHttpRequest();
    let API_KEY = "$2b$10$Yjdr9li351h.kPgEDCFee.R4ctCZ.TR7F/YiooA6Kerkqv60OuyQe";
    let BIN_ID = "608d5bd48a409667ca023dae";
    let features = null;

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            // $("#connection-div").text(JSON.stringify(JSON.parse(req.responseText)));
            let text = "";

            let records = JSON.parse(req.responseText)["record"];
            features = records["features"];

            // init search input
            searchPlaces(features);

            $("#full-response").text(JSON.stringify(features));

            $.each(features,
                function(key, item) {
                    text += key + ": " + JSON.stringify(item) + "\n";
                }
            )

            $("#connection-div").text(JSON.stringify(features, undefined, 2));
            console.log(JSON.parse(req.responseText));
        }
    };

    req.open("GET", "https://api.jsonbin.io/v3/b/"+BIN_ID+"/latest", true);
    req.setRequestHeader("X-Master-Key", API_KEY);
    req.send();


    function searchPlaces(features) {
        // creates array for search
        let features_list_for_search = [];

        $.each(features,
            function(key, item) {
                features_list_for_search.push({
                    "id": item["properties"]["id"],
                    "kabinets": item["properties"]["name"],
                    "strukturvieniba": item["properties"]["strukturvieniba"],
                    "stavs": item["properties"]["stavs"]
                });
            }
        )

        // Search
        new autoComplete({
            selector: "#autoComplete",
            placeHolder: "Meklēšana...",
            data: {
                src: features_list_for_search,
                key: ["kabinets", "strukturvieniba", "id"]
            },
            resultsList: {
                noResults: (list, query) => {
                    // Create "No Results" message element
                    const message = document.createElement("div");
                    // Add class to the created element
                    message.setAttribute("class", "no_result");
                    // Add message text content
                    message.innerHTML = `<span>Nav rezultātu meklētajai frāzei "${query}"</span>`;
                    // Append message element to the results list
                    list.appendChild(message);
                },
            },

            // when the search results appears
            trigger: {
                event: ["input", "focus"]
            },

            // each result line appearance
            resultItem: {
                highlight: {
                    render: true
                },
                content: (data, element) => {
                    // Modify Results Item Style
                    element.style = "display: flex; justify-content: space-between;";
                    // Modify Results Item Content
                    element.innerHTML = `<span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                    ${data.value.kabinets} (${data.value.id})</span>
                    <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; color: rgba(0,0,0,.2);">
                        <span style=" text-transform: uppercase;"> 
                        ${data.value.strukturvieniba}
                         </span>
                        &nbsp;&nbsp;&nbsp;
                        <span style="">
                        ${data.value.stavs}. Stāvs
                        </span>
                    </span>`;

                }
            },

            // when clicked on an item, select it...
            onSelection: (feedback) => {
                document.querySelector("#autoComplete").blur();
                // Prepare User's Selected Value
                const selection = feedback.selection.value[feedback.selection.key];
                // Render selected choice to selection div
                // document.querySelector(".selection").innerHTML = selection;
                // Replace Input value with the selected value
                document.querySelector("#autoComplete").value = selection;
                // Console log autoComplete data feedback
                console.log(feedback);
            }


        });

    }




});