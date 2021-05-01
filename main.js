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

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            // $("#connection-div").text(JSON.stringify(JSON.parse(req.responseText)));
            let text = "";

            let records = JSON.parse(req.responseText)["record"];
            let features = records["features"];

            $.each(features,
                function(key, item) {
                    text += key + ": " + JSON.stringify(item) + "\n";
                }
            )
            $("#connection-div").text(text);
            console.log(JSON.parse(req.responseText));
        }
    };

    req.open("GET", "https://api.jsonbin.io/v3/b/608d567a92cb9267d0c8df6d/latest", true);
    req.setRequestHeader("X-Master-Key", "$2b$10$Yjdr9li351h.kPgEDCFee.R4ctCZ.TR7F/YiooA6Kerkqv60OuyQe");
    req.send();
});