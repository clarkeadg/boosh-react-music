import { Schema, valuesOf, arrayOf } from 'normalizr'

const ArtistSchema = new Schema('artists', { idAttribute: 'id' });

export default ArtistSchema;
