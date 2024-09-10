document.getElementById('payNowButton').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const semester = document.getElementById('semester').value;
    const amount = document.getElementById('amount').value;

    if (name && semester && amount) {
        const upiID = '8951829412@ptsbi'; // Your UPI ID here
        const upiLink = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;

        // Redirect to UPI payment link
        window.location.href = upiLink;

        // Send data to Google Sheets
        fetch('https://script.google.com/macros/s/AKfycbw_7oTfXxRlzePAeUji9aRMvHTJdlE5czF_Dvs8e9iTAwtF_A49niR1c7yjR1HZ79BZ/exec', { // Replace with your actual Web App URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, semester, phone: document.getElementById('phone').value, amount })
        }).then(response => response.json())
          .then(data => {
              document.getElementById('confirmationMessage').textContent = 'Thank you! Your contribution has been recorded.';
          })
          .catch(error => {
              document.getElementById('confirmationMessage').textContent = 'An error occurred. Please try again.';
          });
    } else {
        alert('Please fill out all required fields.');
    }
});
