const TOKEN = "2b96ffb77c3cda6c7fff0483b3e5b87e9b983cee";
export class API {
  // static signInUser(body, token) {
  //   const response = fetch(`http://127.0.0.1:8000/auth/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(body)
  //   });
  //   return response.json();
  // }

  static createNewUser(body) {
    fetch(`http://127.0.0.1:8000/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((response) => response.json());
  }

  static updateRestoDetail(resto_id, body, token) {
    fetch(`http://127.0.0.1:8000/api/restaurants/${resto_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`
      },
      body: JSON.stringify(body)
    }).then((response) => response.json());
  }

  static createNewResto(body, token) {
    fetch(`http://127.0.0.1:8000/api/restaurants/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`
      },
      body: JSON.stringify(body)
    }).then((response) => response.json());
  }

  static deleteResto(resto_id, token) {
    return fetch(`http://127.0.0.1:8000/api/restaurants/${resto_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${TOKEN}`
      }
    });
  }
}
