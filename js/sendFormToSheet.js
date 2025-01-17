$("#consultation-form").on("submit", async function (e) {
    e.preventDefault();
    $("#submit-btn").attr("disabled", true);
    $("#submit-btn").html("Sending...");
    $("#submit-btn").css("cursor", "not-allowed");

    const data = {
        fullname: $("#fullname").val().toLocaleString(),
        phone: $("#phone").val().toLocaleString(),
        email: $("#email").val().toLocaleString(),
        status: $("#status").val().toLocaleString(),
        content: $("#content").val().toLocaleString(),
        timestamp: new Date().toISOString()
    }

    await fetch(
        "https://script.google.com/macros/s/AKfycbyOkOoYeKm9p_0ZVBveamJDtL95_ys0JIMe1QmqqvdBjHtiYu6Ei8UjUUDfW22Xwv4/exec",
        {
            redirect: "follow",
            method: "POST",
            body: (`fullname=${data.fullname}&phone=${data.phone}&email=${data.email}&status=${data.status}&content=${data.content}&timestamp=${data.timestamp}`),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        }
    ).then(res => {
        console.log("reas", res);
        $("#submit-btn").attr("disabled", false);
        $("#submit-btn").html("Submit");
        $("#submit-btn").css("cursor", "pointer");
        alert("Your message has been sent successfully.");
    })
        .catch(err => {
            console.log(err);
            $("#submit-btn").attr("disabled", false);
            $("#submit-btn").html("Submit");
            $("#submit-btn").css("cursor", "pointer");
            alert("Something went wrong. Please try again.");

        });

    const backendUrl = "http://localhost:8080/people";

    await $.ajax({
        url: backendUrl,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
        },
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.log(error);
        },

    });
});
