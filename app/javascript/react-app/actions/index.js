export function fetchProfiles() {
  // AJAX request
  const promise = fetch("/api/v1/profiles")
    .then(response => response.json());

  return {
    type: 'FETCH_PROFILES',
    payload: promise
  }
}



export function createBooking(id, content) {
  const url = `/api/v1/profiles/${id}/bookings`;

  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  content.profile_id = `${id}`;

  const promise = fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    credentials: 'same-origin',
    body: JSON.stringify(content)
  }).then(r => r.json())
  .catch(error => error.json());

  return {
    type: 'BOOKING_POSTED',
    payload: promise // Will be resolved by redux-promise

  };
}

export function appendMessage(message) {
  return {
    type: 'MESSAGE_POSTED',
    payload: message
  }
}
