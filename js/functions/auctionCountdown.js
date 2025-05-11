export function auctionCountdown(endsAt, element) {
    function updateCountdown() {
      const now = new Date().getTime();
      const endTime = new Date(endsAt).getTime();
      const timeLeft = endTime - now;
  
      if (timeLeft <= 0) {
        element.innerText = "Expired";
        clearInterval(interval);
        return;
      }
  
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
      element.innerText = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  }