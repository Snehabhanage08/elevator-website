function openForm() {
    document.getElementById('inquiryModal').style.display = 'block';
  }
  function closeForm() {
    document.getElementById('inquiryModal').style.display = 'none';
  }
  
  document.getElementById('inquiryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
  
    try {
      const response = await fetch('http://localhost:3000/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
      alert(result.message);
      closeForm();
      e.target.reset();
    } catch (error) {
      alert("Submission failed");
    }
  });
  