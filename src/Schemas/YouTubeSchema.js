import { Schema, valuesOf, arrayOf } from 'normalizr'

const generateSlug = (entity) => { 
  return entity.id.videoId
}

const YouTubeSchema = new Schema('youtube', { idAttribute: generateSlug });

export default YouTubeSchema;
