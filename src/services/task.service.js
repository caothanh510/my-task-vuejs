import { db } from '../../database/firebase_database'

const service = db.collection("tasks")
export default {
  getAll() {
    return service
  },
  create(tutorial) {
    return service.add(tutorial)
  },
  edit(id) {
    return service.doc(id).get()
  },
  update(id, data) {
    return service.doc(id).update(data)
  },
  delete(id) {
   return service.doc(id).delete()
  },
  search(key, searchString) {
    return service.orderBy(key).startAt(searchString).endAt(searchString + '\uf8ff').get()
  }
}
