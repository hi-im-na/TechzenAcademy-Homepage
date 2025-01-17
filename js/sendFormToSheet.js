$(function () {
    // $.validator.setDefaults({
    //     errorElement: "span",
    //     errorPlacement: function (error, element) {
    //         error.addClass("invalid-feedback");
    //         element.closest(".form-group").append(error);
    //     },
    //     highlight: function (element, errorClass, validClass
    //     ) {
    //         $(element).addClass("is-invalid").removeClass("is-valid");
    //     }
    //     ,
    //     unhighlight: function (element, errorClass, validClass
    //     ) {
    //         $(element).addClass("is-valid").removeClass("is-invalid");
    //     }
    // });

    $("#consultation-form").validate({
        rules: {
            fullname: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true,
                // pattern: "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"
            },
            phone: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 11
            },
            status: {
                required: true,
            },
            content: {
                required: false,
            }
        },
        messages: {
            fullname: {
                required: "Vui lòng nhập tên của bạn",
                minlength: "Tên của bạn phải có ít nhất 3 ký tự"
            },
            email: {
                required: "Vui lòng nhập email của bạn",
                email: "Vui lòng nhập đúng định dạng email",
                // pattern: "Vui lòng nhập đúng định dạng email (vd: example@domain.com)"
            },
            phone: {
                required: "Vui lòng nhập số điện thoại của bạn",
                number: "Vui lòng nhập số điện thoại hợp lệ",
                minlength: "Số điện thoại phải có ít nhất 10 số",
                maxlength: "Số điện thoại không được quá 11 số"
            },
            status: {
                required: "Vui lòng chọn một lựa chọn"
            },
            content: {
                // required: "Vui lòng nhập nội dung bạn muốn được tư vấn",
                // minlength: "Nội dung phải có ít nhất 10 ký tự"
            }
        },
    });
    $("#consultation-form").on("submit", (e) => {
        e.preventDefault();
        if ($("#consultation-form").valid()) {
            sendForm();
        }
    });
});

function removeVietnameseDiacritics(str) {
    const a = str.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");;
    return a.trim();
}

async function sendForm() {
    $("#submit-btn").attr("disabled", true);
    $("#submit-btn").html("Sending...");
    $("#submit-btn").css("cursor", "not-allowed");

    const data = {
        fullname: removeVietnameseDiacritics($("#fullname").val()),
        phone: $("#phone").val(),
        email: removeVietnameseDiacritics($("#email").val()),
        status: removeVietnameseDiacritics($("#status").val()),
        content: removeVietnameseDiacritics(removeVietnameseDiacritics($("#content").val())),
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
};
