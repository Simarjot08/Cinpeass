import React from 'react'
import styles from"./HeroSection.module.css"

function Herosection() {
  return (
    <div className={styles.banner}>
      <div className={styles.slider} style={{ '--quantity': 10 }}>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={styles.item}
            style={{ '--position': i + 1 }}
          >
            <img src={`/images/hero/movie_${i + 1}.jpg`} alt={`movie_${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Herosection
