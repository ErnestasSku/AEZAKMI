import _ from 'lodash'

export const convertArrayToChunks = (array: any[] = [], chunkSize: number) =>  _.chunk(array, chunkSize);
