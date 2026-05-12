import { useParams } from 'react-router-dom'

const DetailArtikel = () => {
  const { id } = useParams()

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="font-serif text-4xl">Detail Artikel</h1>
        <p className="text-luvera-text-light mt-4">Article ID: {id}</p>
      </div>
    </div>
  )
}

export default DetailArtikel