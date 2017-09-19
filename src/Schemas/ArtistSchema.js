import { Schema, valuesOf, arrayOf } from 'normalizr'

const ArtistSchema = new Schema('artist', { idAttribute: 'id' });

export default ArtistSchema;
