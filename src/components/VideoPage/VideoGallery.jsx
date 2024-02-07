const VideoGallery = ({data}) => {
  return (
    <div className="gallery">
      {data && data.map((data) => (
          <video
          className='video'
            key={data.id}
            src={data.src}
            alt={data.alt}
            controls
          />
      ))}
    </div>
  )
}

export default VideoGallery