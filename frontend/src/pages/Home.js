import React from 'react'

const Home = () => {
  return (
    <div className='home'>
      <div className='welcome_message'>
        <h1>Welcome to Anthena</h1>
        <p>Stream unlimited Videos for with just a little token</p>
        <button style={{
            backgroundColor: 'brown',
            'color': 'White',
            fontWeight: '800',
            cursor:'pointer',
            border: 'none',
            padding: '.6rem 1rem',
            borderRadius: '5px',
            marginTop: '1rem',

            }}>Subscribe Today</button>
      </div>
      <div className='empty'></div>
    </div>
  )
}

export default Home
