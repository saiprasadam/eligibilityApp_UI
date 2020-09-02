$("document").ready(function () {
    $("#enrollment-success-modal").modal("hide");
    let responseTag = document.querySelector("#enrollment-response");
    let successMsg = responseTag.dataset.success;
    let failureMsg = responseTag.dataset.failure;
    if (successMsg || failureMsg) {
        if (successMsg) {
            document.querySelector("#enrollment-success-text").textContent = successMsg;
        } else if (failureMsg) {
            document.querySelector("#enrollment-failure-text").textContent = failureMsg;
        }
        $("#enrollment-success-modal").modal("show");
    }
});