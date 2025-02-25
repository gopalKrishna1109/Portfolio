function toggleDetails(button) {
    const detailsContent = button.nextElementSibling;
    detailsContent.style.display = detailsContent.style.display === "block" ? "none" : "block";
}