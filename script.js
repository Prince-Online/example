function getUsernameFromLocalStorage() {
  return localStorage.getItem('name_local');
}

function fetchUserCoins(username) {
  if (!username) {
    document.getElementById('coins').innerText = "Username not found.";
    window.location.href = 'login.html';
    return;
  }

  const url = 'https://script.google.com/macros/s/AKfycbzL6ldIE6OIBMw2WXlSlmE0xUMT-1X0S26_TCrK26hucc_3BcILQkl61Zbg38QT1Q3WdA/exec';

  fetch(url, {
    method: 'POST',
    body: new URLSearchParams({
      username: username
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.coins !== undefined) {
      document.getElementById('coins').innerHTML = `<div class="amount"><img src="https://cdn2.iconfinder.com/data/icons/flat-icons-19/512/Coin.png"> ${data.coins}</div>`;
    } else {
      document.getElementById('coins').innerText = data.error || "Error fetching coins.";
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById('coins').innerText = "An error occurred while fetching coins.";
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const username = getUsernameFromLocalStorage();
  fetchUserCoins(username);
});
