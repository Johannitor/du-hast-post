// Name des Gastes aus dem Link, z. B. ...?name=Anna
const raw = new URLSearchParams(window.location.search).get("name")?.trim();

export const guestName = raw ? raw.slice(0, 40) : null;
