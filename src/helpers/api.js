function delay (ms = 200) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getAll () {
  return delay()
    .then(() => {
      return fetch('/api/')
    })
    .then(res => res.json())
}

export function deleteOne (pid) {
  return delay()
    .then(() => {
      return fetch(`/api/${pid}`, { method: 'DELETE' })
    })
}
