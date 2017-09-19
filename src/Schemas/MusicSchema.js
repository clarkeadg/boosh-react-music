import { Schema, valuesOf, arrayOf } from 'normalizr'

const MusicSchema = new Schema('music', { idAttribute: 'id' });

export default MusicSchema;
