import trae from 'trae'
import configService from './config'

const appMusicService = trae.create({
  baseUrl: configService.apiUrl
})

export default appMusicService
