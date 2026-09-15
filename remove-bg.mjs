import sharp from 'sharp'

const logoPath = new URL('../../src/assets/img/logomayCult.png', import.meta.url)

sharp(logoPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    for (let index = 0; index < data.length; index += 4) {
      if (data[index] > 240 && data[index + 1] > 240 && data[index + 2] > 240) data[index + 3] = 0
    }
    return sharp(data, { raw: info }).png().toFile(logoPath)
  })
  .then(() => console.log('Logo background made transparent successfully!'))
  .catch((error) => {
    console.error('Error processing image:', error)
    process.exitCode = 1
  })