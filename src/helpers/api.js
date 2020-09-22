function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, 200))
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
