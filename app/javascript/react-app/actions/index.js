export function fetchProfiles() {
  // AJAX request
  const promise = fetch("/api/v1/profiles")
    .then(response => response.json());

  return {
    type: 'FETCH_PROFILES',
    payload: promise
  }
}
