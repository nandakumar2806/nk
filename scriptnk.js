document.addEventListener('DOMContentLoaded', () => {

  // Select elements
  const door = document.getElementById('anywhereDoor');
  const bubble = document.getElementById('doorNote');
  let isOpen = false;

  // Door Click Interaction
  if (door) {
    door.addEventListener('click', () => {
      // 1. Toggle Visuals
      isOpen = !isOpen;
      if (isOpen) {
        door.classList.add('open');
        showBubble();
        speakMessage();
      } else {
        door.classList.remove('open');
        hideBubble();
      }
    });
  }

  function showBubble() {
    if (bubble) {
      bubble.classList.add('visible');
      // Hide automatically after 3 seconds
      setTimeout(() => {
        if (isOpen) { // Only hide if we haven't closed it manually
          // bubble.classList.remove('visible'); 
          // Let's keep it visible per user intent? Or fade?
          // User just said "say", usually ephemeral.
        }
      }, 3000);
    }
  }

  function hideBubble() {
    if (bubble) bubble.classList.remove('visible');
  }

  function speakMessage() {
    // 2. Audio "Vanakam da pulla"
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Vanakam da Pulla");

      // Try to find a Tamil or Indian English voice for authentic fun?
      // Usually just default is fine, let's look for 'Google UK English Male' or similar if available, else default.
      // Just default is safest.

      utterance.rate = 1; // Normal speed
      utterance.pitch = 1.1; // Slightly higher/friendly
      utterance.volume = 1;

      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Browser doesn't support speech synthesis.");
    }
  }

  console.log("Future Gadgets Initialized.");
});
