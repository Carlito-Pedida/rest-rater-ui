const TOKEN = "2b96ffb77c3cda6c7fff0483b3e5b87e9b983cee";
export class API {
  static updateRestoDetail(resto_id, body) {
    fetch(`http://127.0.0.1:8000/api/restaurants/${resto_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`
      },
      body: JSON.stringify(body)
    }).then((response) => response.json());
  }

  static createNewResto(body) {
    fetch(`http://127.0.0.1:8000/api/restaurants/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`
      },
      body: JSON.stringify(body)
    }).then((response) => response.json());
  }

  static deleteResto(resto_id) {
    return fetch(`http://127.0.0.1:8000/api/restaurants/${resto_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`
      }
    });
  }
}
