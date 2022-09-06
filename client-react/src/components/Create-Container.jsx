import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank
} from 'react-icons/md'
import { storage } from '../config/firebase'
import { useStateValue } from '../hooks/useStateValue'
import { SET_FOOD_ITEMS } from '../store/types'
import { categories } from '../utils/data'
import { getAllFoodItems, saveItem } from '../utils/firebase-functions'
import Loader from './Loader'

const CreateContainer = () => {
  const [title, setTitle] = useState('')
  const [calories, setCalories] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [imageAsset, setImageAsset] = useState(null)
  const [fields, setFields] = useState(false)
  const [alertStatus, setAlertStatus] = useState('danger')
  const [msg, setMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [{ foodItems }, dispatch] = useStateValue()

  const uploadImage = (event) => {
    setIsLoading(true)

    const imageFile = event.target.files[0]
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        console.log(error)

        setFields(true)
        setMsg('Error al subir : Inténtalo de nuevo')
        setAlertStatus('danger')

        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 400)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL)
          setIsLoading(false)
          setFields(true)
          setMsg('Imagen subida correctamente')
          setAlertStatus('success')

          setTimeout(() => {
            setFields(false)
          }, 4000)
        })
      }
    )
  }

  const deleteImage = () => {
    setIsLoading(true)

    const deleteRef = ref(storage, imageAsset)

    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg('Imagen eliminada correctamente')
      setAlertStatus('success')

      setTimeout(() => {
        setFields(false)
      }, 4000)
    })
  }

  const saveDetails = () => {
    setIsLoading(true)

    try {
      if (!title || !calories || !price || !category || !imageAsset) {
        setFields(true)
        setMsg('Por favor, rellena todos los campos')
        setAlertStatus('danger')

        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 4000)
      } else {
        const data = {
          id: `${Date.now()}`,
          title,
          imageURL: imageAsset,
          category,
          calories,
          qty: 1,
          price
        }

        saveItem(data)
        setIsLoading(false)
        setFields(true)
        setMsg('Producto guardado correctamente')
        clearData()
        setAlertStatus('success')

        setTimeout(() => {
          setFields(false)
        }, 4000)
      }
    } catch (error) {
      console.error(error)

      setFields(true)
      setMsg('Error al guardar : Inténtalo de nuevo')
      setAlertStatus('danger')

      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }

    fetchData()
  }

  const clearData = () => {
    setTitle('')
    setCalories('')
    setPrice('')
    setCategory('Select Category')
    setImageAsset(null)
  }

  const fetchData = async () => {
    const foodItems = await getAllFoodItems()

    if (foodItems) {
      dispatch({
        type: SET_FOOD_ITEMS,
        foodItems
      })
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === 'danger'
                ? 'bg-red-400 text-red-800'
                : 'bg-emerald-400 text-emerald-800'
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            value={title}
            placeholder="Dame un título"
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <select
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            onChange={(event) => setCategory(event.target.value)}
          >
            <option className="bg-white" value="other">
              Selecciona una categoría
            </option>
            {categories.map((category) => (
              <option
                key={category.id}
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                value={category.urlParamName}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading
            ? (
            <Loader />
              )
            : (
            <>
              {!imageAsset
                ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click aquí para cargar
                      </p>
                    </div>
                    <input
                      type="file"
                      className="w-0 h-0"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                    />
                  </label>
                </>
                  )
                : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      className="w-full h-full object-cover"
                      alt="uploaded image"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
                  )}
            </>
              )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              placeholder="Calorías"
              value={calories}
              onChange={(event) => setCalories(event.target.value)}
              required
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              placeholder="Precio"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer
