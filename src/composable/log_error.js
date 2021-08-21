export default function log(promise) {
  return promise
    .then(data => {
      console.log('promise', data)
      return [null, data]
    })
    .catch(err => [err])
}
