export const loginApi = async (values) => {
  const response = await fetch("http://localhost:3000/usuario/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  })
  let data = await response.json()
  if (response.ok) {
    console.log(data)
  } else {
    data = {}
  }
  return {
    ok: response.ok,
    userData: data
  }
}