import { Schema, valuesOf, arrayOf } from 'normalizr'

const generateSlug = (entity) => { 
  return entity.id.attributes['im:id']
}

const iTunesSchema = new Schema('itunes', { idAttribute: generateSlug });

export default iTunesSchema;
