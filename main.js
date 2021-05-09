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
            searchPlaces(features);

            $("#full-response").text(JSON.stringify(features));

            $.each(features,
                function(key, item) {
                    text += key + ": " + JSON.stringify(item) + "\n";
                }
            )

            $("#connection-div").text(text);
            console.log(JSON.parse(req.responseText));
        }
    };

    req.open("GET", "https://api.jsonbin.io/v3/b/"+BIN_ID+"/latest", true);
    req.setRequestHeader("X-Master-Key", API_KEY);
    req.send();


    function searchPlaces(features) {
        let features_list_for_search = [];

        $.each(features,
            function(key, item) {
                features_list_for_search.push({"Kabinets": item["properties"]["name"]});
            }
        )


        // Search
        new autoComplete({
            selector: "#autoComplete",
            placeHolder: "Meklēšana...",
            data: {
                // src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"]
                src: features_list_for_search
            },
            resultsList: {
                noResults: (list, query) => {
                    // Create "No Results" message element
                    const message = document.createElement("div");
                    // Add class to the created element
                    message.setAttribute("class", "no_result");
                    // Add message text content
                    message.innerHTML = `<span>Found No Results for "${query}"</span>`;
                    // Append message element to the results list
                    list.appendChild(message);
                },
            },
            resultItem: {
                highlight: {
                    render: true
                }
            }
        });

    }




});