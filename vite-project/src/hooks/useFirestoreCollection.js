import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import db from '../Firebase-init'

export default function useFirestoreCollection(collectionName) {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isActive = true
        const collectionRef = collection(db, collectionName)

        const unsubscribe = onSnapshot(
            collectionRef,
            (querySnapshot) => {
                if (!isActive) return

                const nextItems = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))

                setItems(nextItems)
                setIsLoading(false)
            },
            (error) => {
                console.error(`Error fetching ${collectionName}:`, error)
                if (isActive) {
                    setIsLoading(false)
                }
            }
        )

        return () => {
            isActive = false
            unsubscribe()
        }
    }, [collectionName])

    return { items, isLoading }
}