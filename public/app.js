document.getElementById('trackForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const resultDiv = document.getElementById('result');
    const locationInfo = document.getElementById('locationInfo');
    
    try {
        const response = await fetch('/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Display results
        locationInfo.innerHTML = `
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Accuracy:</strong> ${data.accuracy} meters</p>
            <p><strong>Time:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
        `;
        resultDiv.classList.remove('hidden');
        
    } catch (error) {
        locationInfo.textContent = `Error: ${error.message}`;
        resultDiv.classList.remove('hidden');
    }
});
