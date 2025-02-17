document.addEventListener("DOMContentLoaded", function() {
    const popupForm = document.getElementById("popupForm");
    const closeForm = document.getElementById("closeForm");
    const contactForm = document.getElementById("contactForm");

    // Close the pop-up form
    closeForm.addEventListener("click", function() {
        popupForm.style.display = "none";
    });

    // Handle form submission
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get input values
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let purpose = document.getElementById("purpose").value;
        let construction = document.getElementById("construction").checked ? "Yes" : "No";
        let interior = document.getElementById("interior").checked ? "Yes" : "No";

        // Prepare WhatsApp message
        let message = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nPurpose: ${purpose}\nConstruction: ${construction}\nInterior: ${interior}`;

        // Send WhatsApp message via API (Replace YOUR_WHATSAPP_API_URL)
        fetch("https://api.chat-api.com/instance12345/message?token=YOUR_API_TOKEN", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        phone: "9884146546",
        body: "Hello, this is an automated message!"
    })
})
        }).then(response => response.json())
          .then(data => console.log('Message sent:', data))
          .catch(error => console.error('Error:', error));

        // Save to Excel (CSV format)
        let csvContent = `Name,Phone,Email,Purpose,Construction,Interior\n${name},${phone},${email},${purpose},${construction},${interior}`;
        let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "contacts.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Close the form
        popupForm.style.display = "none";
    });
});