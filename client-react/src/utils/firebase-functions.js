import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore'
import { firestore } from '../config/firebase'

export const saveItem = async (data) => {
  await setDoc(doc(firestore, 'food-items', `${Date.now()}`), data, {
    merge: true
  })
}

export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, 'food-items'), orderBy('id', 'desc'))
  )

  console.log(items)

  return items.docs.map((doc) => doc.data())
}
