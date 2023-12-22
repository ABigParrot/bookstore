import React, { useState, useEffect } from "react"
import BackButton from '../components/BackButton'
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [yearPublished, setYearPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title)
        setAuthor(response.data.author)
        setYearPublished(response.data.yearPublished)
        setGenre(response.data.genre)
        setPrice(response.data.price)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        alert('Error. Check your console.')
        console.log(error)
      })
  }, [])
  const handleEditBook = () =>{
    const data = {
      title,
      author,
      yearPublished, 
      genre, 
      price
    }
    setLoading(true)
    axios
      .patch(`http://localhost:5555/books/${id}`, data, {method:'patch'})
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        console.log()
        alert('Error. Check the console, lol.')
        console.log(error)
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'  
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
            type="text" 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'  
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Year Published</label>
          <input 
            type="number" 
            value={yearPublished}
            onChange={(e) => setYearPublished(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'  
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Genre</label>
          <input 
            type="text" 
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'  
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Price</label>
          <input 
            type="number" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'  
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

export default EditBook